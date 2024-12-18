'use client';

import { useState } from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Upload, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function HashtagGenerator() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [hashtags, setHashtags] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("/api/generate-hashtags", {
        method: "POST",
        body: JSON.stringify({
          input: `Generate Instagram hashtags for a business with the following details:
            Business Name: ${businessName}
            Business Description: ${businessDescription}
            Target Audience: ${targetAudience}
            ${image ? 'An image will be used with these hashtags.' : ''}`
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to generate hashtags');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      console.log('Received hashtags:', data.hashtags); // Debug log
      setHashtags(data.hashtags);
      toast.success("Hashtags generated successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate hashtags. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hashtags);
      setCopied(true);
      toast.success("Hashtags copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy hashtags");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white">Hashtag Generator</h1>
          <form onSubmit={handleSubmit}>
            <Card className="p-6 bg-zinc-900 border-zinc-700">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Upload Image
                  </label>
                  <div 
                    className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-6 cursor-pointer hover:border-zinc-500 transition"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {imagePreview ? (
                      <div className="relative w-full aspect-video">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-zinc-400" />
                        <p className="mt-2 text-sm text-zinc-400">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Business Name
                  </label>
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Enter your business name"
                    className="bg-zinc-800 text-white border-zinc-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Business Description
                  </label>
                  <Textarea
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="Describe what your business does"
                    className="bg-zinc-800 text-white border-zinc-700 min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Target Audience
                  </label>
                  <Textarea
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="Describe your target audience"
                    className="bg-zinc-800 text-white border-zinc-700 min-h-[100px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#f059da] text-white hover:bg-[#f059da]/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Hashtags"
                  )}
                </Button>
              </div>
            </Card>
          </form>
        </div>

        <div className="flex items-center justify-center">
          {hashtags ? (
            <Card className="p-6 bg-zinc-900 border-zinc-700 w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Generated Hashtags</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="hover:bg-zinc-800"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-zinc-400" />
                  )}
                </Button>
              </div>
              <div className="bg-zinc-800 p-4 rounded-lg">
                <p className="text-zinc-300 break-words leading-relaxed">
                  {hashtags}
                </p>
              </div>
            </Card>
          ) : (
            <div className="text-center text-zinc-500">
              <p>Generated hashtags will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}