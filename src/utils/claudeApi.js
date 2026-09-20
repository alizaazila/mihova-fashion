export async function analyzeOutfit(items, apiKey) {
  if (!apiKey) {
    return {
      score: 8,
      analysis: "Demo analysis: This is a well-balanced outfit combination.",
      suggestion: "Try adding an accessory to complete the look!",
      isDemo: true
    };
  }

  const itemNames = items.map(item => `${item.name} (${item.type})`).join(', ');
  
  const prompt = `You are a professional fashion stylist. Analyze this outfit and provide:
1. A style score (1-10)
2. Brief analysis (1-2 sentences)
3. One styling suggestion

Outfit: ${itemNames}

Respond in this exact format:
SCORE: [number]
ANALYSIS: [text]
SUGGESTION: [text]`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1',
        max_tokens: 300,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      console.error('API Error:', response.status);
      return {
        score: 8,
        analysis: "Demo analysis: Outfit looks great!",
        suggestion: "Keep exploring different combinations!",
        isDemo: true
      };
    }

    const data = await response.json();
    const text = data.content[0].text;
    
    const scoreMatch = text.match(/SCORE:\s*(\d+)/);
    const analysisMatch = text.match(/ANALYSIS:\s*([^\n]+)/);
    const suggestionMatch = text.match(/SUGGESTION:\s*([^\n]+)/);

    return {
      score: scoreMatch ? parseInt(scoreMatch[1]) : 8,
      analysis: analysisMatch ? analysisMatch[1].trim() : "Great outfit choice!",
      suggestion: suggestionMatch ? suggestionMatch[1].trim() : "Perfect look!",
      isDemo: false
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      score: 8,
      analysis: "Demo: Cloud connectivity issue. Using fallback analysis.",
      suggestion: "Your outfit looks stylish!",
      isDemo: true
    };
  }
}