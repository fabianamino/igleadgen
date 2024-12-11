'use client';

import { useState, useEffect } from 'react';

interface HashtagData {
  additional_data?: {
    formatted_media_count?: string;
    media_count?: number;
    name?: string;
    profile_pic_url?: string;
    subtitle?: string;
  };
  count?: number;
  items?: Array<{
    id: string;
    caption?: {
      text?: string;
      hashtags?: string[];
      user?: {
        username?: string;
        full_name?: string;
        profile_pic_url?: string;
      };
    };
    like_count?: number;
    comment_count?: number;
    video_url?: string;
    thumbnail_url?: string;
    video_versions?: Array<{
      height: number;
      type: number;
      url: string;
      width: number;
    }>;
    image_versions?: {
      items: Array<{
        url: string;
        width: number;
        height: number;
      }>;
    };
    user?: {
      username?: string;
      full_name?: string;
      profile_pic_url?: string;
    };
  }>;
}

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const HashtagSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hashtagData, setHashtagData] = useState<HashtagData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const getCurrentPagePosts = () => {
    if (!hashtagData?.items) return [];
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return hashtagData.items.slice(startIndex, endIndex);
  };

  const totalPages = hashtagData?.items ? Math.ceil(hashtagData.items.length / postsPerPage) : 0;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const searchHashtag = async (term: string) => {
    if (!term) return;

    setLoading(true);
    setError(null);
    setCurrentPage(1); // Reset to first page on new search

    try {
      console.log('Searching for hashtag:', term);
      const response = await fetch(`/api/instagram/hashtag?hashtag=${encodeURIComponent(term)}`);
      const result = await response.json();
      console.log('Search result:', result);

      if (result.error) {
        console.error('Error from API:', result.error);
        setError(result.error);
      } else {
        console.log('Setting hashtag data:', result);
        setHashtagData(result.data);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm);
      searchHashtag(searchTerm.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter hashtag..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !searchTerm.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Searching hashtags...</p>
        </div>
      )}

      {hashtagData && hashtagData.additional_data && (
        <div>
          <div className="mb-6 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-6">
              {hashtagData.additional_data.profile_pic_url && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100">
                  <img
                    src={hashtagData.additional_data.profile_pic_url}
                    alt={hashtagData.additional_data.name || 'Hashtag profile'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">
                  #{hashtagData.additional_data.name || searchQuery}
                </h2>
                {hashtagData.additional_data.formatted_media_count && (
                  <p className="text-lg text-blue-600 font-semibold">
                    {hashtagData.additional_data.formatted_media_count} posts
                  </p>
                )}
                {hashtagData.additional_data.subtitle && (
                  <p className="text-gray-600 mt-1">{hashtagData.additional_data.subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {getCurrentPagePosts().length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentPagePosts().map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="relative pb-[100%]">
                      {item.image_versions?.items[0] && (
                        <img
                          src={item.image_versions.items[0].url}
                          alt={item.caption?.text || 'Instagram post'}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      {item.video_versions && item.video_versions[0] && (
                        <video
                          src={item.video_versions[0].url}
                          poster={item.thumbnail_url}
                          controls
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      {item.user && (
                        <div className="flex items-center gap-3 mb-3">
                          {item.user.profile_pic_url && (
                            <img
                              src={item.user.profile_pic_url}
                              alt={item.user.username || 'User'}
                              className="w-10 h-10 rounded-full border-2 border-gray-100"
                            />
                          )}
                          {item.user.username && (
                            <span className="font-semibold text-gray-800">{item.user.username}</span>
                          )}
                        </div>
                      )}
                      {item.caption?.text && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{item.caption.text}</p>
                      )}
                      <div className="flex items-center gap-6 text-gray-500 text-sm">
                        {item.like_count !== undefined && (
                          <span className="flex items-center gap-1">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            {formatCount(item.like_count)}
                          </span>
                        )}
                        {item.comment_count !== undefined && (
                          <span className="flex items-center gap-1">
                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            {formatCount(item.comment_count)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                        currentPage === pageNum
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No posts found for #{searchQuery}</p>
            </div>
          )}
        </div>
      )}

      {hashtagData === null && !loading && searchTerm && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No hashtags found for #{searchTerm}</p>
        </div>
      )}

      {!searchTerm && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Enter a hashtag to start searching</p>
        </div>
      )}
    </div>
  );
};
