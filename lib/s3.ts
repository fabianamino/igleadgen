import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { AwsCredentialIdentity } from "@aws-sdk/types";

// Ensure credentials are defined before creating the config
const credentials: AwsCredentialIdentity = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};

export const s3Config = {
  region: process.env.AWS_REGION || "eu-north-1",
  credentials,
  bucketName: process.env.AWS_BUCKET_NAME || "alexawriters",
};

// Initialize S3 client with correct configuration
export const s3 = new S3Client({
  region: s3Config.region,
  credentials: s3Config.credentials,
  endpoint: `https://s3.${s3Config.region}.amazonaws.com`,
  forcePathStyle: false,
} as S3ClientConfig);

export const S3_BUCKET_NAME = s3Config.bucketName;
export const S3_REGION = s3Config.region;

// Function to generate public URL for an object
export function getPublicUrl(key: string): string {
  return `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/${key}`;
}
