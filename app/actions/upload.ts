"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getCurrentUser } from "@/actions/user";
import prisma from "@/lib/db";
import { s3, S3_BUCKET_NAME, S3_REGION, getPublicUrl } from "@/lib/s3";

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

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size too large. Maximum size is 5MB.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      throw new Error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
    }

    // Generate a unique key for the image
    const key = `profile-images/${user.id}-${Date.now()}.${fileExtension}`;

    // Upload to S3
    try {
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      });

      console.log("Uploading to S3 with config:", {
        bucket: S3_BUCKET_NAME,
        region: S3_REGION,
        key,
        contentType: file.type,
      });

      const response = await s3.send(command);
      
      if (!response.$metadata.httpStatusCode || response.$metadata.httpStatusCode !== 200) {
        console.error("S3 upload failed with response:", response);
        throw new Error("Failed to upload to S3");
      }

      console.log("S3 upload successful:", response);
    } catch (s3Error) {
      console.error("S3 upload error details:", {
        error: s3Error,
        bucket: S3_BUCKET_NAME,
        region: S3_REGION,
        key,
      });
      
      if (s3Error instanceof Error) {
        throw new Error(`S3 upload failed: ${s3Error.message}`);
      }
      throw new Error("Failed to upload to S3. Please try again.");
    }

    // Generate the public URL using the helper function
    const imageUrl = getPublicUrl(key);
    console.log("Generated image URL:", imageUrl);

    // Update user profile in database
    try {
      console.log("Updating user profile with image URL:", {
        userId: user.id,
        imageUrl,
      });

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          image: imageUrl,
        },
        select: {
          id: true,
          image: true,
        },
      });

      if (!updatedUser || !updatedUser.image) {
        throw new Error("Failed to update user profile");
      }

      console.log("Database update successful:", updatedUser);
      return imageUrl;
    } catch (dbError) {
      console.error("Database update error details:", dbError);
      throw new Error("Failed to save profile image to database");
    }
  } catch (error) {
    console.error("Error in uploadProfileImage:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to upload image. Please try again.");
  }
}
