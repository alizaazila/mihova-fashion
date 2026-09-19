import { useState } from 'react';
import { theme } from '../styles/theme';

export function WardrobeManager() {
  const [items, setItems] = useState([
    { id: 1, name: 'Black Blazer', type: 'jacket', color: '#000000' },
    { id: 2, name: 'Blue Jeans', type: 'bottom', color: '#1a3a5c' },
    { id: 3, name: 'White T-Shirt', type: 'top', color: '#ffffff' },
    { id: 4, name: 'Black Heels', type: 'shoes', color: '#1a1a1a' },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'top',
    color: '#000000',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addItem = () => {
    if (formData.name.trim()) {
      setItems(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ name: '', type: 'top', color: '#000000' });
    }
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const itemsByType = {
    top: items.filter(i => i.type === 'top'),
    bottom: items.filter(i => i.type === 'bottom'),
    jacket: items.filter(i => i.type === 'jacket'),
    shoes: items.filter(i => i.type === 'shoes'),
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.white,
          fontSize: '42px',
          marginBottom: '10px'
        }}>
          My Wardrobe
        </h1>
        <p style={{
          color: theme.colors.accent,
          fontSize: '16px',
          margin: 0
        }}>
          {items.length} items • Discover your style
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        
        {/* Add Item Form */}
        <div style={{
          background: theme.gradients.card,
          padding: '30px',
          borderRadius: '15px',
          boxShadow: theme.shadows.medium,
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <h3 style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
            marginTop: 0,
            marginBottom: '20px',
            fontSize: '20px'
          }}>
            Add to Wardrobe
          </h3>

          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: theme.colors.primary,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Black Blazer"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${theme.colors.primary}`,
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: theme.fonts.body,
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: theme.colors.primary,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Category
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${theme.colors.primary}`,
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: theme.fonts.body,
                cursor: 'pointer'
              }}
            >
              <option value="top">👕 Top</option>
              <option value="bottom">👖 Bottom</option>
              <option value="jacket">🧥 Jacket</option>
              <option value="shoes">👞 Shoes</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: theme.colors.primary,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Color
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                style={{
                  width: '60px',
                  height: '60px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              />
              <div style={{
                flex: 1,
                padding: '12px',
                backgroundColor: formData.color,
                borderRadius: '8px',
                border: `2px solid ${theme.colors.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '12px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>
                {formData.color}
              </div>
            </div>
          </div>

          <button
            onClick={addItem}
            style={{
              width: '100%',
              backgroundColor: theme.colors.accent,
              color: theme.colors.primary,
              padding: '14px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontFamily: theme.fonts.heading,
              transition: 'all 0.3s ease',
              boxShadow: theme.shadows.medium
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = theme.shadows.dark;
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = theme.shadows.medium;
            }}
          >
            + Add Item
          </button>
        </div>

        {/* Wardrobe Grid by Category */}
        <div>
          {['top', 'bottom', 'jacket', 'shoes'].map(type => (
            <div key={type} style={{ marginBottom: '40px' }}>
              <h3 style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.white,
                fontSize: '22px',
                marginBottom: '20px',
                textTransform: 'capitalize',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                {type === 'top' && '👕'}
                {type === 'bottom' && '👖'}
                {type === 'jacket' && '🧥'}
                {type === 'shoes' && '👞'}
                {type}s ({itemsByType[type].length})
              </h3>

              {itemsByType[type].length === 0 ? (
                <div style={{
                  padding: '30px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  border: `2px dashed ${theme.colors.accent}`,
                  color: theme.colors.textLight
                }}>
                  No {type}s yet. Add your first piece!
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '15px'
                }}>
                  {itemsByType[type].map(item => (
                    <div
                      key={item.id}
                      style={{
                        background: theme.gradients.card,
                        border: `2px solid ${theme.colors.primary}`,
                        borderRadius: '12px',
                        padding: '15px',
                        textAlign: 'center',
                        boxShadow: theme.shadows.light,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = theme.shadows.dark;
                        e.currentTarget.style.borderColor = theme.colors.accent;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = theme.shadows.light;
                        e.currentTarget.style.borderColor = theme.colors.primary;
                      }}
                    >
                      {/* Color Circle */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        margin: '0 auto 15px',
                        border: `3px solid ${theme.colors.accent}`,
                        boxShadow: `0 0 20px ${item.color}30`
                      }} />

                      {/* Item Details */}
                      <h4 style={{
                        fontFamily: theme.fonts.heading,
                        margin: '10px 0 5px 0',
                        color: theme.colors.primary,
                        fontSize: '14px'
                      }}>
                        {item.name}
                      </h4>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          backgroundColor: '#ff6b6b',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          marginTop: '10px',
                          width: '100%',
                          fontSize: '12px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#ff5252';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#ff6b6b';
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}