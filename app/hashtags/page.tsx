'use client';

import { useState, useEffect } from 'react';
import { Hash, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface Hashtag {
  id: string;
  name: string;
  postsCount: number;
  avgLikes: number;
  avgComments: number;
  searchedAt: string;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export default function HashtagsPage() {
  const router = useRouter();
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hashtagsPerPage = 12;
  const totalPages = Math.ceil(hashtags.length / hashtagsPerPage);

  const fetchHashtags = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/hashtags');
      if (!response.ok) {
        throw new Error('Failed to fetch hashtags');
      }
      const data = await response.json();
      setHashtags(data);
    } catch (error) {
      console.error('Error fetching hashtags:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch hashtags');
      toast.error('Failed to load saved hashtags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHashtags();
  }, []);

  const getCurrentPageHashtags = () => {
    const startIndex = (currentPage - 1) * hashtagsPerPage;
    const endIndex = startIndex + hashtagsPerPage;
    return hashtags.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#13111C] via-[#0F0F0F] to-black">
      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_500px_at_50%_-30%,#f059da15,transparent)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_700px_at_80%_60%,#f059da08,transparent)]" />
      <div className="fixed inset-0 bg-grid-white/[0.02]" />

      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.back()}
                variant="ghost"
                className="text-white/70 hover:text-white group relative"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Hash className="w-6 h-6 text-[#f059da]" />
                Saved Hashtags
              </h1>
            </div>
            <Button
              onClick={() => router.push('/hashtag-search')}
              className="bg-[#f059da] hover:bg-[#f059da]/90 text-white"
            >
              Search New Hashtags
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f059da]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 min-h-[400px] flex items-center justify-center">
              {error}
            </div>
          ) : hashtags.length === 0 ? (
            <div className="text-center text-white/70 min-h-[400px] flex flex-col items-center justify-center gap-4">
              <p className="text-lg">No saved hashtags yet.</p>
              <Button
                onClick={() => router.push('/hashtag-search')}
                className="bg-[#f059da] hover:bg-[#f059da]/90 text-white"
              >
                Start Searching Hashtags
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentPageHashtags().map((hashtag) => (
                  <div
                    key={hashtag.id}
                    className="group relative overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br from-black/50 via-black/30 to-black/10 p-6 hover:border-[#f059da]/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-50 transition-opacity" />
                    <div className="relative flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f059da]/10">
                          <Hash className="w-5 h-5 text-[#f059da]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">#{hashtag.name}</h3>
                          <p className="text-sm text-white/50">
                            {formatDistanceToNow(new Date(hashtag.searchedAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-white">{formatNumber(hashtag.postsCount)}</p>
                          <p className="text-xs text-white/50">Posts</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-white">{formatNumber(hashtag.avgLikes)}</p>
                          <p className="text-xs text-white/50">Avg Likes</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-white">{formatNumber(hashtag.avgComments)}</p>
                          <p className="text-xs text-white/50">Avg Comments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    variant="ghost"
                    className="text-white/70 hover:text-white disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "default" : "ghost"}
                        className={currentPage === page 
                          ? "bg-[#f059da] hover:bg-[#f059da]/90 text-white" 
                          : "text-white/70 hover:text-white"
                        }
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    variant="ghost"
                    className="text-white/70 hover:text-white disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
