import React, { useState } from 'react';
import { HelpCircle, Award, CheckCircle2, XCircle, ArrowRight, Zap, Gem } from 'lucide-react';
import { QUIZZES } from '../services/eduData';

export default function QuizTab({ user, onAddRewards, onBackToCompare }) {
  const quizQuestions = QUIZZES['structure of atom'];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // null, 0, 1, 2, 3
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  
  // Rewards tracked in active quiz instance
  const [xpEarned, setXpEarned] = useState(0);
  const [diamondsEarned, setDiamondsEarned] = useState(0);

  // Animations states for floating rewards
  const [showRewardSplash, setShowRewardSplash] = useState(false);
  const [rewardAmount, setRewardAmount] = useState({ xp: 0, diamonds: 0 });

  const activeQuestion = quizQuestions[currentIdx];

  const handleOptionClick = (optionIdx) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === activeQuestion.correctIndex;
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
      const earnedXp = 20;
      const earnedDiamonds = 5;
      
      setXpEarned((prev) => prev + earnedXp);
      setDiamondsEarned((prev) => prev + earnedDiamonds);
      
      // Setup immediate pop-up reward animation
      setRewardAmount({ xp: earnedXp, diamonds: earnedDiamonds });
      setShowRewardSplash(true);
      
      // Update global user state
      onAddRewards(earnedXp, earnedDiamonds);
    } else {
      // Setup zero or basic reward? Section 9 says give rewards when answering correctly.
      setRewardAmount({ xp: 0, diamonds: 0 });
    }
  };

  const handleNext = () => {
    setShowRewardSplash(false);
    if (currentIdx < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setXpEarned(0);
    setDiamondsEarned(0);
    setShowRewardSplash(false);
  };

  const progressPercentage = ((currentIdx) / quizQuestions.length) * 100;

  return (
    <div className="fade-in">
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>GAMIFIED PRACTICE</span>
          <h2 style={{ fontSize: '1.3rem' }}>Structure of Atom Quiz</h2>
        </div>
        <button 
          onClick={onBackToCompare} 
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Exit
        </button>
      </div>

      {/* QUIZ ACTIVE SCREEN */}
      {currentIdx < quizQuestions.length ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%`, height: '100%', background: 'var(--grad-primary)', borderRadius: '99px' }}></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-card" style={{ margin: 0, padding: '1.25rem', borderLeft: '3px solid var(--primary)' }}>
            <h3 style={{ fontSize: '0.9rem', lineHeight: '1.45', fontWeight: 600, color: 'var(--text-primary)' }}>
              {activeQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {activeQuestion.options.map((option, idx) => {
              let btnStyle = {
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '14px',
                border: '1px solid var(--border-glass)',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                textAlign: 'left',
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.2s'
              };

              // Color-coded verification options
              if (isAnswered) {
                if (idx === activeQuestion.correctIndex) {
                  btnStyle.border = '1px solid var(--color-covered)';
                  btnStyle.background = 'rgba(16, 185, 129, 0.12)';
                } else if (idx === selectedOption) {
                  btnStyle.border = '1px solid var(--color-missing)';
                  btnStyle.background = 'rgba(239, 68, 68, 0.12)';
                } else {
                  btnStyle.opacity = 0.5;
                }
              } else {
                // Hover effect styled inline
                btnStyle[':hover'] = { background: 'rgba(255,255,255,0.06)' };
              }

              return (
                <button 
                  key={idx} 
                  style={btnStyle}
                  onClick={() => handleOptionClick(idx)}
                >
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.7rem',
                    background: isAnswered && idx === activeQuestion.correctIndex ? 'var(--color-covered)' : 'rgba(0,0,0,0.15)',
                    color: isAnswered && idx === activeQuestion.correctIndex ? 'white' : 'var(--text-secondary)',
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span style={{ flex: 1 }}>{option}</span>
                  {isAnswered && idx === activeQuestion.correctIndex && <CheckCircle2 size={16} style={{ color: 'var(--color-covered)' }} />}
                  {isAnswered && idx === selectedOption && idx !== activeQuestion.correctIndex && <XCircle size={16} style={{ color: 'var(--color-missing)' }} />}
                </button>
              );
            })}
          </div>

          {/* Explanation panel */}
          {isAnswered && (
            <div className="glass-card fade-in" style={{ margin: 0, padding: '1rem', background: selectedOption === activeQuestion.correctIndex ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)', border: selectedOption === activeQuestion.correctIndex ? '1px solid rgba(16,185,129,0.15)' : '1px solid rgba(239,68,68,0.15)' }}>
              <h4 style={{ fontSize: '0.8rem', color: selectedOption === activeQuestion.correctIndex ? 'var(--color-covered)' : 'var(--color-missing)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {selectedOption === activeQuestion.correctIndex ? "🎉 Correct Answer!" : "❌ Incorrect"}
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {activeQuestion.explanation}
              </p>
              
              <button 
                className="btn-primary" 
                style={{ width: '100%', height: '36px', borderRadius: '8px', fontSize: '0.8rem', marginTop: '0.85rem' }}
                onClick={handleNext}
              >
                Continue <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Floating Rewards Pop-up */}
          {showRewardSplash && rewardAmount.xp > 0 && (
            <div className="reward-popup-overlay">
              <div className="reward-popup-card">
                <span style={{ fontSize: '1.5rem' }}>🔥 Awesome!</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>You answered correctly!</p>
                <div className="reward-badges-container">
                  <div className="reward-splash-badge xp">
                    <Zap size={28} style={{ color: 'var(--secondary)' }} />
                    <span>+{rewardAmount.xp} XP</span>
                  </div>
                  <div className="reward-splash-badge diamond">
                    <Gem size={28} style={{ color: '#fb7185' }} />
                    <span>+{rewardAmount.diamonds} Diamonds</span>
                  </div>
                </div>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', width: '100%', borderRadius: '10px' }} onClick={handleNext}>
                  Collect & Next
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* QUIZ COMPLETE STATE */
        <div className="glass-card fade-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'var(--grad-primary)', padding: '1rem', borderRadius: '50%', color: 'white', display: 'flex' }}>
            <Award size={48} />
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.3rem' }}>Practice Completed!</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              You scored {score} out of {quizQuestions.length} correct.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', padding: '0.75rem', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>XP GAINED</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
                <Zap size={16} /> +{xpEarned}
              </div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', padding: '0.75rem', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>DIAMONDS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fb7185', marginTop: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
                <Gem size={16} /> +{diamondsEarned}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
            <button className="btn-primary" style={{ flex: 1, height: '40px', borderRadius: '10px', fontSize: '0.8rem' }} onClick={handleReset}>
              Retake Practice
            </button>
            <button className="btn-secondary" style={{ flex: 1, height: '40px', borderRadius: '10px', fontSize: '0.8rem' }} onClick={onBackToCompare}>
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
