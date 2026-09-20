import { useState } from 'react';
import './App.css';
import { theme } from './styles/theme';
import { WardrobeManager } from './components/WardrobeManager';
import { StyleQuiz } from './components/StyleQuiz';
import { OutfitStudio } from './components/OutfitStudio';
import { AIRecommendations } from './components/AIRecommendations';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { VisualRecommendations } from './components/VisualRecommendations';
import { ShoppingIntegration } from './components/ShoppingIntegration';
import { initializeAnalytics } from './utils/wardrobe-analytics';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [styleDNA, setStyleDNA] = useState(null);
  const [analytics, setAnalytics] = useState(initializeAnalytics());
  const [wardrobe, setWardrobe] = useState([
    { id: 1, name: 'Black Blazer', type: 'jacket', color: '#000000' },
    { id: 2, name: 'Blue Jeans', type: 'bottom', color: '#1a3a5c' },
    { id: 3, name: 'White T-Shirt', type: 'top', color: '#ffffff' },
    { id: 4, name: 'Black Heels', type: 'shoes', color: '#1a1a1a' },
  ]);

  return (
    <div style={{ 
      fontFamily: theme.fonts.body,
      backgroundColor: theme.colors.white,
      minHeight: '100vh',
      background: theme.gradients.primary
    }}>
      <nav style={{
        background: 'rgba(45, 27, 61, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2px solid ${theme.colors.accent}`,
        boxShadow: theme.shadows.dark,
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{ 
          color: theme.colors.accent, 
          fontFamily: theme.fonts.heading, 
          margin: 0,
          fontSize: '32px',
          letterSpacing: '2px'
        }}>
          ✨ MIHOVA
        </h1>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentPage('home')} style={navButtonStyle(currentPage === 'home')}>🏠 Home</button>
          <button onClick={() => setCurrentPage('wardrobe')} style={navButtonStyle(currentPage === 'wardrobe')}>👗 Wardrobe</button>
          <button onClick={() => setCurrentPage('outfit')} style={navButtonStyle(currentPage === 'outfit')}>✨ Studio</button>
          <button onClick={() => setCurrentPage('quiz')} style={navButtonStyle(currentPage === 'quiz')}>🎯 Quiz</button>
          <button onClick={() => setCurrentPage('recommendations')} style={navButtonStyle(currentPage === 'recommendations')}>🤖 AI</button>
          <button onClick={() => setCurrentPage('visual')} style={navButtonStyle(currentPage === 'visual')}>👗 Visual</button>
          <button onClick={() => setCurrentPage('shopping')} style={navButtonStyle(currentPage === 'shopping')}>🛍️ Shop</button>
          <button onClick={() => setCurrentPage('analytics')} style={navButtonStyle(currentPage === 'analytics')}>📊 Analytics</button>
        </div>
      </nav>

      <div style={{ 
        padding: '40px 20px',
        minHeight: 'calc(100vh - 80px)',
        background: theme.gradients.primary
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'wardrobe' && <WardrobeManager />}
          {currentPage === 'outfit' && <OutfitStudio wardrobe={wardrobe} />}
          {currentPage === 'quiz' && <StyleQuiz />}
          {currentPage === 'recommendations' && <AIRecommendations styleDNA={styleDNA} wardrobe={wardrobe} />}
          {currentPage === 'visual' && <VisualRecommendations styleDNA={styleDNA} wardrobe={wardrobe} />}
          {currentPage === 'shopping' && <ShoppingIntegration />}
          {currentPage === 'analytics' && <AnalyticsDashboard analytics={analytics} wardrobe={wardrobe} />}
        </div>
      </div>
    </div>
  );
}

function navButtonStyle(isActive) {
  return {
    backgroundColor: isActive ? theme.colors.accent : 'transparent',
    color: isActive ? theme.colors.primary : theme.colors.accent,
    border: isActive ? 'none' : `2px solid ${theme.colors.accent}`,
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: theme.fonts.heading,
    fontWeight: 'bold',
    borderRadius: '8px',