"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      const path = window.location.pathname;
      const shareUrl = `https://igleadgen.com${path}`;
      
      await navigator.share({
        title,
        url: shareUrl,
      });
    } catch (error) {
      // Handle error or fallback (e.g., copy to clipboard)
      console.error("Error sharing:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleShare}
    >
      <Share2 className="h-5 w-5" />
    </Button>
  );
}
