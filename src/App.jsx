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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [wardrobe, setWardrobe] = useState(() => {
    const saved = localStorage.getItem('mihova_wardrobe');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Black Blazer', type: 'top', color: '#000000', photo: null },
      { id: 2, name: 'Blue Jeans', type: 'bottom', color: '#1a3a5c', photo: null },
      { id: 3, name: 'White Shoes', type: 'shoes', color: '#ffffff', photo: null },
    ];
  });
  const [styleDNA, setStyleDNA] = useState(() => localStorage.getItem('mihova_styleDNA') || null);
  const [claudeKey, setClaudeKey] = useState(() => localStorage.getItem('mihova_claude_key') || '');

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
    padding: '8px 16px',
    cursor: 'pointer',
    fontFamily: '"Cormorant Garamond", serif',
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontSize: '13px',
    boxShadow: isActive ? SHADOWS.medium : 'none',
  });

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', minHeight: '100vh', background: GRADIENTS.primary }}>
      <nav style={{
        background: 'rgba(45, 27, 61, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2px solid ${COLORS.accent}`,
        boxShadow: SHADOWS.dark,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h1 style={{ color: COLORS.accent, fontFamily: '"Cormorant Garamond", serif', margin: 0, fontSize: '28px', letterSpacing: '2px' }}>
          ✨ MIHOVA
        </h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentPage('home')} style={navStyle(currentPage === 'home')}>🏠</button>
          <button onClick={() => setCurrentPage('wardrobe')} style={navStyle(currentPage === 'wardrobe')}>👗</button>
          <button onClick={() => setCurrentPage('quiz')} style={navStyle(currentPage === 'quiz')}>🎯</button>
          <button onClick={() => setCurrentPage('outfit')} style={navStyle(currentPage === 'outfit')}>✨</button>
          <button onClick={() => setCurrentPage('ai')} style={navStyle(currentPage === 'ai')}>🤖</button>
          <button onClick={() => setCurrentPage('analytics')} style={navStyle(currentPage === 'analytics')}>📊</button>
        </div>
      </nav>

      <div style={{ padding: '30px 15px', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'wardrobe' && <WardrobePage wardrobe={wardrobe} onAddItem={addItem} onRemoveItem={removeItem} />}
          {currentPage === 'quiz' && <QuizPage onSetStyleDNA={setStyleDNA} />}
          {currentPage === 'outfit' && <OutfitPage wardrobe={wardrobe} />}
          {currentPage === 'ai' && <AIPage wardrobe={wardrobe} claudeKey={claudeKey} setClaudeKey={setClaudeKey} />}
          {currentPage === 'analytics' && <AnalyticsPage wardrobe={wardrobe} />}
        </div>
      </div>
    </div>
  );
}

// HOME
function HomePage() {
  return (
    <div style={{ textAlign: 'center', background: GRADIENTS.card, padding: '80px 30px', borderRadius: '20px', boxShadow: SHADOWS.dark }}>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, fontSize: '48px', margin: '0 0 20px 0' }}>
        Confidence Starts with What You Wear
      </h1>
      <p style={{ fontSize: '16px', color: COLORS.textLight, marginBottom: '30px' }}>
        AI-powered wardrobe management. Create outfits. Get recommendations.
      </p>
    </div>
  );
}

