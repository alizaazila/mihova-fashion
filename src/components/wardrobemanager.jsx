import { useState } from 'react';
import { theme } from '../styles/theme';

export function WardrobeManager() {
  const [items, setItems] = useState([
    { id: 1, name: 'Black Blazer', type: 'jacket', color: '#000000' },
    { id: 2, name: 'Blue Jeans', type: 'bottom', color: '#1a3a5c' },
    { id: 3, name: 'White T-Shirt', type: 'top', color: '#ffffff' },
    { id: 4, name: 'Black Heels', type: 'shoes', color: '#1a1a1a' },
  ]);
  const [newItem, setNewItem] = useState({ name: '', type: 'top', color: '#000000' });

  const addItem = () => {
    if (newItem.name.trim()) {
      setItems([...items, { id: Date.now(), ...newItem }]);
      setNewItem({ name: '', type: 'top', color: '#000000' });
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const categories = ['top', 'bottom', 'jacket', 'shoes', 'accessory'];

  return (
    <div>
      <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: '42px', marginBottom: '30px' }}>
        👗 Wardrobe Manager
      </h1>

      <div style={{ 
        background: theme.gradients.card, 
        padding: '30px', 
        borderRadius: '15px', 
        marginBottom: '40px',
        boxShadow: theme.shadows.medium
      }}>
        <h3 style={{ color: theme.colors.primary, marginTop: 0 }}>Add New Item</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '15px' }}>
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            style={{ padding: '10px', borderRadius: '8px', border: `2px solid ${theme.colors.accent}` }}
          />
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            style={{ padding: '10px', borderRadius: '8px', border: `2px solid ${theme.colors.accent}`, cursor: 'pointer' }}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="color"
            value={newItem.color}
            onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
            style={{ padding: '5px', borderRadius: '8px', cursor: 'pointer' }}
          />
          <button
            onClick={addItem}
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.primary,
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Add +
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              background: theme.gradients.card,
              padding: '20px',
              borderRadius: '12px',
              boxShadow: theme.shadows.medium,
              border: `3px solid ${item.color}`
            }}
          >
            <h4 style={{ color: theme.colors.primary, margin: '0 0 10px 0' }}>{item.name}</h4>
            <p style={{ color: '#666', margin: '5px 0' }}>Type: {item.type}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: item.color, borderRadius: '8px', border: `2px solid ${theme.colors.accent}` }} />
              <span style={{ color: '#666', fontSize: '13px' }}>{item.color}</span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              style={{
                backgroundColor: '#ff6b6b',
                color: 'white',
                padding: '8px 15px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                width: '100%',
                fontWeight: 'bold'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}