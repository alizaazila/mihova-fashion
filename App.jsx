import { useState } from 'react';
import './App.css';
import { theme } from './styles/theme';
import { WardrobeManager } from './components/WardrobeManager';
import { StyleQuiz } from './components/StyleQuiz';
import { OutfitStudio } from './components/OutfitStudio';
import { AIRecommendations } from './components/AIRecommendations';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
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
      {/* Navigation */}
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
          {['home', 'wardrobe', 'outfit', 'quiz', 'recommendations', 'analytics'].map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)} 
              style={navButtonStyle(currentPage === page)}
            >
              {getPageLabel(page)}
            </button>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <div style={{ 
        padding: '40px 20px',
        minHeight: 'calc(100vh - 80px)',
        background: theme.gradients.primary
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'wardrobe' && <WardrobePage />}
          {currentPage === 'outfit' && <OutfitStudioPage />}
          {currentPage === 'quiz' && <StyleQuiz />}
          {currentPage === 'recommendations' && <AIRecommendations styleDNA={styleDNA} wardrobe={wardrobe} />}
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
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '13px',
    textTransform: 'capitalize',
    boxShadow: isActive ? theme.shadows.medium : 'none',
  };
}

function getPageLabel(page) {
  const labels = {
    home: '🏠 Home',
    wardrobe: '👗 Wardrobe',
    outfit: '✨ Outfit Studio',
    quiz: '🎯 Style Quiz',
    recommendations: '🤖 AI Recommends',
    analytics: '📊 Analytics'
  };
  return labels[page] || page;
}

function HomePage() {
  return (
    <div style={{ 
      textAlign: 'center',
      background: theme.gradients.card,
      padding: '80px 40px',
      borderRadius: '20px',
      boxShadow: theme.shadows.dark
    }}>
      <h2 style={{ 
        fontFamily: theme.fonts.heading, 
        color: theme.colors.primary, 
        fontSize: '56px',
        marginBottom: '15px',
        fontWeight: 'bold'
      }}>
        Confidence Starts with What You Wear
      </h2>
      <p style={{ 
        fontSize: '20px', 
        color: theme.colors.textLight,
        marginBottom: '30px',
        maxWidth: '600px',
        margin: '15px auto 30px'
      }}>
        Your personal AI style assistant. Discover outfits. Understand your wardrobe. Wear better.
      </p>
      <button style={{
        backgroundColor: theme.colors.accent,
        color: theme.colors.primary,
        padding: '18px 50px',
        fontSize: '18px',
        border: 'none',
        cursor: 'pointer',
        fontFamily: theme.fonts.heading,
        fontWeight: 'bold',
        borderRadius: '12px',
        boxShadow: theme.shadows.medium,
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-3px)';
        e.target.style.boxShadow = theme.shadows.dark;
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = theme.shadows.medium;
      }}>
        Start Styling →
      </button>
    </div>
  );
}

function WardrobePage() {
  return <WardrobeManager />;
}

function OutfitStudioPage() {
  return <OutfitStudio />;
}

export default App;