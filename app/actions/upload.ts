"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getCurrentUser } from "@/actions/user";
import prisma from "@/lib/db";
import { s3, S3_BUCKET_NAME, S3_REGION, getPublicUrl } from "@/lib/s3";
import { optimizeImage } from "@/lib/image-optimizer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const IMAGE_FORMATS = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "webp", // Convert GIFs to WebP for better compression
} as const;

export async function uploadProfileImage(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size too large. Maximum size is 5MB.");
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error("Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Optimize the image
    const format = IMAGE_FORMATS[file.type as keyof typeof IMAGE_FORMATS];
    const optimizedBuffer = await optimizeImage(buffer, {
      maxWidth: 800,
      maxHeight: 800,
      quality: 80,
      format
    });

    // Generate a unique key for the image
    const key = `profile-images/${user.id}-${Date.now()}.${format}`;

    // Upload to S3
    try {
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: optimizedBuffer,
        ContentType: `image/${format}`,
        CacheControl: 'public, max-age=31536000', // Cache for 1 year
      });

      console.log("Uploading to S3 with config:", {
        bucket: S3_BUCKET_NAME,
        region: S3_REGION,
        key,
        contentType: `image/${format}`,
      });

      await s3.send(command);
      const imageUrl = getPublicUrl(key);

      // Update user's profile image in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { image: imageUrl },
      });

      return {
        success: true,
        url: imageUrl,
      };
    } catch (error) {
      console.error("S3 upload error:", error);
      throw new Error("Failed to upload image to storage");
    }
  } catch (error) {
    console.error("Profile image upload error:", error);
    throw error;
  }
}