// WARDROBE
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
      setUseCamera(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '36px', margin: 0 }}>
          👗 Wardrobe
        </h1>
        <button onClick={() => { setShowForm(!showForm); setUseCamera(false); }} style={{
          backgroundColor: COLORS.accent,
          color: COLORS.primary,
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '13px'
        }}>
          {showForm ? '✕' : '+ Add'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: GRADIENTS.card, padding: '20px', borderRadius: '15px', marginBottom: '30px', boxShadow: SHADOWS.medium, border: `2px solid ${COLORS.accent}` }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button onClick={() => setUseCamera(false)} style={{ backgroundColor: !useCamera ? COLORS.accent : 'white', color: !useCamera ? COLORS.primary : COLORS.accent, padding: '8px 15px', border: `2px solid ${COLORS.accent}`, borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>✎</button>
            <button onClick={() => setUseCamera(true)} style={{ backgroundColor: useCamera ? COLORS.accent : 'white', color: useCamera ? COLORS.primary : COLORS.accent, padding: '8px 15px', border: `2px solid ${COLORS.accent}`, borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>📸</button>
          </div>

          {!useCamera ? (
            <div>
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: `2px solid ${COLORS.accent}`, fontSize: '13px' }} />
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: `2px solid ${COLORS.accent}`, cursor: 'pointer' }}>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} style={{ width: '100%', padding: '5px', marginBottom: '10px', borderRadius: '6px', height: '40px', cursor: 'pointer' }} />
              <button onClick={handleAdd} style={{ width: '100%', backgroundColor: COLORS.accent, color: COLORS.primary, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>✓ Add</button>
            </div>
          ) : (
            <CameraCapture onCapture={(photo) => {
              onAddItem({ ...formData, photo });
              setShowForm(false);
              setUseCamera(false);
            }} />
          )}
        </div>
      )}

      {wardrobe.length === 0 ? (
        <div style={{ background: GRADIENTS.card, padding: '40px', borderRadius: '15px', textAlign: 'center' }}>
          <p style={{ color: COLORS.textLight, margin: 0 }}>No items yet</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
          {wardrobe.map(item => (
            <div key={item.id} style={{ background: GRADIENTS.card, padding: '15px', borderRadius: '10px', boxShadow: SHADOWS.medium, border: `3px solid ${item.color}` }}>
              {item.photo && <img src={item.photo} alt={item.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />}
              <h4 style={{ color: COLORS.primary, margin: '0 0 5px 0', fontSize: '13px' }}>{item.name}</h4>
              <p style={{ color: COLORS.textLight, margin: '0 0 10px 0', fontSize: '11px' }}>{item.type}</p>
              <button onClick={() => onRemoveItem(item.id)} style={{ width: '100%', backgroundColor: '#ff6b6b', color: 'white', padding: '8px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}>✕</button>
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
      alert('Camera access denied');
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
        <button onClick={startCamera} style={{ width: '100%', backgroundColor: COLORS.accent, color: COLORS.primary, padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>📸 Start</button>
      ) : (
        <>
          <video ref={videoRef} autoPlay style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px', backgroundColor: '#000' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="400" />
          <button onClick={capturePhoto} style={{ width: '100%', backgroundColor: COLORS.accent, color: COLORS.primary, padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>✓ Capture</button>
        </>
      )}
    </div>
  );
}

// QUIZ
function QuizPage({ onSetStyleDNA }) {
  const [step, setStep] = useState('start');
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    { id: 1, q: "Style?", options: ['Classic', 'Minimalist', 'Bold', 'Bohemian'] },
    { id: 2, q: "Colors?", options: ['Neutrals', 'Pastels', 'Jewels', 'Bright'] },
    { id: 3, q: "Mood?", options: ['Pro', 'Casual', 'Adventure', 'Elegant'] },
    { id: 4, q: "Confidence?", options: ['Show', 'Structure', 'Comfort', 'Mix'] },
    { id: 5, q: "Shopping?", options: ['Curated', 'Thrifted', 'Trends', 'Investment'] }
  ];

  const styleMap = {
    'Classic': { name: '✨ Classic Elegance', desc: 'Timeless' },
    'Minimalist': { name: '🎯 Minimalist Chic', desc: 'Clean' },
    'Bold': { name: '🚀 Bold Trendsetter', desc: 'Adventurous' },
    'Bohemian': { name: '🌸 Bohemian Spirit', desc: 'Artistic' }
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
        <div style={{ textAlign: 'center', background: GRADIENTS.card, padding: '60px 30px', borderRadius: '15px', boxShadow: SHADOWS.dark }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, fontSize: '36px', margin: '0 0 15px 0' }}>Discover Style DNA</h2>
          <button onClick={() => setStep('quiz')} style={{ backgroundColor: COLORS.accent, color: COLORS.primary, padding: '12px 40px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>Start →</button>
        </div>
      )}

      {step === 'quiz' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {questions.map((q, idx) => (
            <div key={q.id} style={{ background: GRADIENTS.card, padding: '20px', borderRadius: '12px', marginBottom: '15px', boxShadow: SHADOWS.medium, border: `2px solid ${COLORS.primary}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, margin: 0, fontSize: '16px' }}>{q.q}</h3>
                <span style={{ backgroundColor: COLORS.accent, color: COLORS.primary, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{idx + 1}/5</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map(opt => (
                  <button key={opt} onClick={() => handleAnswer(q.id, opt)} style={{
                    padding: '10px',
                    border: answers[q.id] === opt ? `3px solid ${COLORS.accent}` : `2px solid ${COLORS.primary}`,
                    backgroundColor: answers[q.id] === opt ? COLORS.accent : 'white',
                    color: COLORS.primary,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px'
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={calculateDNA} disabled={Object.keys(answers).length < 5} style={{
            width: '100%',
            backgroundColor: Object.keys(answers).length === 5 ? COLORS.accent : '#ccc',
            color: COLORS.primary,
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Results ✨
          </button>
        </div>
      )}

      {step === 'result' && result && (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ border: `3px solid ${COLORS.accent}`, borderRadius: '15px', padding: '40px', background: GRADIENTS.card, boxShadow: SHADOWS.dark, textAlign: 'center' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>✨</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, fontSize: '32px', margin: '0 0 10px 0' }}>{result.name}</h2>
            <p style={{ fontSize: '14px', color: COLORS.textLight, marginBottom: '20px' }}>{result.desc}</p>
            <button onClick={() => { setStep('start'); setAnswers({}); setResult(null); }} style={{ backgroundColor: COLORS.primary, color: COLORS.accent, padding: '10px 30px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Retake</button>
          </div>
        </div>
      )}
    </div>
  );
}

// OUTFIT
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
      alert('✅ Saved!');
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '36px', marginBottom: '20px' }}>✨ Create Outfit</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        {types.map(type => {
          const itemsOfType = wardrobe.filter(item => item.type === type);
          return (
            <div key={type} style={{ background: GRADIENTS.card, padding: '15px', borderRadius: '10px', boxShadow: SHADOWS.medium }}>
              <h3 style={{ color: COLORS.primary, margin: '0 0 10px 0', fontSize: '14px' }}>Select {type}</h3>
              <select onChange={(e) => {
                if (e.target.value) {
                  const item = JSON.parse(e.target.value);
                  setSelected({ ...selected, [type]: item });
                }
              }} style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: `2px solid ${COLORS.accent}`,
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                <option value="">Choose</option>
                {itemsOfType.map(item => (
                  <option key={item.id} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
              {selected[type] && <p style={{ color: COLORS.accent, margin: '8px 0 0 0', fontSize: '11px' }}>✅ {selected[type].name}</p>}
            </div>
          );
        })}
      </div>

      <button onClick={saveOutfit} disabled={Object.keys(selected).length !== 3} style={{
        width: '100%',
        backgroundColor: Object.keys(selected).length === 3 ? COLORS.accent : '#ccc',
        color: COLORS.primary,
        padding: '12px',
        fontSize: '14px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginBottom: '30px'
      }}>
        💾 Save
      </button>

      {saved.length > 0 && (
        <div>
          <h2 style={{ color: COLORS.white, fontSize: '20px', marginBottom: '15px' }}>Saved</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            {saved.map(outfit => (
              <div key={outfit.id} style={{ background: GRADIENTS.card, padding: '15px', borderRadius: '10px', boxShadow: SHADOWS.medium, border: `2px solid ${COLORS.accent}` }}>
                <p style={{ color: COLORS.textLight, fontSize: '11px', margin: 0 }}>{outfit.timestamp}</p>
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '8px 0 4px 0', fontSize: '12px' }}>👕 {outfit.items.top.name}</p>
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '4px 0', fontSize: '12px' }}>👖 {outfit.items.bottom.name}</p>
                <p style={{ color: COLORS.primary, fontWeight: 'bold', margin: '4px 0', fontSize: '12px' }}>👞 {outfit.items.shoes.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// AI
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
    }
  };

  const generateRecommendations = async () => {
    if (wardrobe.length < 3) {
      alert('Add 3+ items first!');
      return;
    }

    setLoading(true);
    const recs = [];

    try {
      for (let i = 0; i < 3; i++) {
        const tops = wardrobe.filter(item => item.type === 'top');
        const bottoms = wardrobe.filter(item => item.type === 'bottom');
        const shoes = wardrobe.filter(item => item.type === 'shoes');

        if (tops.length > 0 && bottoms.length > 0 && shoes.length > 0) {
          const top = tops[i % tops.length];
          const bottom = bottoms[i % bottoms.length];
          const shoe = shoes[i % shoes.length];

          const analysis = await analyzeOutfit([top, bottom, shoe], claudeKey);
          recs.push({
            id: Date.now() + i,
            items: [top, bottom, shoe],
            ...analysis
          });
        }
      }

      setRecommendations(recs);
    } catch (error) {
      alert('Error generating recommendations');
    }

    setLoading(false);
  };

  async function analyzeOutfit(items, apiKey) {
    if (!apiKey || apiKey.trim() === '') {
      return {
        score: Math.floor(Math.random() * 3) + 7,
        analysis: "Great outfit combination!",
        suggestion: "Add accessories to elevate.",
        isDemo: true
      };
    }

    const itemNames = items.map(item => `${item.name}`).join(', ');

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
          messages: [{
            role: 'user',
            content: `Rate outfit (${itemNames}) 1-10. Format: SCORE: X\nANALYSIS: text\nSUGGESTION: text`
          }]
        })
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const text = data.content[0].text;

      const scoreMatch = text.match(/SCORE:\s*(\d+)/);
      const analysisMatch = text.match(/ANALYSIS:\s*([^\n]+)/);
      const suggestionMatch = text.match(/SUGGESTION:\s*([^\n]+)/);

      return {
        score: scoreMatch ? parseInt(scoreMatch[1]) : 8,
        analysis: analysisMatch ? analysisMatch[1].trim() : "Good!",
        suggestion: suggestionMatch ? suggestionMatch[1].trim() : "Perfect!",
        isDemo: false
      };
    } catch (error) {
      return {
        score: 8,
        analysis: "Demo analysis",
        suggestion: "Add API key for real analysis",
        isDemo: true
      };
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '36px', marginBottom: '20px' }}>🤖 AI Recommendations</h1>

      {showKeyForm && (
        <div style={{ background: GRADIENTS.card, padding: '20px', borderRadius: '12px', marginBottom: '30px', boxShadow: SHADOWS.medium, border: `2px solid ${COLORS.accent}` }}>
          <h3 style={{ color: COLORS.primary, marginTop: 0, fontSize: '14px' }}>🔑 Claude API Key</h3>
          <p style={{ color: COLORS.textLight, fontSize: '12px', margin: '0 0 10px 0' }}>Get from console.anthropic.com</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
            <input type="password" placeholder="sk-ant-..." value={testKey} onChange={(e) => setTestKey(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: `2px solid ${COLORS.accent}`, fontSize: '12px' }} />
            <button onClick={handleSaveKey} style={{ backgroundColor: COLORS.accent, color: COLORS.primary, padding: '8px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>Save</button>
          </div>
        </div>
      )}

      {!claudeKey && !showKeyForm && (
        <div style={{ background: GRADIENTS.card, padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
          <button onClick={() => setShowKeyForm(true)} style={{ backgroundColor: COLORS.accent, color: COLORS.primary, padding: '12px 30px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>🔑 Add Key</button>
        </div>
      )}

      {claudeKey && !showKeyForm && (
        <>
          <button onClick={generateRecommendations} disabled={loading || wardrobe.length < 3} style={{
            width: '100%',
            backgroundColor: wardrobe.length < 3 ? '#ccc' : COLORS.accent,
            color: COLORS.primary,
            padding: '12px',
            fontSize: '14px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            {loading ? '🤖 Analyzing...' : '✨ Generate'}
          </button>

          {recommendations.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
              {recommendations.map((rec, idx) => (
                <div key={rec.id} style={{ background: GRADIENTS.card, padding: '15px', borderRadius: '10px', boxShadow: SHADOWS.medium, border: `3px solid ${COLORS.accent}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, margin: 0, fontSize: '14px' }}>Look {idx + 1}</h3>
                    <div style={{ backgroundColor: COLORS.accent, color: COLORS.primary, width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                      {rec.score}
                    </div>
                  </div>

                  <p style={{ color: COLORS.textLight, margin: '0 0 10px 0', fontSize: '12px' }}>
                    👕 {rec.items[0].name} | 👖 {rec.items[1].name} | 👞 {rec.items[2].name}
                  </p>

                  <p style={{ color: COLORS.textLight, margin: '0 0 8px 0', fontSize: '12px' }}>
                    {rec.analysis}
                  </p>

                  <p style={{ color: COLORS.accent, margin: 0, fontSize: '12px', fontWeight: 'bold' }}>
                    💡 {rec.suggestion}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ANALYTICS
function AnalyticsPage({ wardrobe }) {
  const stats = {
    total: wardrobe.length,
    tops: wardrobe.filter(i => i.type === 'top').length,
    bottoms: wardrobe.filter(i => i.type === 'bottom').length,
    shoes: wardrobe.filter(i => i.type === 'shoes').length,
    combos: Math.max(1, wardrobe.filter(i => i.type === 'top').length) * Math.max(1, wardrobe.filter(i => i.type === 'bottom').length) * Math.max(1, wardrobe.filter(i => i.type === 'shoes').length)
  };

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.white, fontSize: '36px', marginBottom: '20px' }}>📊 Analytics</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <StatCard label="Items" value={stats.total} icon="👗" />
        <StatCard label="Tops" value={stats.tops} icon="👕" />
        <StatCard label="Bottoms" value={stats.bottoms} icon="👖" />
        <StatCard label="Shoes" value={stats.shoes} icon="👞" />
        <StatCard label="Combos" value={stats.combos} icon="✨" />
      </div>

      <div style={{ background: GRADIENTS.card, padding: '20px', borderRadius: '10px', boxShadow: SHADOWS.medium }}>
        <h3 style={{ color: COLORS.primary, marginTop: 0, fontSize: '14px' }}>Wardrobe Summary</h3>
        <p style={{ color: COLORS.textLight, fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
          You have {stats.total} items creating {stats.combos} outfit combinations. Keep building!
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div style={{ background: GRADIENTS.card, padding: '15px', borderRadius: '8px', boxShadow: SHADOWS.medium, textAlign: 'center', border: `2px solid ${COLORS.accent}` }}>
      <div style={{ fontSize: '28px', marginBottom: '5px' }}>{icon}</div>
      <p style={{ color: COLORS.textLight, margin: '0 0 5px 0', fontSize: '11px' }}>{label}</p>
      <h3 style={{ fontFamily: '"Cormorant Garamond", serif', color: COLORS.primary, margin: 0, fontSize: '24px' }}>{value}</h3>
    </div>
  );
}

export default App;