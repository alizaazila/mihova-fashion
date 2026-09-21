import { useState, useEffect, useRef } from 'react';
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

// Claude API
async function analyzeOutfit(items, apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    return {
      score: Math.floor(Math.random() * 3) + 7,
      analysis: "This is a well-coordinated outfit with great color balance!",
      suggestion: "Consider adding a statement accessory to elevate the look.",
      isDemo: true
    };
  }

  const itemNames = items.map(item => `${item.name} (${item.type})`).join(', ');
  
  const prompt = `You are a fashion stylist. Rate this outfit 1-10 and give brief feedback.
Outfit: ${itemNames}
Format: SCORE: X\nANALYSIS: text\nSUGGESTION: text`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    const text = data.content[0].text;
    
    const scoreMatch = text.match(/SCORE:\s*(\d+)/);
    const analysisMatch = text.match(/ANALYSIS:\s*([^\n]+)/);
    const suggestionMatch = text.match(/SUGGESTION:\s*([^\n]+)/);

    return {
      score: scoreMatch ? parseInt(scoreMatch[1]) : 8,
      analysis: analysisMatch ? analysisMatch[1].trim() : "Great outfit!",
      suggestion: suggestionMatch ? suggestionMatch[1].trim() : "Perfect!",
      isDemo: false
    };
  } catch (error) {
    return {
      score: 8,
      analysis: "Demo: Connection issue. Using demo analysis.",
      suggestion: "Your outfit looks stylish!",
      isDemo: true
    };
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [wardrobe, setWardrobe] = useState(() => {
    const saved = localStorage.getItem('mihova_wardrobe');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Black Blazer', type: 'top', color: '#000000', photo: null },
      { id: 2, name: 'Blue Jeans', type: 'bottom', color: '#1a3a5c', photo: null },
      { id: 3, name: 'White T-Shirt', type: 'top', color: '#ffffff', photo: null },
    ];
  });
  const [styleDNA, setStyleDNA] = useState(null);
  const [claudeKey, setClaudeKey] = useState(localStorage.getItem('mihova_claude_key') || '');

  useEffect(() => {
    localStorage.setItem('mihova_wardrobe', JSON.stringify(wardrobe));
  }, [wardrobe]);

  const addItem = (item) => {
    setWardrobe([...wardrobe, { ...item, id: Date.now() }]);
    alert('✅ Item added to wardrobe!');
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
          <button onClick={() => setCurrentPage('wardrobe')} style={navStyle(currentPage === 'wardrobe')}>👗 Wardrobe ({wardrobe.length})</button>
          <button onClick={() => setCurrentPage('outfit')} style={navStyle(currentPage === 'outfit')}>✨ Outfits</button>
          <button onClick={() => setCurrentPage('ai')} style={navStyle(currentPage === 'ai')}>🤖 AI</button>
        </div>
      </nav>

      <div style={{ padding: '40px 20px', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'wardrobe' && <WardrobePage wardrobe={wardrobe} onAddItem={addItem} onRemoveItem={removeItem} />}
          {currentPage === 'outfit' && <OutfitPage wardrobe={wardrobe} />}
          {currentPage === 'ai' && <AIPage wardrobe={wardrobe} claudeKey={claudeKey} setClaudeKey={setClaudeKey} />}
        </div>
      </div>
    </div>
  );
}

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
        Your personal AI style assistant. Add items with camera, create outfits, and get Claude AI recommendations.
      </p>
    </div>
  );
}

