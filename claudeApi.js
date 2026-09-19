export async function analyzeOutfit(items) {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;

  if (!apiKey) {
    console.error('Claude API key not found');
    return null;
  }

  const itemsList = Object.entries(items)
    .filter(([_, item]) => item !== null)
    .map(([type, item]) => `${type}: ${item.name} (color: ${item.color})`)
    .join('\n');

  const prompt = `You are a professional fashion stylist. Analyze this outfit and provide:
1. A style score from 0-100
2. Why this combination works (or doesn't)
3. One specific improvement suggestion

Outfit:
${itemsList}

Respond in this exact format:
SCORE: [number]
ANALYSIS: [2-3 sentences]
SUGGESTION: [1 sentence improvement]`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Claude API error:', data);
      return null;
    }

    const text = data.content[0].text;
    
    // Parse response
    const scoreMatch = text.match(/SCORE:\s*(\d+)/);
    const analysisMatch = text.match(/ANALYSIS:\s*(.+?)(?=SUGGESTION:|$)/s);
    const suggestionMatch = text.match(/SUGGESTION:\s*(.+?)$/s);

    return {
      score: scoreMatch ? parseInt(scoreMatch[1]) : 75,
      analysis: analysisMatch ? analysisMatch[1].trim() : 'Great outfit choice!',
      suggestion: suggestionMatch ? suggestionMatch[1].trim() : 'Consider adding an accessory.',
    };
  } catch (error) {
    console.error('Error analyzing outfit:', error);
    return null;
  }
}