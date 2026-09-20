import { useState, useEffect } from 'react';
import './App.css';

const COLORS = {
  primary: '#2D1B3D',
  accent: '#D4AF37',
  white: '#FFFFFF',
  gray: '#F5F5F5',
  darkGray: '#333333',
  textLight: '#666666'
};

const GRADIENTS = {
  primary: 'linear-gradient(135deg, #2D1B3D 0%, #1a0f28 100%)',
  card: 'linear-gradient(135deg, #ffffff 0%, #f9f7fc 100%)',
  accent: 'linear-gradient(135deg, #D4AF37 0%, #c49820 100%)'
};

const SHADOWS = {
  light: '0 2px 8px rgba(0,0,0,0.1)',
  medium: '0 4px 12px rgba(212, 175, 55, 0.15)',
  dark: '0 8px 24px rgba(45, 27, 61, 0.2)'
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [wardrobe, setWardrobe] = useState([]);
  const [styleDNA, setStyleDNA] = useState(null);

  // Load wardrobe from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mihova_wardrobe');
    if (saved) {
      try {
        setWardrobe(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading wardrobe:', e);
      }
    }
  }, []);

  // Save wardrobe to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mihova_wardrobe', JSON.stringify(wardrobe));
  }, [wardrobe]);

  const addItem = (item) => {
    setWardrobe([...wardrobe, { ...item, id: Date.now() }]);
  };

  const removeItem = (id) => {
    setWardrobe(wardrobe.filter(item => item.id !== id));
  };

  const navStyle = (isActive) => ({
    backgroundColor: isActive ? COLORS.accent : 'transparent',
    color: isActive ? COLORS.primary : COLORS.accent,
    border: isActive ? 'none' : `2px solid ${COLORS.accent}`,
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: '"Cormorant Garamond", serif',
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    boxShadow: isActive ? SHADOWS.medium : 'none',
  });

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', minHeight: '100vh', background: GRADIENTS.primary }}>
      {/* Navigation */}
      <nav style={{
        background: 'rgba(45, 27, 61, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2px solid ${COLORS.accent}`,
        boxShadow: SHADOWS.dark,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h1 style={{ color: COLORS.accent, fontFamily: '"Cormorant Garamond", serif', margin: 0, fontSize: '32px', letterSpacing: '2px' }}>
          ✨ MIHOVA
        </h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentPage('home')} style={navStyle(currentPage === 'home')}>🏠 Home</button>
          <button onClick={() => setCurrentPage('wardrobe')} style={navStyle(currentPage === 'wardrobe')}>👗 Wardrobe</button>
          <button onClick={() => setCurrentPage('quiz')} style={navStyle(currentPage === 'quiz')}>🎯 Quiz</button>
          <button onClick={() => setCurrentPage('outfit')} style={navStyle(currentPage === 'outfit')}>✨ Outfits</button>
          <button onClick={() => setCurrentPage('ai')} style={navStyle(currentPage === 'ai')}>🤖 AI</button>
          <button onClick={() => setCurrentPage('analytics')} style={navStyle(currentPage === 'analytics')}>📊 Analytics</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: '40px 20px', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'wardrobe' && <WardrobePage wardrobe={wardrobe} onAddItem={addItem} onRemoveItem={removeItem} />}
          {currentPage === 'quiz' && <QuizPage onSetStyleDNA={setStyleDNA} />}
          {currentPage === 'outfit' && <OutfitPage wardrobe={wardrobe} />}
          {currentPage === 'ai' && <AIPage wardrobe={wardrobe} styleDNA={styleDNA} />}
          {currentPage === 'analytics' && <AnalyticsPage wardrobe={wardrobe} />}
        </div>
      </div>
    </div>
  );
}

// ========== HOME PAGE ==========
function HomePage() {
  return (
    <div style={{
      textAlign: 'center',
      background: GRADIENTS.card,
      padding: '100px 40px',
      borderRadius: '20px',
      boxShadow: SHADOWS.dark
    }}>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, fontSize: '56px', margin: '0 0 20px 0' }}>
        Confidence Starts with What You Wear
      </h1>
      <p style={{ fontSize: '18px', color: COLORS.textLight, marginBottom: '40px', maxWidth: '700px', margin: '20px auto 40px' }}>
        Your personal AI style assistant. Add your wardrobe, take a style quiz, create outfits, and get AI recommendations.
      </p>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button style={{
          backgroundColor: COLORS.accent,
          color: COLORS.primary,
          padding: '16px 40px',
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 'bold',
          borderRadius: '10px',
          boxShadow: SHADOWS.medium,
          transition: 'all 0.3s ease'
        }}>
          👗 Start Building Wardrobe
        </button>
        <button style={{
          backgroundColor: COLORS.primary,
          color: COLORS.accent,
          padding: '16px 40px',
          fontSize: '16px',
          border: `2px solid ${COLORS.accent}`,
          cursor: 'pointer',
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 'bold',
          borderRadius: '10px',
          boxShadow: SHADOWS.medium,
          transition: 'all 0.3s ease'
        }}>
          🤖 Explore Features
        </button>
      </div>
    </div>
  );
}