function WardrobePage({ wardrobe, onAddItem, onRemoveItem }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'top', color: '#000000' });
  const [useCamera, setUseCamera] = useState(false);

  const types = ['top', 'bottom', 'dress', 'jacket', 'shoes', 'accessory'];

  const handleAdd = () => {
    if (formData.name.trim()) {
      onAddItem(formData);
      setFormData({ name: '', type: 'top', color: '#000000' });
      setShowForm(false);
    } else {
      alert('Please enter item name!');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '42px', margin: 0 }}>
          👗 Wardrobe ({wardrobe.length})
        </h1>
        <button
          onClick={() => { setShowForm(!showForm); setUseCamera(false); }}
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
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => setUseCamera(false)}
              style={{
                backgroundColor: !useCamera ? COLORS.accent : 'white',
                color: !useCamera ? COLORS.primary : COLORS.accent,
                padding: '10px 20px',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ✎ Text Form
            </button>
            <button
              onClick={() => setUseCamera(true)}
              style={{
                backgroundColor: useCamera ? COLORS.accent : 'white',
                color: useCamera ? COLORS.primary : COLORS.accent,
                padding: '10px 20px',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              📸 Camera
            </button>
          </div>

          {!useCamera ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Item name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `2px solid ${COLORS.accent}`,
                    fontSize: '14px'
                  }}
                />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `2px solid ${COLORS.accent}`,
                    cursor: 'pointer'
                  }}
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  style={{ padding: '5px', borderRadius: '8px', cursor: 'pointer', height: '45px' }}
                />
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
                  fontSize: '16px'
                }}
              >
                ✓ Add Item
              </button>
            </div>
          ) : (
            <CameraCapture onCapture={(photo) => {
              onAddItem({ ...formData, photo });
              setShowForm(false);
            }} />
          )}
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
          <p style={{ fontSize: '18px', color: COLORS.textLight, margin: 0 }}>👗 No items yet!</p>
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
                border: `3px solid ${item.color}`
              }}
            >
              {item.photo && (
                <img src={item.photo} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
              )}
              <h4 style={{ color: COLORS.primary, margin: '0 0 10px 0' }}>{item.name}</h4>
              <p style={{ color: COLORS.textLight, margin: '5px 0', fontSize: '13px' }}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: item.color,
                  borderRadius: '8px',
                  border: `2px solid ${COLORS.accent}`
                }} />
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
                  fontSize: '13px'
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

