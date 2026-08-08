import React, { useState } from 'react';
import { HelpCircle, BookOpen, Compass, Flame, User, Zap, Gem } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import CompareTab from './components/CompareTab';
import LearnTab from './components/LearnTab';
import QuizTab from './components/QuizTab';
import StreakTab from './components/StreakTab';
import ProfileTab from './components/ProfileTab';

export default function App() {
  const [user, setUser] = useState(null); // null = login/onboarding page
  const [activeTab, setActiveTab] = useState('compare'); // quiz, learn, compare, streak, profile
  const [activeConcept, setActiveConcept] = useState('heisenberg'); // active concept key

  const handleLoginSuccess = (userObj) => {
    setUser(userObj);
    setActiveTab('compare'); // Default landing screen after onboarding
  };

  const handleAddRewards = (xp, diamonds) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      xp: prev.xp + xp,
      diamonds: prev.diamonds + diamonds
    }));
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="app-simulator-container">
      
      {/* Subtle glowing elements in desktop environment */}
      <div className="desktop-decorations">
        <div className="decor-glow-1"></div>
        <div className="decor-glow-2"></div>
      </div>

      {/* Floating Info panel explaining the demo context to desktop inspectors */}
      <div className="desktop-info-panel">
        <div className="desktop-info-title">
          <Compass size={22} style={{ color: 'var(--primary)' }} />
          <span>EduQuest AI</span> Prototype
        </div>
        <p style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
          This is a mobile-first curriculum gap navigator. Use the device simulator frame to inspect interactions.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div className="desktop-info-item">
            <span className="desktop-info-bullet">✓</span>
            <span>Search <strong>“Structure of Atom”</strong> to trigger comparison checks.</span>
          </div>
          <div className="desktop-info-item">
            <span className="desktop-info-bullet">✓</span>
            <span>Change <strong>Goal selectors</strong> to reorder learning paths.</span>
          </div>
          <div className="desktop-info-item">
            <span className="desktop-info-bullet">✓</span>
            <span>Complete quizzes to earn <strong>XP & Diamonds</strong>.</span>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          Tip: Emulate a mobile screen (Ctrl+Shift+I in Chrome) for a native tap-touch inspect container.
        </div>
      </div>

      {/* Primary simulated phone frame */}
      <div className="phone-mockup-frame">
        {/* Mock notch */}
        <div className="phone-notch-island">
          <div className="phone-notch-lens"></div>
          <div className="phone-notch-sensor"></div>
        </div>

        <div className="phone-screen-viewport">
          
          {/* Header (Only shown when user is logged in/onboarded) */}
          {user && (
            <header className="app-header">
              <div className="app-header-logo">
                <Compass size={18} style={{ color: 'var(--primary)' }} />
                <span>EduQuest AI</span>
              </div>
              <div className="app-header-rewards">
                <div className="header-reward-badge xp-badge" title="Learning XP">
                  <Zap size={12} fill="var(--secondary)" style={{ color: 'var(--secondary)' }} />
                  <span>{user.xp} XP</span>
                </div>
                <div className="header-reward-badge diamond-badge" title="Gained Diamonds">
                  <Gem size={12} fill="#fb7185" style={{ color: '#fb7185' }} />
                  <span>{user.diamonds}</span>
                </div>
              </div>
            </header>
          )}

          {/* Core Content Area */}
          <main className="app-content-body">
            {!user ? (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            ) : (
              <>
                {activeTab === 'compare' && (
                  <CompareTab 
                    user={user} 
                    onNavigateToLearn={() => setActiveTab('learn')}
                    setActiveConcept={setActiveConcept}
                  />
                )}
                {activeTab === 'learn' && (
                  <LearnTab 
                    activeConceptKey={activeConcept} 
                    onBackToCompare={() => setActiveTab('compare')}
                  />
                )}
                {activeTab === 'quiz' && (
                  <QuizTab 
                    user={user} 
                    onAddRewards={handleAddRewards}
                    onBackToCompare={() => setActiveTab('compare')}
                  />
                )}
                {activeTab === 'streak' && (
                  <StreakTab user={user} />
                )}
                {activeTab === 'profile' && (
                  <ProfileTab 
                    user={user} 
                    onUpdateUser={handleUpdateUser} 
                  />
                )}
              </>
            )}
          </main>

          {/* Bottom navigation bar (Only shown when logged in) */}
          {user && (
            <nav className="bottom-navigation-bar">
              <button 
                onClick={() => setActiveTab('quiz')} 
                className={`nav-bar-item ${activeTab === 'quiz' ? 'active' : ''}`}
              >
                <HelpCircle size={20} className="nav-bar-item-icon" />
                <span className="nav-bar-item-label">Quiz</span>
              </button>

              <button 
                onClick={() => setActiveTab('learn')} 
                className={`nav-bar-item ${activeTab === 'learn' ? 'active' : ''}`}
              >
                <BookOpen size={20} className="nav-bar-item-icon" />
                <span className="nav-bar-item-label">Learn</span>
              </button>

              {/* Centered Comparison tab is highlighted */}
              <button 
                onClick={() => setActiveTab('compare')} 
                className={`nav-bar-item compare-home-btn ${activeTab === 'compare' ? 'active' : ''}`}
              >
                <div className="compare-icon-wrap">
                  <Compass size={24} />
                </div>
                <span className="nav-bar-item-label" style={{ marginTop: '0.15rem' }}>Compare</span>
              </button>

              <button 
                onClick={() => setActiveTab('streak')} 
                className={`nav-bar-item ${activeTab === 'streak' ? 'active' : ''}`}
              >
                <Flame size={20} className="nav-bar-item-icon" />
                <span className="nav-bar-item-label">Streak</span>
              </button>

              <button 
                onClick={() => setActiveTab('profile')} 
                className={`nav-bar-item ${activeTab === 'profile' ? 'active' : ''}`}
              >
                <User size={20} className="nav-bar-item-icon" />
                <span className="nav-bar-item-label">Profile</span>
              </button>
            </nav>
          )}

        </div>
      </div>
    </div>
  );
}
