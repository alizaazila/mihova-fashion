import { theme } from '../styles/theme';

export function ShoppingModal({ isOpen, onClose, outfit }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '40px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h2 style={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.primary,
          fontSize: '32px',
          marginBottom: '20px'
        }}>
          Shop This Look 🛍️
        </h2>

        <p style={{ color: '#666', marginBottom: '30px' }}>
          Find similar items on your favorite platforms
        </p>

        {/* Shop Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
          <a href="https://www.myntra.com" target="_blank" rel="noopener noreferrer" style={buttonStyle()}>
            👚 Shop on Myntra
          </a>
          <a href="https://www.flipkart.com" target="_blank" rel="noopener noreferrer" style={buttonStyle()}>
            🛍️ Shop on Flipkart
          </a>
          <a href="https://www.amazon.in" target="_blank" rel="noopener noreferrer" style={buttonStyle()}>
            📦 Shop on Amazon
          </a>
          <a href="https://www.asos.com" target="_blank" rel="noopener noreferrer" style={buttonStyle()}>
            ✨ Shop on ASOS
          </a>
          <a href="https://www2.hm.com" target="_blank" rel="noopener noreferrer" style={buttonStyle()}>
            👔 Shop on H&M
          </a>
          <a href="https://www.zara.com" target="_blank" rel="noopener noreferrer" style={buttonStyle()}>
            💎 Shop on Zara
          </a>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: theme.colors.primary,
            color: theme.colors.accent,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function buttonStyle() {
  return {
    padding: '15px 20px',
    backgroundColor: theme.colors.gray,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: '8px',
    textDecoration: 'none',
    color: theme.colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s'
  };
}