function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (err) {
      alert('Camera access denied. Use text form instead.');
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 300, 400);
    const photoData = canvasRef.current.toDataURL('image/jpeg');
    onCapture(photoData);
    setCameraOn(false);
  };

  return (
    <div>
      {!cameraOn ? (
        <button
          onClick={startCamera}
          style={{
            width: '100%',
            backgroundColor: COLORS.accent,
            color: COLORS.primary,
            padding: '16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        >
          📸 Start Camera
        </button>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '15px',
              backgroundColor: '#000'
            }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="400" />
          <button
            onClick={capturePhoto}
            style={{
              width: '100%',
              backgroundColor: COLORS.accent,
              color: COLORS.primary,
              padding: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            ✓ Capture & Add
          </button>
        </>
      )}
    </div>
  );
}

function OutfitPage({ wardrobe }) {
  const [selected, setSelected] = useState({});
  const [saved, setSaved] = useState(JSON.parse(localStorage.getItem('mihova_outfits') || '[]'));

  const types = ['top', 'bottom', 'shoes'];

  const saveOutfit = () => {
    if (Object.keys(selected).length === 3) {
      const outfit = { id: Date.now(), items: selected, timestamp: new Date().toLocaleString() };
      const newOutfits = [...saved, outfit];
      setSaved(newOutfits);
      localStorage.setItem('mihova_outfits', JSON.stringify(newOutfits));
      setSelected({});
      alert('✅ Outfit saved!');
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '42px', marginBottom: '30px' }}>✨ Create Outfit</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {types.map(type => (
          <div key={type} style={{
            background: GRADIENTS.card,
            padding: '20px',
            borderRadius: '12px',
            boxShadow: SHADOWS.medium
          }}>
            <h3 style={{ color: COLORS.primary, margin: '0 0 15px 0' }}>Select {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
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
                <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
              ))}
            </select>
            {selected[type] && <p style={{ color: COLORS.accent, margin: '10px 0 0 0', fontSize: '13px' }}>✅ {selected[type].name}</p>}
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
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '10px 0 0 0' }}>👕 {outfit.items.top.name}</p>
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '5px 0' }}>👖 {outfit.items.bottom.name}</p>
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '5px 0' }}>👞 {outfit.items.shoes.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AIPage({ wardrobe, claudeKey, setClaudeKey }) {
  const [showKeyForm, setShowKeyForm] = useState(!claudeKey);
  const [testKey, setTestKey] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSaveKey = () => {
    if (testKey.trim()) {
      setClaudeKey(testKey);
      localStorage.setItem('mihova_claude_key', testKey);
      setShowKeyForm(false);
      setTestKey('');
      alert('✅ API Key saved!');
    }
  };

  const generateRecommendations = async () => {
    if (wardrobe.length < 3) {
      alert('Add at least 3 items!');
      return;
    }

    setLoading(true);
    const recs = [];

    for (let i = 0; i < 3; i++) {
      const top = wardrobe.find(item => item.type === 'top');
      const bottom = wardrobe.find(item => item.type === 'bottom');
      const shoes = wardrobe.find(item => item.type === 'shoes');

      if (top && bottom && shoes) {
        const analysis = await analyzeOutfit([top, bottom, shoes], claudeKey);
        recs.push({
          id: Date.now() + i,
          items: [top, bottom, shoes],
          ...analysis
        });
      }
    }

    setRecommendations(recs);
    setLoading(false);
    alert('✅ Recommendations generated!');
  };

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '42px', marginBottom: '30px' }}>🤖 AI Recommendations</h1>

      {showKeyForm && (
        <div style={{
          background: GRADIENTS.card,
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '40px',
          boxShadow: SHADOWS.medium,
          border: `2px solid ${COLORS.accent}`
        }}>
          <h3 style={{ color: COLORS.primary, marginTop: 0 }}>🔑 Add Claude API Key</h3>
          <p style={{ color: COLORS.textLight, fontSize: '14px' }}>
            Get free key from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.accent }}>console.anthropic.com</a>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={testKey}
              onChange={(e) => setTestKey(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `2px solid ${COLORS.accent}`,
                fontSize: '13px'
              }}
            />
            <button
              onClick={handleSaveKey}
              style={{
                backgroundColor: COLORS.accent,
                color: COLORS.primary,
                padding: '12px 30px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {!claudeKey && !showKeyForm && (
        <div style={{
          background: GRADIENTS.card,
          padding: '40px',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <button
            onClick={() => setShowKeyForm(true)}
            style={{
              backgroundColor: COLORS.accent,
              color: COLORS.primary,
              padding: '14px 40px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            🔑 Add API Key
          </button>
        </div>
      )}

      {claudeKey && !showKeyForm && (
        <>
          <button
            onClick={generateRecommendations}
            disabled={loading || wardrobe.length < 3}
            style={{
              width: '100%',
              backgroundColor: wardrobe.length < 3 ? '#ccc' : COLORS.accent,
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
            {loading ? '🤖 Analyzing...' : '✨ Generate AI Recommendations'}
          </button>

          {recommendations.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
              {recommendations.map((rec, idx) => (
                <div key={rec.id} style={{
                  background: GRADIENTS.card,
                  padding: '25px',
                  borderRadius: '15px',
                  boxShadow: SHADOWS.medium,
                  border: `3px solid ${COLORS.accent}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, margin: 0 }}>Look #{idx + 1}</h3>
                    <div style={{
                      backgroundColor: COLORS.accent,
                      color: COLORS.primary,
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '28px'
                    }}>
                      {rec.score}
                    </div>
                  </div>

                  <p style={{ color: COLORS.textLight, margin: '0 0 15px 0' }}>
                    👕 {rec.items[0].name} | 👖 {rec.items[1].name} | 👞 {rec.items[2].name}
                  </p>

                  <p style={{ color: COLORS.textLight, margin: '0 0 10px 0', fontSize: '13px' }}>
                    {rec.analysis}
                  </p>

                  <p style={{ color: COLORS.accent, margin: 0, fontSize: '13px', fontWeight: 'bold' }}>
                    💡 {rec.suggestion}
                  </p>

                  {rec.isDemo && (
                    <div style={{
                      backgroundColor: '#e8f4f8',
                      padding: '10px',
                      borderRadius: '8px',
                      marginTop: '15px',
                      fontSize: '12px',
                      color: '#0066cc',
                      fontWeight: 'bold'
                    }}>
                      Demo mode (real API key for full analysis)
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;