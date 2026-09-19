import { useState } from 'react';
import { theme } from '../styles/theme';
import { fashionKnowledge, generateFashionRecommendation } from '../utils/fashionKnowledge';
import { userProfile } from '../utils/userProfile';

export function VisualRecommendations({ styleDNA, wardrobe }) {
  const [occasion, setOccasion] = useState('casual');
  const [weather, setWeather] = useState('sunny');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  // Clothing images from Unsplash (free, high quality)
  const clothingImages = {
    blazer: 'https://images.unsplash.com/photo-1591047990635-e53ee2b99ce3?w=400&h=500&fit=crop',
    jeans: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop',
    dress: 'https://images.unsplash.com/photo-1595777707802-21b287e3fbf7?w=400&h=500&fit=crop',
    sneakers: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    heels: 'https://images.unsplash.com/photo-1543163521-9efau8b470dd?w=400&h=500&fit=crop',
    tshirt: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    cardigan: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=500&fit=crop',
    skirt: 'https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400&h=500&fit=crop'
  };

  const generateRecommendations = () => {
    setLoading(true);

    // Get user profile
    const profile = userProfile.getProfile();

    // Generate recommendation using fashion knowledge
    const rec = generateFashionRecommendation(
      {
        styleDNA: styleDNA || profile.styleDNA,
        bodyType: profile.bodyType
      },
      occasion,
      weather,
      wardrobe
    );

    // Add visual items
    const recommendations_with_images = {
      ...rec,
      visualItems: [
        {
          type: 'Blazer',
          image: clothingImages.blazer,
          why: 'Structured & professional',
          color: 'Navy or Black'
        },
        {
          type: 'Jeans',
          image: clothingImages.jeans,
          why: 'Versatile & flattering',
          color: 'Dark blue'
        },
        {
          type: 'T-Shirt',
          image: clothingImages.tshirt,
          why: 'Perfect base layer',
          color: 'White or neutral'
        },
        {
          type: 'Sneakers',
          image: clothingImages.sneakers,
          why: 'Comfortable & stylish',
          color: 'White'
        }
      ]
    };

    setRecommendations(recommendations_with_images);
    setLoading(false);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.white,
          fontSize: '42px',
          marginBottom: '10px'
        }}>
          Visual Style Guide
        </h1>
        <p style={{
          color: theme.colors.accent,
          fontSize: '16px',
          margin: 0
        }}>
          See recommendations with real clothing images
        </p>
      </div>

      {/* Occasion & Weather Selection */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div>
          <label style={{
            display: 'block',
            color: theme.colors.white,
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            📅 Occasion
          </label>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: theme.colors.gray,
              border: `2px solid ${theme.colors.accent}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: theme.fonts.body,
              fontWeight: '600'
            }}
          >
            <option value="casual">Casual</option>
            <option value="work">Work</option>
            <option value="formal">Formal</option>
            <option value="party">Party</option>
            <option value="date">Date</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block',
            color: theme.colors.white,
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            🌦️ Weather
          </label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: theme.colors.gray,
              border: `2px solid ${theme.colors.accent}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: theme.fonts.body,
              fontWeight: '600'
            }}
          >
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cold">Cold</option>
            <option value="warm">Warm</option>
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateRecommendations}
        disabled={loading}
        style={{
          width: '100%',
          backgroundColor: theme.colors.accent,
          color: theme.colors.primary,
          padding: '16px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '10px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: '700',
          fontFamily: theme.fonts.heading,
          opacity: loading ? 0.6 : 1,
          marginBottom: '40px',
          boxShadow: theme.shadows.medium,
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = theme.shadows.dark;
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = theme.shadows.medium;
          }
        }}
      >
        {loading ? '🤖 Generating...' : '✨ Get Recommendations'}
      </button>

      {/* Recommendations Display */}
      {recommendations && (
        <div>
          <h2 style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.white,
            fontSize: '28px',
            marginBottom: '20px'
          }}>
            🎯 Your Perfect Look
          </h2>

          {/* Visual Items Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px',
            marginBottom: '40px'
          }}>
            {recommendations.visualItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: theme.gradients.card,
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: theme.shadows.medium,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = theme.shadows.dark;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.shadows.medium;
                }}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  backgroundColor: '#eee'
                }}>
                  <img
                    src={item.image}
                    alt={item.type}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.primary,
                    margin: '0 0 10px 0',
                    fontSize: '20px'
                  }}>
                    {item.type}
                  </h3>

                  <p style={{
                    color: '#666',
                    margin: '0 0 8px 0',
                    fontSize: '14px'
                  }}>
                    {item.why}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: item.color === 'White' ? '#fff' : '#333',
                      border: `2px solid ${theme.colors.primary}`
                    }} />
                    <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>
                      {item.color}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Style Tips */}
          <div style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}20 0%, ${theme.colors.accent}10 100%)`,
            border: `2px solid ${theme.colors.accent}`,
            borderRadius: '12px',
            padding: '25px'
          }}>
            <h3 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, marginTop: 0 }}>
              💡 Style Tips
            </h3>
            <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '20px' }}>
              {recommendations.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
            <p style={{ color: theme.colors.accent, fontWeight: 'bold', margin: '15px 0 0 0' }}>
              ⭐ Style Score: {recommendations.score}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}