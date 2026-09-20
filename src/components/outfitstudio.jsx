import { useState } from 'react';
import { theme } from '../styles/theme';
import { analyzeOutfit } from '../utils/claudeApi';

export function OutfitStudio({ wardrobe = [] }) {
  const [selectedItems, setSelectedItems] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ['top', 'bottom', 'jacket', 'shoes'];

  const handleItemSelect = (category, item) => {
    setSelectedItems(prev => ({ ...prev, [category]: item }));
  };

  const analyzeThisOutfit = async () => {
    if (Object.keys(selectedItems).length < 2) {
      alert('Please select at least 2 items');
      return;
    }
    setLoading(true);
    const result = await analyzeOutfit(Object.values(selectedItems));
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: '42px', marginBottom: '30px' }}>✨ Outfit Studio</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {categories.map(category => (
          <div key={category} style={{ background: theme.gradients.card, padding: '20px', borderRadius: '12px', boxShadow: theme.shadows.medium }}>
            <h3 style={{ color: theme.colors.primary, marginTop: 0, marginBottom: '15px' }}>📦 Select {category.toUpperCase()}</h3>
            <select onChange={(e) => handleItemSelect(category, JSON.parse(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `2px solid ${theme.colors.accent}`, fontFamily: theme.fonts.body, cursor: 'pointer' }}>
              <option>Choose {category}</option>
              {wardrobe.filter(item => item.type === category).map(item => (
                <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
              ))}
            </select>
            {selectedItems[category] && <p style={{ color: theme.colors.accent, marginTop: '10px', fontSize: '13px' }}>✅ {selectedItems[category].name}</p>}
          </div>
        ))}
      </div>

      <button onClick={analyzeThisOutfit} disabled={loading} style={{ width: '100%', backgroundColor: theme.colors.accent, color: theme.colors.primary, padding: '16px', fontSize: '16px', border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontFamily: theme.fonts.heading, boxShadow: theme.shadows.medium, opacity: loading ? 0.7 : 1, marginBottom: '40px' }}>
        {loading ? '🤖 Analyzing...' : '✨ Analyze Outfit'}
      </button>

      {analysis && (
        <div style={{ marginTop: '40px', background: theme.gradients.card, padding: '30px', borderRadius: '12px', boxShadow: theme.shadows.medium, border: `2px solid ${theme.colors.accent}` }}>
          <h2 style={{ color: theme.colors.primary, marginTop: 0 }}>📊 Analysis</h2>
          <div style={{ color: '#666', lineHeight: '1.8' }}>
            <p><strong>⭐ Score:</strong> {analysis.score}/10</p>
            <p><strong>💭 Feedback:</strong> {analysis.analysis}</p>
            <p><strong>💡 Suggestion:</strong> {analysis.suggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}