import { NextResponse } from 'next/server';

interface InstagramError {
  message: string;
  status?: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hashtag = searchParams.get('hashtag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '30');

    if (!hashtag) {
      return NextResponse.json({ error: 'Hashtag parameter is required' }, { status: 400 });
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost = process.env.RAPIDAPI_HOST;

    if (!rapidApiKey || !rapidApiHost) {
      console.error('Missing required environment variables:');
      console.error('RAPIDAPI_KEY:', !!rapidApiKey);
      console.error('RAPIDAPI_HOST:', !!rapidApiHost);
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    console.log('Using API Host:', rapidApiHost);
    console.log('API Key length:', rapidApiKey.length, 'First 4 chars:', rapidApiKey.substring(0, 4));

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost,
        'Accept': 'application/json'
      }
    };

    // Use the correct endpoint format according to RapidAPI docs
    const apiUrl = `https://${rapidApiHost}/v1/hashtag?hashtag=${encodeURIComponent(hashtag)}`;
    console.log('Fetching from URL:', apiUrl);

    const response = await fetch(apiUrl, options);
    console.log('API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Instagram API responded with status: ${response.status}`);
    }

    const rawResponse = await response.text();
    console.log('Raw Response Length:', rawResponse.length);

    try {
      const data = JSON.parse(rawResponse);
      console.log('Raw API response data:', data);

      // Ensure we have the correct data structure
      const responseData = {
        data: {
          additional_data: {
            formatted_media_count: data.data?.additional_data?.formatted_media_count || '0',
            media_count: data.data?.additional_data?.media_count || 0,
            name: data.data?.additional_data?.name || hashtag,
            subtitle: data.data?.additional_data?.subtitle
          },
          items: data.data?.items?.map(item => ({
            id: item.id,
            code: item.code,
            taken_at: item.taken_at,
            pk: item.pk,
            media_type: item.media_type,
            caption_text: item.caption?.text || '',
            like_count: item.like_count,
            comment_count: item.comment_count,
            thumbnail_url: item.image_versions2?.candidates?.[0]?.url || item.thumbnail_url,
            video_url: item.video_url,
            user: item.user ? {
              pk: item.user.pk,
              username: item.user.username,
              full_name: item.user.full_name,
              profile_pic_url: item.user.profile_pic_url
            } : undefined
          })) || []
        }
      };

      console.log('Transformed response:', {
        additional_data: responseData.data.additional_data,
        itemsCount: responseData.data.items.length
      });

      if (data.data?.items?.[0]) {
        console.log('Sample post structure:', {
          original: data.data.items[0],
          transformed: responseData.data.items[0]
        });
      }
      
      return NextResponse.json(responseData);

    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Raw response:', rawResponse.substring(0, 200) + '...');
      return NextResponse.json({ error: 'Invalid API response format' }, { status: 500 });
    }

  } catch (error) {
    console.error('API error:', error);
    const errorResponse: InstagramError = {
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      status: 500
    };
    return NextResponse.json({ error: errorResponse.message }, { status: errorResponse.status });
  }
}
