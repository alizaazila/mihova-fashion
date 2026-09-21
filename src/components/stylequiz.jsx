import { useState } from 'react';
import { theme } from '../styles/theme';

export function StyleQuiz() {
  const [currentStep, setCurrentStep] = useState('start');
  const [answers, setAnswers] = useState({});
  const [styleDNA, setStyleDNA] = useState(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What's your style vibe?",
      options: ['Classic & Timeless', 'Modern & Minimalist', 'Bold & Trendy', 'Bohemian & Free']
    },
    {
      id: 2,
      question: "Favorite color palette?",
      options: ['Neutrals (black, white, gray)', 'Pastels & Soft', 'Jewel Tones', 'Bright & Colorful']
    },
    {
      id: 3,
      question: "Your everyday mood?",
      options: ['Professional & Polished', 'Comfortable & Casual', 'Adventurous & Expressive', 'Elegant & Sophisticated']
    },
    {
      id: 4,
      question: "Body confidence?",
      options: ['Love to show off', 'Prefer structure', 'Comfort is key', 'Mix of both']
    },
    {
      id: 5,
      question: "Shopping style?",
      options: ['Curated pieces', 'Thrifted & unique', 'Current trends', 'Investment pieces']
    }
  ];

  const styleTypes = {
    classic: {
      name: '✨ Classic Elegance',
      description: 'Timeless, sophisticated, and always polished',
      colors: ['Black', 'White', 'Navy', 'Cream'],
      keywords: 'structured, tailored, quality',
    },
    minimalist: {
      name: '🎯 Minimalist Chic',
      description: 'Clean lines, essentials only, maximum impact',
      colors: ['Neutrals', 'Monochrome', 'One accent'],
      keywords: 'simple, functional, intentional',
    },
    bold: {
      name: '🚀 Bold Trendsetter',
      description: 'Fashion-forward, adventurous, expressive',
      colors: ['Bright colors', 'Prints', 'Patterns'],
      keywords: 'experimental, playful, confident',
    },
    bohemian: {
      name: '🌸 Bohemian Spirit',
      description: 'Free-spirited, artistic, naturally beautiful',
      colors: ['Earth tones', 'Warm colors', 'Jewel tones'],
      keywords: 'eclectic, artistic, relaxed',
    }
  };

  const calculateStyleDNA = () => {
    const styleScores = { classic: 0, minimalist: 0, bold: 0, bohemian: 0 };
    const answerMap = {
      'Classic & Timeless': 'classic',
      'Modern & Minimalist': 'minimalist',
      'Bold & Trendy': 'bold',
      'Bohemian & Free': 'bohemian',
      'Neutrals (black, white, gray)': 'classic',
      'Pastels & Soft': 'bohemian',
      'Jewel Tones': 'bohemian',
      'Bright & Colorful': 'bold',
      'Professional & Polished': 'classic',
      'Comfortable & Casual': 'minimalist',
      'Adventurous & Expressive': 'bold',
      'Elegant & Sophisticated': 'classic',
      'Love to show off': 'bold',
      'Prefer structure': 'classic',
      'Comfort is key': 'minimalist',
      'Mix of both': 'bohemian',
      'Curated pieces': 'minimalist',
      'Thrifted & unique': 'bohemian',
      'Current trends': 'bold',
      'Investment pieces': 'classic'
    };

    Object.values(answers).forEach(answer => {
      const style = answerMap[answer];
      if (style) styleScores[style]++;
    });

    const dominantStyle = Object.keys(styleScores).reduce((a, b) =>
      styleScores[a] > styleScores[b] ? a : b
    );

    setStyleDNA(styleTypes[dominantStyle]);
    setCurrentStep('result');
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
    setAnswers({});
  };

  const handleRetakeQuiz = () => {
    setCurrentStep('start');
    setAnswers({});
    setStyleDNA(null);
  };

  return (
    <div>
      {currentStep === 'start' && (
        <div style={{
          textAlign: 'center',
          paddingTop: '40px',
          background: theme.gradients.card,
          borderRadius: '20px',
          padding: '80px 40px',
          boxShadow: theme.shadows.medium
        }}>
          <h2 style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
            fontSize: '48px',
            marginBottom: '20px'
          }}>
            Discover Your Style DNA
          </h2>
          <p style={{
            fontSize: '18px',
            color: theme.colors.textLight,
            marginBottom: '40px'
          }}>
            Answer 5 quick questions to reveal your personal style personality
          </p>
          <button
            onClick={handleStartQuiz}
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.primary,
              padding: '16px 50px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: theme.fonts.heading,
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
            }}
          >
            Start Quiz →
          </button>
        </div>
      )}

      {currentStep === 'quiz' && (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Progress Bar */}
          <div style={{
            marginBottom: '40px',
            backgroundColor: theme.colors.gray,
            height: '8px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: theme.shadows.light
          }}>
            <div style={{
              height: '100%',
              width: `${(Object.keys(answers).length / quizQuestions.length) * 100}%`,
              background: theme.gradients.accent,
              transition: 'width 0.3s ease'
            }} />
          </div>

          {quizQuestions.map((q, index) => (
            <div key={q.id} style={{
              marginBottom: '40px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{
                background: theme.gradients.card,
                padding: '30px',
                borderRadius: '15px',
                boxShadow: theme.shadows.medium,
                border: `2px solid ${theme.colors.primary}`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.primary,
                    margin: 0,
                    fontSize: '22px'
                  }}>
                    {q.question}
                  </h3>
                  <span style={{
                    backgroundColor: theme.colors.accent,
                    color: theme.colors.primary,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {index + 1}/{quizQuestions.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {q.options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(q.id, option)}
                      style={{
                        padding: '15px',
                        border: answers[q.id] === option
                          ? `3px solid ${theme.colors.accent}`
                          : `2px solid ${theme.colors.primary}`,
                        backgroundColor: answers[q.id] === option
                          ? theme.colors.accent
                          : 'white',
                        color: answers[q.id] === option
                          ? theme.colors.primary
                          : theme.colors.primary,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontFamily: theme.fonts.body,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: answers[q.id] === option ? theme.shadows.medium : 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateX(4px)';
                        e.target.style.boxShadow = theme.shadows.light;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateX(0)';
                        e.target.style.boxShadow = answers[q.id] === option ? theme.shadows.medium : 'none';
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={calculateStyleDNA}
            disabled={Object.keys(answers).length < quizQuestions.length}
            style={{
              width: '100%',
              backgroundColor: Object.keys(answers).length === quizQuestions.length
                ? theme.colors.accent
                : '#ccc',
              color: theme.colors.primary,
              padding: '16px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '10px',
              cursor: Object.keys(answers).length === quizQuestions.length ? 'pointer' : 'not-allowed',
              fontWeight: '700',
              fontFamily: theme.fonts.heading,
              transition: 'all 0.3s ease',
              boxShadow: theme.shadows.medium
            }}
            onMouseOver={(e) => {
              if (Object.keys(answers).length === quizQuestions.length) {
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            See My Style DNA ✨
          </button>
        </div>
      )}

      {currentStep === 'result' && styleDNA && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            border: `3px solid ${theme.colors.accent}`,
            borderRadius: '20px',
            padding: '50px 40px',
            background: theme.gradients.card,
            boxShadow: theme.shadows.dark,
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '60px',
              marginBottom: '20px'
            }}>
              ✨
            </div>

            <h2 style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.primary,
              fontSize: '42px',
              margin: '0 0 10px 0'
            }}>
              {styleDNA.name}
            </h2>

            <p style={{
              fontSize: '16px',
              color: theme.colors.textLight,
              marginBottom: '30px',
              fontStyle: 'italic'
            }}>
              {styleDNA.description}
            </p>

            <div style={{
              backgroundColor: theme.colors.gray,
              padding: '25px',
              borderRadius: '12px',
              marginBottom: '30px',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: theme.colors.primary, marginBottom: '8px', fontSize: '14px' }}>Your Colors</h4>
                <p style={{ color: '#666', margin: 0 }}>{styleDNA.colors.join(' • ')}</p>
              </div>
              <div>
                <h4 style={{ color: theme.colors.primary, marginBottom: '8px', fontSize: '14px' }}>Your Essence</h4>
                <p style={{ color: '#666', margin: 0 }}>{styleDNA.keywords}</p>
              </div>
            </div>

            <button
              onClick={handleRetakeQuiz}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.accent,
                padding: '14px 40px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontFamily: theme.fonts.heading,
                boxShadow: theme.shadows.medium,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
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