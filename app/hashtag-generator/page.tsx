'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Hash } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

export default function HashtagGenerator() {
  const [input, setInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const generateHashtags = async () => {
    if (!input.trim()) {
      toast.error('Please enter some text to generate hashtags');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: input.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      console.log('API Response:', data);

      if (!data || !data.messages || !data.messages[0] || !data.messages[0].content) {
        throw new Error('Invalid response format from API');
      }

      const content = data.messages[0].content;
      
      // Split the message into words and filter for hashtags
      const generatedHashtags = content
        .split(/\s+/)
        .filter((tag: string) => tag.startsWith('#'))
        .map((tag: string) => tag.trim());

      if (generatedHashtags.length === 0) {
        // If no hashtags were found, create them from the response
        const words = content.split(/\s+/).filter(Boolean);
        const hashtags = words.map((word: string) => 
          word.startsWith('#') ? word : `#${word.toLowerCase().replace(/[^\w\d]/g, '')}`
        );
        setHashtags(hashtags);
      } else {
        setHashtags(generatedHashtags);
      }

      toast.success('Hashtags generated successfully!');
    } catch (error) {
      console.error('Error details:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate hashtags. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Hashtags copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Hashtag Generator</h1>
      <Card className="p-6 bg-background border-border">
        <div className="space-y-4">
          <Textarea
            placeholder="Enter your content here to generate relevant hashtags..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] w-full bg-background text-foreground border-input focus:ring-2 focus:ring-ring"
          />
          <Button
            onClick={generateHashtags}
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Hash className="mr-2 h-4 w-4" />
                Generate Hashtags
              </>
            )}
          </Button>
        </div>

        {hashtags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Generated Hashtags</h2>
            <div className="bg-muted p-4 rounded-lg border border-border">
              <p className="break-words text-foreground">{hashtags.join(' ')}</p>
              <Button
                variant="secondary"
                onClick={() => copyToClipboard(hashtags.join(' '))}
                className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                Copy All Hashtags
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}