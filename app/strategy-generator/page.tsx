'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Copy, Check, Download } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function StrategyGenerator() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goals, setGoals] = useState("");
  const [strategy, setStrategy] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessName || !businessDescription || !targetAudience || !goals) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/generate-strategy", {
        method: "POST",
        body: JSON.stringify({
          businessName,
          businessDescription,
          targetAudience,
          goals
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to generate strategy');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setStrategy(data.strategy);
      toast.success("Strategy generated successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate strategy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(strategy);
      setCopied(true);
      toast.success("Strategy copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy strategy");
    }
  };

  const downloadStrategy = () => {
    const element = document.createElement("a");
    const file = new Blob([strategy], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "instagram-strategy.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Strategy downloaded successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white">Instagram Strategy Generator</h1>
          <form onSubmit={handleSubmit}>
            <Card className="p-6 bg-zinc-900 border-zinc-700">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-white">
                    Business Name
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription" className="text-white">
                    Business Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    placeholder="Describe your business and what you do"
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience" className="text-white">
                    Target Audience
                  </Label>
                  <Textarea
                    id="targetAudience"
                    placeholder="Describe your target audience (age, interests, demographics)"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals" className="text-white">
                    Business Goals
                  </Label>
                  <Textarea
                    id="goals"
                    placeholder="What are your main business goals? (e.g., increase brand awareness, drive sales)"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Strategy...
                    </>
                  ) : (
                    'Generate Strategy'
                  )}
                </Button>
              </div>
            </Card>
          </form>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Your Strategy</h2>
            {strategy && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-white" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={downloadStrategy}
                  className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                >
                  <Download className="h-4 w-4 text-white" />
                </Button>
              </div>
            )}
          </div>

          <Card className="p-6 bg-zinc-900 border-zinc-700 min-h-[300px] overflow-auto">
            {strategy ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{strategy}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-zinc-500 text-center mt-20">
                Your Instagram strategy will appear here
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
