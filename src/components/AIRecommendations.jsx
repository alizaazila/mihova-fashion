import { useState } from 'react';
import { theme } from '../styles/theme';
import { analyzeOutfit } from '../utils/claudeApi';

export function AIRecommendations({ styleDNA, wardrobe = [] }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async () => {
    setLoading(true);
    const randomOutfits = [];
    for (let i = 0; i < 3; i++) {
      const outfit = [
        wardrobe[Math.floor(Math.random() * wardrobe.length)],
        wardrobe[Math.floor(Math.random() * wardrobe.length)],
      ].filter(Boolean);
      if (outfit.length > 0) {
        const analysis = await analyzeOutfit(outfit);
        randomOutfits.push({ id: i, items: outfit, ...analysis });
      }
    }
    setRecommendations(randomOutfits);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: '42px', marginBottom: '30px' }}>🤖 AI Recommendations</h1>
      
      <button onClick={generateRecommendations} disabled={loading} style={{ width: '100%', backgroundColor: theme.colors.accent, color: theme.colors.primary, padding: '16px', fontSize: '16px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontFamily: theme.fonts.heading, marginBottom: '40px', boxShadow: theme.shadows.medium }}>
        {loading ? '🤖 Generating...' : '✨ Generate Recommendations'}
      </button>

      {recommendations && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {recommendations.map(rec => (
            <div key={rec.id} style={{ background: theme.gradients.card, padding: '25px', borderRadius: '15px', boxShadow: theme.shadows.medium, border: `2px solid ${theme.colors.accent}` }}>
              <h3 style={{ color: theme.colors.primary, marginTop: 0 }}>Outfit {rec.id + 1}</h3>
              <p><strong>⭐ Score:</strong> {rec.score}/10</p>
              <p style={{ fontSize: '14px', color: '#666' }}>{rec.analysis}</p>
              <p style={{ fontSize: '13px', color: theme.colors.accent, fontWeight: 'bold' }}>{rec.suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}