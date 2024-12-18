-- AlterTable
ALTER TABLE "users" 
ADD COLUMN "username" TEXT UNIQUE,
ADD COLUMN "twitter" TEXT,
ADD COLUMN "linkedin" TEXT,
ADD COLUMN "github" TEXT;
