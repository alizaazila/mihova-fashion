import { useState } from 'react';
import { theme } from '../styles/theme';
import { generateFashionRecommendation } from '../utils/fashionKnowledge';
import { userProfile } from '../utils/userProfile';

export function VisualRecommendations({ styleDNA, wardrobe = [] }) {
  const [occasion, setOccasion] = useState('casual');
  const [weather, setWeather] = useState('sunny');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const clothingImages = {
    blazer: 'https://images.unsplash.com/photo-1591047990635-e53ee2b99ce3?w=400&h=500&fit=crop',
    jeans: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop',
    dress: 'https://images.unsplash.com/photo-1595777707802-21b287e3fbf7?w=400&h=500&fit=crop',
    sneakers: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    heels: 'https://images.unsplash.com/photo-1543163521-9efau8b470dd?w=400&h=500&fit=crop',
    tshirt: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
  };

  const generateRecommendations = () => {
    setLoading(true);
    const profile = userProfile.getProfile();
    const rec = generateFashionRecommendation({ styleDNA, bodyType: profile.bodyType }, occasion, weather, wardrobe);
    
    const recommendationsWithImages = {
      ...rec,
      visualItems: [
        { type: 'Blazer', image: clothingImages.blazer, why: 'Professional', color: 'Navy' },
        { type: 'Jeans', image: clothingImages.jeans, why: 'Versatile', color: 'Dark Blue' },
        { type: 'T-Shirt', image: clothingImages.tshirt, why: 'Base Layer', color: 'White' },
      ]
    };
    
    setRecommendations(recommendationsWithImages);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: '42px', marginBottom: '30px' }}>👗 Visual Style Guide</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div>
          <label style={{ display: 'block', color: theme.colors.white, fontWeight: 'bold', marginBottom: '10px' }}>📅 Occasion</label>
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.colors.gray, border: `2px solid ${theme.colors.accent}`, borderRadius: '8px', cursor: 'pointer' }}>
            <option value="casual">Casual</option>
            <option value="work">Work</option>
            <option value="formal">Formal</option>
            <option value="party">Party</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', color: theme.colors.white, fontWeight: 'bold', marginBottom: '10px' }}>🌦️ Weather</label>
          <select value={weather} onChange={(e) => setWeather(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.colors.gray, border: `2px solid ${theme.colors.accent}`, borderRadius: '8px', cursor: 'pointer' }}>
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cold">Cold</option>
            <option value="warm">Warm</option>
          </select>
        </div>
      </div>

      <button onClick={generateRecommendations} disabled={loading} style={{ width: '100%', backgroundColor: theme.colors.accent, color: theme.colors.primary, padding: '16px', fontSize: '16px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontFamily: theme.fonts.heading, marginBottom: '40px', boxShadow: theme.shadows.medium }}>
        {loading ? '🤖 Generating...' : '✨ Get Recommendations'}
      </button>

      {recommendations && (
        <div>
          <h2 style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: '28px', marginBottom: '20px' }}>🎯 Your Perfect Look</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
            {recommendations.visualItems.map((item, idx) => (
              <div key={idx} style={{ background: theme.gradients.card, borderRadius: '15px', overflow: 'hidden', boxShadow: theme.shadows.medium }}>
                <img src={item.image} alt={item.type} style={{ width: '100%', height: '300px', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, margin: '0 0 10px 0' }}>{item.type}</h3>
                  <p style={{ color: '#666', margin: '0 0 8px 0', fontSize: '14px' }}>{item.why}</p>
                  <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>{item.color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}