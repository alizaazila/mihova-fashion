import { useState } from 'react';
import './App.css';
import { theme } from './styles/theme';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div style={{ fontFamily: theme.fonts.body, minHeight: '100vh', background: theme.gradients.primary }}>
      <nav style={{ background: 'rgba(45, 27, 61, 0.95)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${theme.colors.accent}`, position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ color: theme.colors.accent, fontFamily: theme.fonts.heading, margin: 0, fontSize: '32px', letterSpacing: '2px' }}>✨ MIHOVA</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => setCurrentPage('home')} style={{ backgroundColor: currentPage === 'home' ? theme.colors.accent : 'transparent', color: theme.colors.accent, border: `2px solid ${theme.colors.accent}`, padding: '10px 20px', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold' }}>🏠 Home</button>
          <button onClick={() => setCurrentPage('about')} style={{ backgroundColor: currentPage === 'about' ? theme.colors.accent : 'transparent', color: theme.colors.accent, border: `2px solid ${theme.colors.accent}`, padding: '10px 20px', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold' }}>ℹ️ About</button>
        </div>
      </nav>

      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {currentPage === 'home' && (
          <div style={{ textAlign: 'center', background: theme.gradients.card, padding: '100px 40px', borderRadius: '20px', boxShadow: theme.shadows.dark }}>
            <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, fontSize: '56px', marginBottom: '20px' }}>Confidence Starts with What You Wear</h1>
            <p style={{ fontSize: '20px', color: theme.colors.textLight, marginBottom: '40px' }}>Your personal AI style assistant powered by Claude</p>
            <button style={{ backgroundColor: theme.colors.accent, color: theme.colors.primary, padding: '18px 50px', fontSize: '18px', border: 'none', cursor: 'pointer', fontFamily: theme.fonts.heading, fontWeight: 'bold', borderRadius: '12px', boxShadow: theme.shadows.medium }}>Start Styling →</button>
          </div>
        )}
        {currentPage === 'about' && (
          <div style={{ background: theme.gradients.card, padding: '60px 40px', borderRadius: '20px', boxShadow: theme.shadows.dark, maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, fontSize: '42px' }}>About MIHOVA</h2>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}><strong>MIHOVA</strong> is an AI-powered personal fashion assistant built with React and Claude AI.</p>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}><strong>Coming Soon:</strong> Wardrobe Management, Style Quiz, AI Recommendations, Visual Guides, Shopping Integration, and Analytics.</p>
            <p style={{ fontSize: '14px', color: theme.colors.accent, fontWeight: 'bold' }}>Built by Ummul | MBA Student | Chennai</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;