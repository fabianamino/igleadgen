import { NextResponse } from 'next/server';

interface InstagramError {
  message: string;
  status?: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hashtag = searchParams.get('hashtag');

    console.log('Received request for hashtag:', hashtag);

    if (!hashtag) {
      console.log('No hashtag provided');
      return NextResponse.json({ error: 'Hashtag parameter is required' }, { status: 400 });
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost = 'instagram-scraper-api2.p.rapidapi.com';

    if (!rapidApiKey) {
      console.error('RapidAPI key not found');
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': rapidApiHost
      }
    };

    const apiUrl = `https://instagram-scraper-api2.p.rapidapi.com/v1/hashtag?hashtag=${encodeURIComponent(hashtag)}`;
    
    console.log('Fetching from RapidAPI...');
    console.log('URL:', apiUrl);

    const response = await fetch(apiUrl, options);
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Instagram API responded with status: ${response.status}`);
    }

    const rawResponse = await response.text();
    console.log('Raw response:', rawResponse);

    try {
      const data = JSON.parse(rawResponse);
      console.log('Parsed data:', JSON.stringify(data, null, 2));
      return NextResponse.json(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json({ error: 'Invalid JSON response from Instagram API' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in Instagram API route:', error);
    
    const errorResponse: InstagramError = {
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      status: 500
    };

    return NextResponse.json({ error: errorResponse.message }, { status: errorResponse.status });
  }
}
