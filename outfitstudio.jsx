import { useState } from 'react';
import { theme } from '../styles/theme';
import { analyzeOutfit } from '../utils/claudeApi';
import { ShoppingModal } from './ShoppingIntegration';

export function OutfitStudio() {
  const [selectedItems, setSelectedItems] = useState({
    top: null,
    bottom: null,
    jacket: null,
    shoes: null,
  });
  const [outfits, setOutfits] = useState([]);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [showShopping, setShowShopping] = useState(false);
  const [loading, setLoading] = useState(false);

  const wardrobe = [
    { id: 1, name: 'Black Blazer', type: 'jacket', color: '#000000' },
    { id: 2, name: 'Blue Jeans', type: 'bottom', color: '#1a3a5c' },
    { id: 3, name: 'White T-Shirt', type: 'top', color: '#ffffff' },
    { id: 4, name: 'Black Heels', type: 'shoes', color: '#1a1a1a' },
    { id: 5, name: 'Beige Cardigan', type: 'jacket', color: '#d4a574' },
    { id: 6, name: 'Cream Pants', type: 'bottom', color: '#f5deb3' },
  ];

  const addItem = (type, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: prev[type]?.id === item.id ? null : item
    }));
  };

  const removeItem = (type) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: null
    }));
  };

  const createOutfit = async () => {
    if (Object.values(selectedItems).some(item => item !== null)) {
      setLoading(true);
      const analysis = await analyzeOutfit(selectedItems);
      
      const outfit = {
        id: Date.now(),
        items: selectedItems,
        score: analysis?.score || Math.floor(Math.random() * 40 + 60),
        analysis: analysis?.analysis || 'Great outfit!',
        suggestion: analysis?.suggestion || 'Add an accessory',
        name: `Outfit ${outfits.length + 1}`
      };
      
      setOutfits(prev => [...prev, outfit]);
      setSelectedItems({ top: null, bottom: null, jacket: null, shoes: null });
      setLoading(false);
    }
  };

  const deleteOutfit = (id) => {
    setOutfits(prev => prev.filter(outfit => outfit.id !== id));
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
          AI Outfit Studio
        </h1>
        <p style={{
          color: theme.colors.accent,
          fontSize: '16px',
          margin: 0
        }}>
          Mix & match. Get AI insights. Save your looks.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '40px' }}>
        
        {/* Left: Item Selector */}
        <div>
          {['top', 'bottom', 'jacket', 'shoes'].map(type => (
            <div key={type} style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.white,
                fontSize: '18px',
                textTransform: 'capitalize',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: `2px solid ${theme.colors.accent}`
              }}>
                {type === 'top' && '👕'} 
                {type === 'bottom' && '👖'}
                {type === 'jacket' && '🧥'}
                {type === 'shoes' && '👞'}
                {' '}Choose {type}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '12px'
              }}>
                {wardrobe.filter(item => item.type === type).map(item => (
                  <div
                    key={item.id}
                    onClick={() => addItem(type, item)}
                    style={{
                      border: selectedItems[type]?.id === item.id
                        ? `3px solid ${theme.colors.accent}`
                        : `2px solid ${theme.colors.primary}`,
                      padding: '15px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      backgroundColor: theme.colors.gray,
                      textAlign: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: selectedItems[type]?.id === item.id 
                        ? theme.shadows.medium 
                        : theme.shadows.light
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = theme.shadows.dark;
                      e.currentTarget.style.borderColor = theme.colors.accent;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = selectedItems[type]?.id === item.id 
                        ? theme.shadows.medium 
                        : theme.shadows.light;
                      e.currentTarget.style.borderColor = selectedItems[type]?.id === item.id 
                        ? theme.colors.accent 
                        : theme.colors.primary;
                    }}
                  >
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      margin: '0 auto 10px',
                      border: `3px solid white`,
                      boxShadow: `0 0 15px ${item.color}50`
                    }} />
                    <p style={{
                      margin: '8px 0 0 0',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: theme.colors.primary,
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Outfit Preview */}
        <div>
          <div style={{
            background: theme.gradients.card,
            border: `3px solid ${theme.colors.primary}`,
            borderRadius: '15px',
            padding: '30px',
            height: 'fit-content',
            position: 'sticky',
            top: '100px',
            boxShadow: theme.shadows.medium
          }}>
            <h3 style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.primary,
              marginTop: 0,
              marginBottom: '20px'
            }}>
              Your Look
            </h3>

            {Object.values(selectedItems).some(item => item !== null) ? (
              <div>
                {/* Item Display */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  {selectedItems.jacket && (
                    <ItemBadge item={selectedItems.jacket} type="jacket" onRemove={() => removeItem('jacket')} />
                  )}
                  {selectedItems.top && (
                    <ItemBadge item={selectedItems.top} type="top" onRemove={() => removeItem('top')} />
                  )}
                  {selectedItems.bottom && (
                    <ItemBadge item={selectedItems.bottom} type="bottom" onRemove={() => removeItem('bottom')} />
                  )}
                  {selectedItems.shoes && (
                    <ItemBadge item={selectedItems.shoes} type="shoes" onRemove={() => removeItem('shoes')} />
                  )}
                </div>

                <button
                  onClick={createOutfit}
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: theme.colors.accent,
                    color: theme.colors.primary,
                    padding: '14px',
                    fontSize: '15px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: '700',
                    fontFamily: theme.fonts.heading,
                    opacity: loading ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    boxShadow: theme.shadows.medium
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
                  {loading ? '🤖 Analyzing...' : '✨ Save Outfit'}
                </button>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '30px 10px',
                color: theme.colors.textLight
              }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '32px' }}>👕</p>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  Select items to create a look
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Saved Outfits */}
      {outfits.length > 0 && (
        <div>
          <h2 style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.white,
            fontSize: '28px',
            marginBottom: '20px'
          }}>
            ✨ Your Saved Outfits ({outfits.length})
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {outfits.map(outfit => (
              <div
                key={outfit.id}
                style={{
                  background: theme.gradients.card,
                  border: `2px solid ${theme.colors.primary}`,
                  borderRadius: '15px',
                  padding: '20px',
                  boxShadow: theme.shadows.light,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = theme.shadows.dark;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.shadows.light;
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <h4 style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.primary,
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    {outfit.name}
                  </h4>
                  <span style={{
                    background: theme.gradients.accent,
                    color: theme.colors.primary,
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}>
                    {outfit.score}%
                  </span>
                </div>

                {/* Items */}
                <div style={{ marginBottom: '15px' }}>
                  {outfit.items.top && <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>👕 {outfit.items.top.name}</p>}
                  {outfit.items.bottom && <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>👖 {outfit.items.bottom.name}</p>}
                  {outfit.items.jacket && <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>🧥 {outfit.items.jacket.name}</p>}
                  {outfit.items.shoes && <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>👞 {outfit.items.shoes.name}</p>}
                </div>

                {/* Analysis */}
                <div style={{
                  backgroundColor: theme.colors.gray,
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <p style={{
                    margin: '0 0 8px 0',
                    fontSize: '12px',
                    color: '#666',
                    fontStyle: 'italic',
                    lineHeight: '1.5'
                  }}>
                    {outfit.analysis}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '11px',
                    color: theme.colors.accent,
                    fontWeight: '600'
                  }}>
                    💡 {outfit.suggestion}
                  </p>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setSelectedOutfit(outfit);
                      setShowShopping(true);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.accent,
                      padding: '10px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = theme.colors.secondary;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = theme.colors.primary;
                    }}
                  >
                    🛍️ Shop
                  </button>
                  <button
                    onClick={() => deleteOutfit(outfit.id)}
                    style={{
                      flex: 1,
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      padding: '10px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#ff5252';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#ff6b6b';
                    }}
                  >
                    Delete
                  </button>
                </div>
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

function ItemBadge({ item, type, onRemove }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      backgroundColor: theme.colors.gray,
      borderRadius: '8px',
      border: `2px solid ${theme.colors.primary}`
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: item.color,
        border: `2px solid white`,
        flexShrink: 0
      }} />
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: theme.colors.primary }}>
          {item.name}
        </p>
        <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#999', textTransform: 'capitalize' }}>
          {type}
        </p>
      </div>
      <button
        onClick={onRemove}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#ff6b6b',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '4px 8px'
        }}
      >
        ✕
      </button>
    </div>
  );
}