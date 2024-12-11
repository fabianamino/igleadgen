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
  const [hashtagData, setHashtagData] = useState<HashtagData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchHashtag = async (term: string) => {
    if (!term) return;

    setLoading(true);
    setError(null);

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
        setHashtagData(result);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchHashtag(searchTerm);
      } else {
        setHashtagData(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter hashtag..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={() => searchHashtag(searchTerm)}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
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
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              {hashtagData.additional_data.profile_pic_url && (
                <img
                  src={hashtagData.additional_data.profile_pic_url}
                  alt={hashtagData.additional_data.name || 'Hashtag profile'}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold">#{hashtagData.additional_data.name || searchTerm}</h2>
                {hashtagData.additional_data.formatted_media_count && (
                  <p className="text-gray-600">{hashtagData.additional_data.formatted_media_count} posts</p>
                )}
                {hashtagData.additional_data.subtitle && (
                  <p className="text-sm text-gray-500">{hashtagData.additional_data.subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {hashtagData.items && hashtagData.items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hashtagData.items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {item.image_versions?.items[0] && (
                    <img
                      src={item.image_versions.items[0].url}
                      alt={item.caption?.text || 'Instagram post'}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  {item.video_versions && item.video_versions[0] && (
                    <video
                      src={item.video_versions[0].url}
                      poster={item.thumbnail_url}
                      controls
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-4">
                    {item.user && (
                      <div className="flex items-center gap-2 mb-2">
                        {item.user.profile_pic_url && (
                          <img
                            src={item.user.profile_pic_url}
                            alt={item.user.username || 'User'}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        {item.user.username && (
                          <span className="font-medium">{item.user.username}</span>
                        )}
                      </div>
                    )}
                    {item.caption?.text && (
                      <p className="text-gray-600 text-sm line-clamp-3">{item.caption.text}</p>
                    )}
                    <div className="mt-2 flex items-center gap-4 text-gray-500 text-sm">
                      {item.like_count !== undefined && (
                        <span>{formatCount(item.like_count)} likes</span>
                      )}
                      {item.comment_count !== undefined && (
                        <span>{formatCount(item.comment_count)} comments</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No posts found for #{searchTerm}</p>
            </div>
          )}
        </div>
      )}

      {hashtagData === null && !loading && searchTerm && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No hashtags found for #{searchTerm}</p>
        </div>
      )}

      {!searchTerm && !loading && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Enter a hashtag to start searching</p>
        </div>
      )}
    </div>
  );
};
