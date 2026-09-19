import { useState } from 'react';
import { theme } from '../styles/theme';
import { analyzeOutfit } from '../utils/claudeApi';
import { ShoppingModal } from './ShoppingIntegration';

export function AIRecommendations({ styleDNA, wardrobe }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [showShopping, setShowShopping] = useState(false);

  const generateRecommendations = async () => {
    setLoading(true);

    // Group wardrobe by type
    const grouped = {
      tops: wardrobe.filter(item => item.type === 'top'),
      bottoms: wardrobe.filter(item => item.type === 'bottom'),
      jackets: wardrobe.filter(item => item.type === 'jacket'),
      shoes: wardrobe.filter(item => item.type === 'shoes'),
    };

    // Generate multiple outfit combos
    const outfits = [];
    
    if (grouped.tops.length > 0 && grouped.bottoms.length > 0) {
      for (let i = 0; i < 3; i++) {
        const top = grouped.tops[Math.floor(Math.random() * grouped.tops.length)];
        const bottom = grouped.bottoms[Math.floor(Math.random() * grouped.bottoms.length)];
        const jacket = grouped.jackets[Math.floor(Math.random() * (grouped.jackets.length + 1))];
        const shoe = grouped.shoes[Math.floor(Math.random() * (grouped.shoes.length + 1))];

        const outfit = {
          id: i,
          items: {
            top: top,
            bottom: bottom,
            jacket: jacket || null,
            shoes: shoe || null,
          }
        };

        const analysis = await analyzeOutfit(outfit.items);
        outfit.score = analysis?.score || 75;
        outfit.analysis = analysis?.analysis || 'Great combination!';
        outfit.suggestion = analysis?.suggestion || 'Add accessories';

        outfits.push(outfit);
      }
    }

    setRecommendations(outfits);
    setLoading(false);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.primary,
          fontSize: '42px',
          marginBottom: '15px'
        }}>
          AI Outfit Recommendations
        </h2>
        
        {styleDNA && (
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '25px' }}>
            Based on your style: <strong>{styleDNA}</strong>
          </p>
        )}

        <button
          onClick={generateRecommendations}
          disabled={loading}
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.primary,
            padding: '15px 40px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Generating... 🤖' : 'Get AI Recommendations'}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div>
          <h3 style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
            marginBottom: '30px'
          }}>
            Your Personalized Outfits
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {recommendations.map((outfit, idx) => (
              <div
                key={outfit.id}
                style={{
                  border: `3px solid ${theme.colors.primary}`,
                  borderRadius: '12px',
                  padding: '25px',
                  backgroundColor: theme.colors.gray
                }}
              >
                {/* Score */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ fontFamily: theme.fonts.heading, margin: 0 }}>
                    Look {idx + 1}
                  </h4>
                  <span style={{
                    backgroundColor: theme.colors.accent,
                    color: theme.colors.primary,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}>
                    {outfit.score}%
                  </span>
                </div>

                {/* Items */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  {outfit.items.top && (
                    <div style={{
                      backgroundColor: outfit.items.top.color,
                      borderRadius: '8px',
                      padding: '15px',
                      textAlign: 'center',
                      border: `2px solid ${theme.colors.primary}`
                    }}>
                      <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        {outfit.items.top.name}
                      </p>
                    </div>
                  )}

                  {outfit.items.bottom && (
                    <div style={{
                      backgroundColor: outfit.items.bottom.color,
                      borderRadius: '8px',
                      padding: '15px',
                      textAlign: 'center',
                      border: `2px solid ${theme.colors.primary}`
                    }}>
                      <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        {outfit.items.bottom.name}
                      </p>
                    </div>
                  )}

                  {outfit.items.jacket && (
                    <div style={{
                      backgroundColor: outfit.items.jacket.color,
                      borderRadius: '8px',
                      padding: '15px',
                      textAlign: 'center',
                      border: `2px solid ${theme.colors.primary}`
                    }}>
                      <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        {outfit.items.jacket.name}
                      </p>
                    </div>
                  )}

                  {outfit.items.shoes && (
                    <div style={{
                      backgroundColor: outfit.items.shoes.color,
                      borderRadius: '8px',
                      padding: '15px',
                      textAlign: 'center',
                      border: `2px solid ${theme.colors.primary}`
                    }}>
                      <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        {outfit.items.shoes.name}
                      </p>
                    </div>
                  )}
                </div>

                {/* Analysis */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px', fontStyle: 'italic' }}>
                    {outfit.analysis}
                  </p>
                  <p style={{ fontSize: '13px', color: theme.colors.accent, fontWeight: 'bold', margin: 0 }}>
                    💡 {outfit.suggestion}
                  </p>
                </div>

                {/* Shop Button */}
                <button
                  onClick={() => {
                    setSelectedOutfit(outfit);
                    setShowShopping(true);
                  }}
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.accent,
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    width: '100%'
                  }}
                >
                  Shop Similar Items 🛍️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ShoppingModal 
        isOpen={showShopping} 
        onClose={() => setShowShopping(false)} 
        outfit={selectedOutfit}
      />
    </div>
  );
}