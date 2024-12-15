import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    const response = await fetch('https://claude-2-1.p.rapidapi.com/messages', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '52655f1cfbmshc28794a26461c71p1a3967jsnc854ec10622d',
        'x-rapidapi-host': 'claude-2-1.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
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
      return res.status(response.status).json({ 
        error: `API responded with status ${response.status}` 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in generate-hashtags handler:', error);
    return res.status(500).json({ error: 'Failed to generate hashtags' });
  }
}