// ========== WARDROBE PAGE ==========
function WardrobePage({ wardrobe, onAddItem, onRemoveItem }) {
  const [newItem, setNewItem] = useState({ name: '', type: 'top', color: '#000000' });
  const [showForm, setShowForm] = useState(false);

  const types = ['top', 'bottom', 'dress', 'jacket', 'shoes', 'accessory'];

  const handleAdd = () => {
    if (newItem.name.trim()) {
      onAddItem(newItem);
      setNewItem({ name: '', type: 'top', color: '#000000' });
      setShowForm(false);
    }
  };

  const itemsByType = {};
  wardrobe.forEach(item => {
    if (!itemsByType[item.type]) itemsByType[item.type] = [];
    itemsByType[item.type].push(item);
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '42px', margin: 0 }}>👗 Wardrobe Manager</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: COLORS.accent,
            color: COLORS.primary,
            padding: '12px 30px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add Item'}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: GRADIENTS.card,
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '40px',
          boxShadow: SHADOWS.medium,
          border: `2px solid ${COLORS.accent}`
        }}>
          <h3 style={{ color: COLORS.primary, marginTop: 0 }}>Add New Item</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Item name (e.g., Black Blazer)"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `2px solid ${COLORS.accent}`,
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px'
              }}
            />
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `2px solid ${COLORS.accent}`,
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                backgroundColor: COLORS.white
              }}
            >
              {types.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="color"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                style={{
                  padding: '5px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  width: '60px',
                  height: '45px',
                  border: 'none'
                }}
              />
              <span style={{ color: COLORS.textLight }}>{newItem.color}</span>
            </div>
          </div>
          <button
            onClick={handleAdd}
            style={{
              width: '100%',
              backgroundColor: COLORS.accent,
              color: COLORS.primary,
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'all 0.3s ease'
            }}
          >
            ✓ Add to Wardrobe
          </button>
        </div>
      )}

      {wardrobe.length === 0 ? (
        <div style={{
          background: GRADIENTS.card,
          padding: '60px 40px',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: SHADOWS.medium
        }}>
          <p style={{ fontSize: '18px', color: COLORS.textLight, margin: 0 }}>👗 No items yet. Add your first piece to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {wardrobe.map(item => (
            <div
              key={item.id}
              style={{
                background: GRADIENTS.card,
                padding: '20px',
                borderRadius: '12px',
                boxShadow: SHADOWS.medium,
                border: `3px solid ${item.color}`,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = SHADOWS.dark;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = SHADOWS.medium;
              }}
            >
              <h4 style={{ color: COLORS.primary, margin: '0 0 10px 0' }}>{item.name}</h4>
              <p style={{ color: COLORS.textLight, margin: '5px 0', fontSize: '13px' }}>
                <strong>Type:</strong> {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: item.color,
                    borderRadius: '8px',
                    border: `2px solid ${COLORS.accent}`
                  }}
                />
                <span style={{ color: COLORS.textLight, fontSize: '13px' }}>{item.color}</span>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                style={{
                  width: '100%',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  transition: 'all 0.3s ease'
                }}
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ========== QUIZ PAGE ==========
function QuizPage({ onSetStyleDNA }) {
  const [step, setStep] = useState('start');
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    { id: 1, q: "What's your style vibe?", options: ['Classic', 'Minimalist', 'Bold', 'Bohemian'] },
    { id: 2, q: "Favorite colors?", options: ['Neutrals', 'Pastels', 'Jewel Tones', 'Bright'] },
    { id: 3, q: "Everyday mood?", options: ['Professional', 'Casual', 'Adventurous', 'Elegant'] },
    { id: 4, q: "Body confidence?", options: ['Show off', 'Structured', 'Comfortable', 'Mix'] },
    { id: 5, q: "Shopping style?", options: ['Curated', 'Thrifted', 'Trends', 'Investment'] }
  ];

  const styleMap = {
    'Classic': { name: '✨ Classic Elegance', desc: 'Timeless and sophisticated' },
    'Minimalist': { name: '🎯 Minimalist Chic', desc: 'Clean and intentional' },
    'Bold': { name: '🚀 Bold Trendsetter', desc: 'Adventurous and expressive' },
    'Bohemian': { name: '🌸 Bohemian Spirit', desc: 'Artistic and free-spirited' }
  };

  const handleAnswer = (qId, ans) => {
    setAnswers({ ...answers, [qId]: ans });
  };

  const calculateDNA = () => {
    const counts = {};
    Object.values(answers).forEach(ans => {
      counts[ans] = (counts[ans] || 0) + 1;
    });
    const dominant = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    const dna = styleMap[dominant];
    setResult(dna);
    onSetStyleDNA(dominant);
    localStorage.setItem('mihova_styleDNA', JSON.stringify(dna));
    setStep('result');
  };

  return (
    <div>
      {step === 'start' && (
        <div style={{ textAlign: 'center', background: GRADIENTS.card, padding: '80px 40px', borderRadius: '20px', boxShadow: SHADOWS.dark }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, fontSize: '48px', margin: '0 0 20px 0' }}>
            Discover Your Style DNA
          </h2>
          <p style={{ fontSize: '16px', color: COLORS.textLight, marginBottom: '40px' }}>
            Answer 5 quick questions to reveal your personal style
          </p>
          <button
            onClick={() => setStep('quiz')}
            style={{
              backgroundColor: COLORS.accent,
              color: COLORS.primary,
              padding: '14px 50px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: '"Cormorant Garamond", serif',
              boxShadow: SHADOWS.medium
            }}
          >
            Start Quiz →
          </button>
        </div>
      )}

      {step === 'quiz' && (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {questions.map((q, idx) => (
            <div key={q.id} style={{
              background: GRADIENTS.card,
              padding: '30px',
              borderRadius: '15px',
              marginBottom: '20px',
              boxShadow: SHADOWS.medium,
              border: `2px solid ${COLORS.primary}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, margin: 0 }}>{q.q}</h3>
                <span style={{ backgroundColor: COLORS.accent, color: COLORS.primary, padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  {idx + 1}/5
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(q.id, opt)}
                    style={{
                      padding: '12px',
                      border: answers[q.id] === opt ? `3px solid ${COLORS.accent}` : `2px solid ${COLORS.primary}`,
                      backgroundColor: answers[q.id] === opt ? COLORS.accent : 'white',
                      color: COLORS.primary,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: answers[q.id] === opt ? SHADOWS.medium : 'none'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={calculateDNA}
            disabled={Object.keys(answers).length < 5}
            style={{
              width: '100%',
              backgroundColor: Object.keys(answers).length === 5 ? COLORS.accent : '#ccc',
              color: COLORS.primary,
              padding: '14px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: '"Cormorant Garamond", serif',
              boxShadow: SHADOWS.medium
            }}
          >
            See My Style DNA ✨
          </button>
        </div>
      )}

      {step === 'result' && result && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            border: `3px solid ${COLORS.accent}`,
            borderRadius: '20px',
            padding: '50px 40px',
            background: GRADIENTS.card,
            boxShadow: SHADOWS.dark,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>✨</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, fontSize: '42px', margin: '0 0 10px 0' }}>
              {result.name}
            </h2>
            <p style={{ fontSize: '16px', color: COLORS.textLight, marginBottom: '30px', fontStyle: 'italic' }}>
              {result.desc}
            </p>
            <button
              onClick={() => {
                setStep('start');
                setAnswers({});
                setResult(null);
              }}
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.accent,
                padding: '12px 40px',
                fontSize: '14px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontFamily: '"Cormorant Garamond", serif',
                boxShadow: SHADOWS.medium
              }}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== OUTFIT PAGE ==========
function OutfitPage({ wardrobe }) {
  const [selected, setSelected] = useState({});
  const [saved, setSaved] = useState([]);

  const types = ['top', 'bottom', 'shoes'];

  const saveOutfit = () => {
    if (Object.keys(selected).length === 3) {
      const outfit = {
        id: Date.now(),
        items: selected,
        timestamp: new Date().toLocaleString()
      };
      setSaved([...saved, outfit]);
      localStorage.setItem('mihova_outfits', JSON.stringify([...saved, outfit]));
      setSelected({});
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '42px', marginBottom: '30px' }}>
        ✨ Create Outfit
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {types.map(type => (
          <div key={type} style={{
            background: GRADIENTS.card,
            padding: '20px',
            borderRadius: '12px',
            boxShadow: SHADOWS.medium
          }}>
            <h3 style={{ color: COLORS.primary, margin: '0 0 15px 0' }}>
              Select {type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
            <select
              onChange={(e) => setSelected({ ...selected, [type]: JSON.parse(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: `2px solid ${COLORS.accent}`,
                cursor: 'pointer'
              }}
            >
              <option>Choose {type}</option>
              {wardrobe.filter(item => item.type === type).map(item => (
                <option key={item.id} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              ))}
            </select>
            {selected[type] && (
              <p style={{ color: COLORS.accent, margin: '10px 0 0 0', fontSize: '13px' }}>
                ✅ {selected[type].name}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={saveOutfit}
        disabled={Object.keys(selected).length !== 3}
        style={{
          width: '100%',
          backgroundColor: Object.keys(selected).length === 3 ? COLORS.accent : '#ccc',
          color: COLORS.primary,
          padding: '16px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontFamily: '"Cormorant Garamond", serif',
          marginBottom: '40px',
          boxShadow: SHADOWS.medium
        }}
      >
        💾 Save Outfit
      </button>

      {saved.length > 0 && (
        <div>
          <h2 style={{ color: COLORS.white, fontSize: '28px', marginBottom: '20px' }}>Saved Outfits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {saved.map(outfit => (
              <div key={outfit.id} style={{
                background: GRADIENTS.card,
                padding: '20px',
                borderRadius: '12px',
                boxShadow: SHADOWS.medium,
                border: `2px solid ${COLORS.accent}`
              }}>
                <p style={{ color: COLORS.textLight, fontSize: '13px', margin: 0 }}>{outfit.timestamp}</p>
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '10px 0 0 0' }}>
                  👕 {outfit.items.top.name}
                </p>
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '5px 0 0 0' }}>
                  👖 {outfit.items.bottom.name}
                </p>
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '5px 0' }}>
                  👞 {outfit.items.shoes.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ========== AI PAGE ==========
function AIPage({ wardrobe, styleDNA }) {
  return (
    <div style={{
      background: GRADIENTS.card,
      padding: '40px',
      borderRadius: '15px',
      boxShadow: SHADOWS.medium,
      textAlign: 'center'
    }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, fontSize: '42px' }}>
        🤖 AI Recommendations
      </h2>
      <p style={{ color: COLORS.textLight, fontSize: '16px', marginBottom: '30px' }}>
        Coming Soon: Claude AI will analyze your wardrobe and generate personalized outfit recommendations!
      </p>
      {wardrobe.length === 0 && (
        <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
          👗 Add items to your wardrobe first to get recommendations
        </p>
      )}
      {!styleDNA && (
        <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
          🎯 Take the Style Quiz to unlock AI recommendations
        </p>
      )}
    </div>
  );
}

// ========== ANALYTICS PAGE ==========
function AnalyticsPage({ wardrobe }) {
  const stats = {
    total: wardrobe.length,
    tops: wardrobe.filter(i => i.type === 'top').length,
    bottoms: wardrobe.filter(i => i.type === 'bottom').length,
    shoes: wardrobe.filter(i => i.type === 'shoes').length
  };

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '42px', marginBottom: '30px' }}>
        📊 Analytics
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatCard label="Total Items" value={stats.total} icon="👗" />
        <StatCard label="Tops" value={stats.tops} icon="👕" />
        <StatCard label="Bottoms" value={stats.bottoms} icon="👖" />
        <StatCard label="Shoes" value={stats.shoes} icon="👞" />
      </div>

      <div style={{
        background: GRADIENTS.card,
        padding: '30px',
        borderRadius: '15px',
        boxShadow: SHADOWS.medium
      }}>
        <h3 style={{ color: COLORS.primary, marginTop: 0 }}>Wardrobe Breakdown</h3>
        <p style={{ color: COLORS.textLight, lineHeight: '1.8' }}>
          You have built a wardrobe with <strong>{stats.total}</strong> items. Keep adding more items to unlock AI recommendations and styling suggestions!
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div style={{
      background: GRADIENTS.card,
      padding: '30px',
      borderRadius: '12px',
      boxShadow: SHADOWS.medium,
      textAlign: 'center',
      border: `2px solid ${COLORS.accent}`,
      transition: 'all 0.3s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = SHADOWS.dark;
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = SHADOWS.medium;
    }}
    >
      <div style={{ fontSize: '40px', marginBottom: '10px' }}>{icon}</div>
      <p style={{ color: COLORS.textLight, margin: '0 0 10px 0', fontSize: '13px' }}>{label}</p>
      <h3 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, margin: 0, fontSize: '32px' }}>
        {value}
      </h3>
    </div>
  );
}

export default App;