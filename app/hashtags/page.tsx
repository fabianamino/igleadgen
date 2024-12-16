'use client';

import { useState, useEffect } from 'react';
import { Hash, ChevronLeft, ChevronRight, ArrowLeft, Search } from 'lucide-react';
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
  const [isVisible, setIsVisible] = useState(false);

  const hashtagsPerPage = 12;
  const totalPages = Math.ceil(hashtags.length / hashtagsPerPage);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          <div className={`flex items-center justify-between mb-8 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.back()}
                variant="ghost"
                className="text-white/70 hover:text-white group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f059da]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowLeft className="w-5 h-5 relative z-10" />
              </Button>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Hash className="w-6 h-6 text-[#f059da]" />
                Saved Hashtags
              </h1>
            </div>
            <Button
              onClick={() => router.push('/hashtag-search')}
              className="bg-[#f059da] hover:bg-[#f059da]/90 text-white group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search New Hashtags
              </div>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#f059da]/20 animate-pulse" />
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#f059da] border-t-transparent relative"></div>
              </div>
            </div>
          ) : error ? (
            <div className={`text-center text-red-500 min-h-[400px] flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {error}
            </div>
          ) : hashtags.length === 0 ? (
            <div className={`text-center text-white/70 min-h-[400px] flex flex-col items-center justify-center gap-4 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Hash className="w-12 h-12 text-[#f059da]/50" />
              <p className="text-lg">No saved hashtags yet.</p>
              <Button
                onClick={() => router.push('/hashtag-search')}
                className="bg-[#f059da] hover:bg-[#f059da]/90 text-white group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Start Searching Hashtags
                </div>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentPageHashtags().map((hashtag, index) => (
                  <div
                    key={hashtag.id}
                    className={`group relative overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br from-black/50 via-black/30 to-black/10 p-6 hover:border-[#f059da]/20 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-50 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f059da]/10 group-hover:scale-110 transition-transform duration-300">
                          <Hash className="w-5 h-5 text-[#f059da]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#f059da] transition-colors duration-300">#{hashtag.name}</h3>
                          <p className="text-sm text-white/50">
                            {formatDistanceToNow(new Date(hashtag.searchedAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1 group-hover:transform group-hover:translate-y-[-2px] transition-transform duration-300">
                          <p className="text-lg font-semibold text-white">{formatNumber(hashtag.postsCount)}</p>
                          <p className="text-xs text-white/50">Posts</p>
                        </div>
                        <div className="space-y-1 group-hover:transform group-hover:translate-y-[-2px] transition-transform duration-300 delay-75">
                          <p className="text-lg font-semibold text-white">{formatNumber(hashtag.avgLikes)}</p>
                          <p className="text-xs text-white/50">Avg Likes</p>
                        </div>
                        <div className="space-y-1 group-hover:transform group-hover:translate-y-[-2px] transition-transform duration-300 delay-150">
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
                <div className={`flex justify-center items-center gap-4 mt-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <Button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    variant="ghost"
                    className="text-white/70 hover:text-white disabled:opacity-50 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f059da]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <ChevronLeft className="w-5 h-5 relative z-10" />
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "default" : "ghost"}
                        className={`${
                          currentPage === page 
                            ? "bg-[#f059da] hover:bg-[#f059da]/90 text-white" 
                            : "text-white/70 hover:text-white"
                        } relative overflow-hidden group`}
                      >
                        <div className="absolute inset-0 bg-white/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">{page}</span>
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    variant="ghost"
                    className="text-white/70 hover:text-white disabled:opacity-50 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f059da]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <ChevronRight className="w-5 h-5 relative z-10" />
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
