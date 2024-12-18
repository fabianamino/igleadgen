import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { businessName, businessDescription, targetAudience, goals } = await req.json();

    if (!businessName || !businessDescription || !targetAudience || !goals) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '175e40e8a2msh1b0a7544f3a19c0p16a088jsn14d59f4ca80a',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `Create a detailed Instagram marketing strategy for the following business:
            
Business Name: ${businessName}
Business Description: ${businessDescription}
Target Audience: ${targetAudience}
Business Goals: ${goals}

Please provide a comprehensive strategy that includes:
1. Content Pillars (3-5 main themes)
2. Post Types and Format Mix (e.g., Reels, Carousels, Stories)
3. Posting Schedule
4. Engagement Strategy
5. Growth Tactics
6. Key Performance Metrics to Track

Format the response in markdown with clear sections and bullet points.`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return NextResponse.json(
        { error: 'Failed to generate strategy' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Raw API response:', JSON.stringify(data, null, 2));

    if (!data?.content) {
      console.error('Unexpected API response structure:', data);
      return NextResponse.json(
        { error: 'Invalid API response format' },
        { status: 500 }
      );
    }

    return NextResponse.json({ strategy: data.content });
  } catch (error) {
    console.error('Error in generate-strategy route:', error);
    return NextResponse.json(
      { error: 'Failed to generate strategy' },
      { status: 500 }
    );
  }
}
