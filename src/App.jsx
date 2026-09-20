import { useState } from 'react';
import './App.css';

const colors = {
  primary: '#2D1B3D',
  accent: '#D4AF37',
  white: '#FFFFFF',
  gray: '#F5F5F5',
  text: '#333333',
  textLight: '#666666'
};

const gradients = {
  primary: 'linear-gradient(135deg, #2D1B3D 0%, #1a0f28 100%)',
  card: 'linear-gradient(135deg, #ffffff 0%, #f9f7fc 100%)',
  accent: 'linear-gradient(135deg, #D4AF37 0%, #c49820 100%)'
};

const shadows = {
  light: '0 2px 8px rgba(0,0,0,0.1)',
  medium: '0 4px 12px rgba(212, 175, 55, 0.15)',
  dark: '0 8px 24px rgba(45, 27, 61, 0.2)'
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navStyle = (isActive) => ({
    backgroundColor: isActive ? colors.accent : 'transparent',
    color: isActive ? colors.primary : colors.accent,
    border: isActive ? 'none' : `2px solid ${colors.accent}`,
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: '"Cormorant Garamond", serif',
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    boxShadow: isActive ? shadows.medium : 'none',
  });

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', minHeight: '100vh', background: gradients.primary }}>
      {/* Navigation */}
      <nav style={{
        background: 'rgba(45, 27, 61, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2px solid ${colors.accent}`,
        boxShadow: shadows.dark,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap'
      }}>
        <h1 style={{ color: colors.accent, fontFamily: '"Cormorant Garamond", serif', margin: 0, fontSize: '32px', letterSpacing: '2px' }}>
          ✨ MIHOVA
        </h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
          <button onClick={() => setCurrentPage('home')} style={navStyle(currentPage === 'home')}>🏠 Home</button>
          <button onClick={() => setCurrentPage('wardrobe')} style={navStyle(currentPage === 'wardrobe')}>👗 Wardrobe</button>
          <button onClick={() => setCurrentPage('quiz')} style={navStyle(currentPage === 'quiz')}>🎯 Quiz</button>
          <button onClick={() => setCurrentPage('ai')} style={navStyle(currentPage === 'ai')}>🤖 AI</button>
          <button onClick={() => setCurrentPage('shop')} style={navStyle(currentPage === 'shop')}>🛍️ Shop</button>
          <button onClick={() => setCurrentPage('analytics')} style={navStyle(currentPage === 'analytics')}>📊 Analytics</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: '40px 20px', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'wardrobe' && <WardrobePage />}
          {currentPage === 'quiz' && <QuizPage />}
          {currentPage === 'ai' && <AIPage />}
          {currentPage === 'shop' && <ShopPage />}
          {currentPage === 'analytics' && <AnalyticsPage />}
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div style={{
      textAlign: 'center',
      background: gradients.card,
      padding: '100px 40px',
      borderRadius: '20px',
      boxShadow: shadows.dark
    }}>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.primary, fontSize: '56px', marginBottom: '20px', margin: 0 }}>
        Confidence Starts with What You Wear
      </h1>
      <p style={{ fontSize: '18px', color: colors.textLight, marginBottom: '40px', maxWidth: '600px', margin: '20px auto 40px' }}>
        Your personal AI style assistant. Discover outfits. Understand your wardrobe. Wear better.
      </p>
      <button style={{
        backgroundColor: colors.accent,
        color: colors.primary,
        padding: '16px 50px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        fontFamily: '"Cormorant Garamond", serif',
        fontWeight: 'bold',
        borderRadius: '10px',
        boxShadow: shadows.medium,
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = shadows.dark;
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = shadows.medium;
      }}
      >
        Start Styling →
      </button>
    </div>
  );
}

function WardrobePage() {
  return (
    <div style={{ background: gradients.card, padding: '40px', borderRadius: '15px', boxShadow: shadows.medium }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.primary, fontSize: '42px', margin: 0 }}>👗 Wardrobe Manager</h2>
      <p style={{ color: colors.textLight, fontSize: '16px' }}>Coming Soon: Manage your wardrobe, track items, organize by category</p>
    </div>
  );
}

function QuizPage() {
  return (
    <div style={{ background: gradients.card, padding: '40px', borderRadius: '15px', boxShadow: shadows.medium }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.primary, fontSize: '42px', margin: 0 }}>🎯 Style Quiz</h2>
      <p style={{ color: colors.textLight, fontSize: '16px' }}>Coming Soon: Discover your Style DNA with our AI-powered quiz</p>
    </div>
  );
}

function AIPage() {
  return (
    <div style={{ background: gradients.card, padding: '40px', borderRadius: '15px', boxShadow: shadows.medium }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.primary, fontSize: '42px', margin: 0 }}>🤖 AI Recommendations</h2>
      <p style={{ color: colors.textLight, fontSize: '16px' }}>Coming Soon: Get personalized outfit recommendations powered by Claude AI</p>
    </div>
  );
}

function ShopPage() {
  return (
    <div style={{ background: gradients.card, padding: '40px', borderRadius: '15px', boxShadow: shadows.medium }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.primary, fontSize: '42px', margin: 0 }}>🛍️ Shopping</h2>
      <p style={{ color: colors.textLight, fontSize: '16px' }}>Shop on: Myntra • Flipkart • Amazon • ASOS • H&M • Zara</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '30px' }}>
        {['Myntra', 'Flipkart', 'Amazon', 'ASOS', 'H&M', 'Zara'].map(store => (
          <button key={store} style={{
            backgroundColor: colors.accent,
            color: colors.primary,
            padding: '15px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: shadows.medium
          }}>
            🛒 {store}
          </button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.white, fontSize: '42px', marginBottom: '30px' }}>📊 Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <StatCard label="Total Items" value="4" icon="👗" />
        <StatCard label="Outfits Created" value="0" icon="✨" />
        <StatCard label="Style DNA" value="Pending" icon="🎯" />
        <StatCard label="Utilization" value="100%" icon="📈" />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div style={{
      background: gradients.card,
      padding: '30px',
      borderRadius: '12px',
      boxShadow: shadows.medium,
      textAlign: 'center',
      border: `2px solid ${colors.accent}`
    }}>
      <div style={{ fontSize: '40px', marginBottom: '10px' }}>{icon}</div>
      <p style={{ color: colors.textLight, margin: '0 0 10px 0', fontSize: '14px' }}>{label}</p>
      <h3 style={{ fontFamily: '"Cormorant Garamond", serif', color: colors.primary, margin: 0, fontSize: '28px' }}>{value}</h3>
    </div>
  );
}

export default App;