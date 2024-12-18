"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface UploadButtonProps {
  onUpload: (file: File) => Promise<void>;
  loading?: boolean;
}

export function UploadButton({ onUpload, loading = false }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
      // Clear the input value to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={loading}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload Image
      </Button>
    </>
  );
}
