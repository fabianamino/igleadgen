import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    const response = await fetch('https://claude-3-5-sonnet.p.rapidapi.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'claude-3-5-sonnet.p.rapidapi.com',
        'x-rapidapi-key': '175e40e8a2msh1b0a7544f3a19c0p16a088jsn14d59f4ca80a'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet',
        messages: [
          {
            role: 'user',
            content: `Generate relevant hashtags for the following content. Return only hashtags separated by spaces, no explanations or other text: ${input}`
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
        { error: `API responded with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Raw API response:', JSON.stringify(data, null, 2)); // Debug log

    // Extract hashtags from the Claude API response structure
    if (!data?.choices?.[0]?.message?.content) {
      console.error('Unexpected API response structure:', data);
      return NextResponse.json(
        { error: 'Invalid API response format' },
        { status: 500 }
      );
    }

    const hashtags = data.choices[0].message.content;
    console.log('Extracted hashtags:', hashtags); // Debug log
    return NextResponse.json({ hashtags });
  } catch (error) {
    console.error('Error in generate-hashtags route:', error);
    return NextResponse.json(
      { error: 'Failed to generate hashtags' },
      { status: 500 }
    );
  }
}
