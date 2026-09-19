import { useState } from 'react';
import { theme } from '../styles/theme';
import { analyzeOutfit } from '../utils/claudeApi';

export function OutfitStudio({ wardrobe = [] }) {
  const [selectedItems, setSelectedItems] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ['top', 'bottom', 'jacket', 'shoes'];

  const handleItemSelect = (category, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: item
    }));
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
      <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: '42px' }}>
        ✨ Outfit Studio
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {categories.map(category => (
          <div key={category} style={{ background: theme.gradients.card, padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ color: theme.colors.primary, marginTop: 0 }}>Select {category}</h3>
            <select onChange={(e) => handleItemSelect(category, JSON.parse(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `2px solid ${theme.colors.accent}` }}>
              <option>Choose {category}</option>
              {wardrobe.filter(item => item.type === category).map(item => (
                <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button onClick={analyzeThisOutfit} disabled={loading} style={{ width: '100%', backgroundColor: theme.colors.accent, color: theme.colors.primary, padding: '16px', fontSize: '16px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontFamily: theme.fonts.heading }}>
        {loading ? '🤖 Analyzing...' : '✨ Analyze Outfit'}
      </button>

      {analysis && (
        <div style={{ marginTop: '40px', background: theme.gradients.card, padding: '30px', borderRadius: '12px', color: '#666' }}>
          <h2 style={{ color: theme.colors.primary }}>Analysis</h2>
          <p><strong>Score:</strong> {analysis.score}/10</p>
          <p><strong>Feedback:</strong> {analysis.analysis}</p>
          <p><strong>Suggestion:</strong> {analysis.suggestion}</p>
        </div>
      )}
    </div>
  );
}