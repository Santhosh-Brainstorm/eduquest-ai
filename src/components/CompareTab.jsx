import React, { useState, useEffect } from 'react';
import { Search, BookOpen, AlertTriangle, CheckCircle, XCircle, ChevronRight, Award, Compass, Sparkles, Goal, Check, HelpCircle } from 'lucide-react';
import { TOPICS_DATABASE, CONTINUE_LEARNING } from '../services/eduData';

export default function CompareTab({ user, onNavigateToLearn, setActiveConcept }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0); // 0 = idle, 1 = step1, 2 = step2, 3 = step3, 4 = showing comparison
  const [activeTopicKey, setActiveTopicKey] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(user.goal || 'JEE');
  const [selectedConcept, setSelectedConcept] = useState(null); // Concept for bottom sheet
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0); // Swipable boards on mobile

  const suggestions = ['Structure of Atom', 'Chemical Bonding', 'Thermodynamics', 'Quadratic Equations', 'Cell Biology'];

  // Handle trigger search
  const handleSearch = (topicText) => {
    const key = topicText.toLowerCase().trim();
    if (key.includes('atom')) {
      setActiveTopicKey('structure of atom');
    } else {
      // Fallback/Demo: redirect to Structure of Atom for standard inspection
      setActiveTopicKey('structure of atom');
    }
    setShowSuggestions(false);
    setSearchQuery(topicText);
    
    // Start animated comparison pipeline
    setPipelineStep(1);
  };

  useEffect(() => {
    if (pipelineStep > 0 && pipelineStep < 4) {
      const timer = setTimeout(() => {
        setPipelineStep((prev) => prev + 1);
      }, 1000); // 1 second per analysis phase
      return () => clearTimeout(timer);
    }
  }, [pipelineStep]);

  // Sync user goal update
  useEffect(() => {
    if (user.goal) {
      setSelectedGoal(user.goal);
    }
  }, [user.goal]);

  const activeTopic = activeTopicKey ? TOPICS_DATABASE[activeTopicKey] : null;

  // Filter missing topics for user's board
  const getMissingTopics = () => {
    if (!activeTopic) return [];
    return activeTopic.concepts.filter(
      concept => concept.boards[user.board] === 'missing' || concept.boards[user.board] === 'partial'
    );
  };

  // Sort concepts by priority based on Goal
  const getPrioritizedConcepts = () => {
    if (!activeTopic) return [];
    const concepts = [...activeTopic.concepts];
    
    const priorityWeights = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    
    return concepts.sort((a, b) => {
      const priorityA = a.relevance[selectedGoal]?.priority || 'Medium';
      const priorityB = b.relevance[selectedGoal]?.priority || 'Medium';
      return priorityWeights[priorityB] - priorityWeights[priorityA];
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'covered':
        return <div className="status-indicator covered"><Check size={12} /></div>;
      case 'partial':
        return <div className="status-indicator partial"><span style={{ fontWeight: 'bold' }}>!</span></div>;
      case 'missing':
      default:
        return <div className="status-indicator missing"><span style={{ fontWeight: 'bold' }}>×</span></div>;
    }
  };

  const getStatusTextLabel = (status) => {
    switch (status) {
      case 'covered': return 'Covered';
      case 'partial': return 'Partially Covered';
      case 'missing': return 'Missing / Not Covered';
      default: return 'Unknown';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Very High': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#3b82f6';
      case 'Low':
      default:
        return '#10b981';
    }
  };

  const missingTopicsList = getMissingTopics();
  const sortedConceptsList = getPrioritizedConcepts();

  // Find the top missing concept to recommend learning
  const recommendedConcept = missingTopicsList.length > 0 ? missingTopicsList[0] : sortedConceptsList[0];

  return (
    <div className="fade-in">
      {/* 1. SEARCH & IDLE STATE */}
      {pipelineStep === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Headline */}
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', tracking: '0.05em' }}>Welcome Back, {user.name} 👋</span>
            <h2 style={{ fontSize: '1.5rem', marginTop: '0.2rem', lineHeight: '1.2' }}>What do you want to learn today?</h2>
          </div>

          {/* Large Central Search */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', borderRadius: '16px', padding: '0.25rem 0.5rem', boxShadow: 'inset 0 1px 5px rgba(0,0,0,0.2)' }}>
              <Search size={20} style={{ marginLeft: '0.5rem', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search a topic or concept..."
                className="input-glass"
                style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', boxShadow: 'none' }}
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              />
              <button 
                className="btn-primary" 
                style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.85rem' }}
                onClick={() => handleSearch(searchQuery || 'Structure of Atom')}
              >
                Search
              </button>
            </div>

            {/* Auto-suggestions Panel */}
            {showSuggestions && (
              <div className="glass-card" style={{ position: 'absolute', top: '110%', left: 0, width: '100%', zIndex: 100, padding: '0.5rem 0', margin: 0 }}>
                <div style={{ padding: '0.4rem 1rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>POPULAR TOPICS</div>
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearch(item)}
                    style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s', borderBottom: index < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none' }}
                    className="suggestion-row-hover"
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    🔍 &nbsp; {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Continue Learning history list */}
          <div>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={16} /> Continue Learning
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {CONTINUE_LEARNING.map((card) => (
                <div key={card.id} className="glass-card" style={{ minWidth: '220px', width: '220px', padding: '1rem', margin: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span>{card.subject}</span>
                    <span>{card.lastStudied}</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{card.concept}</h4>
                  
                  {/* Progress bar container */}
                  <div style={{ marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                      <span>Syllabus Progress</span>
                      <span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>{card.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ width: `${card.progress}%`, height: '100%', background: 'var(--grad-cyan)', borderRadius: '99px' }}></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleSearch(card.concept)}
                    className="btn-primary" 
                    style={{ padding: '0.4rem', fontSize: '0.75rem', width: '100%', height: '32px', borderRadius: '8px', marginTop: '0.25rem' }}
                  >
                    Resume Study
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Banner explanation */}
          <div className="glass-card" style={{ display: 'flex', gap: '0.75rem', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.12)', margin: 0 }}>
            <div style={{ color: 'var(--secondary)', display: 'flex', flexShrink: 0 }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Curriculum-Aligned Learning Gaps</h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                We parse syllabi across multiple boards (TN Board, CBSE, ICSE) using AI models. Searching a concept highlights missing points compared to competition guidelines like JEE and NEET.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. LOADING PIPELINE ANIMATION */}
      {pipelineStep > 0 && pipelineStep < 4 && (
        <div className="glass-card pipeline-step-container">
          <div className="pipeline-spinner"></div>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Analyzing "{searchQuery || 'Structure of Atom'}"</h3>
          
          <div className="pipeline-step-list" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className={`pipeline-step ${pipelineStep === 1 ? 'active' : ''} ${pipelineStep > 1 ? 'completed' : ''}`}>
              <div className="pipeline-step-dot"></div>
              <span style={{ fontSize: '0.85rem' }}>Step 1: Understanding your curriculum ({user.board})...</span>
            </div>
            <div className={`pipeline-step ${pipelineStep === 2 ? 'active' : ''} ${pipelineStep > 2 ? 'completed' : ''}`}>
              <div className="pipeline-step-dot"></div>
              <span style={{ fontSize: '0.85rem' }}>Step 2: Comparing with national board requirements...</span>
            </div>
            <div className={`pipeline-step ${pipelineStep === 3 ? 'active' : ''} ? 'completed' : ''`}>
              <div className="pipeline-step-dot"></div>
              <span style={{ fontSize: '0.85rem' }}>Step 3: Indexing topic learning gaps and priority order...</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. COMPARISON VIEW STATE */}
      {pipelineStep === 4 && activeTopic && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Back to search */}
          <button 
            onClick={() => setPipelineStep(0)} 
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.8rem', paddingLeft: 0 }}
          >
            ← Back to Study Navigation
          </button>

          {/* Topic Title */}
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>{activeTopic.subject}</span>
            <h2 style={{ fontSize: '1.4rem' }}>{activeTopic.title}</h2>
          </div>

          {/* Gaps Warning Banner */}
          {missingTopicsList.length > 0 && (
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.18)', borderRadius: '14px', padding: '0.75rem 1rem', display: 'flex', gap: '0.6rem' }}>
              <AlertTriangle size={20} style={{ color: 'var(--color-missing)', flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>Attention: Syllabus Gaps Identified</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.35' }}>
                  {activeTopic.missingWarning}
                </p>
              </div>
            </div>
          )}

          {/* Goal Selector */}
          <div className="glass-card" style={{ padding: '0.85rem 1rem', margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <Goal size={14} style={{ color: 'var(--secondary)' }} />
              <span>Personalize Priority for Goal:</span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
              {['Board Exam', 'JEE', 'NEET', 'Concept Mastery'].map((goalOption) => (
                <button
                  key={goalOption}
                  onClick={() => setSelectedGoal(goalOption)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    background: selectedGoal === goalOption ? 'var(--grad-primary)' : 'rgba(255,255,255,0.05)',
                    border: selectedGoal === goalOption ? 'none' : '1px solid var(--border-glass)',
                    color: selectedGoal === goalOption ? 'white' : 'var(--text-secondary)'
                  }}
                >
                  {goalOption}
                </button>
              ))}
            </div>
          </div>

          {/* Board Checklist Carousel */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>Curriculum Checklists</h3>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {['TN Board', 'CBSE', 'ICSE'].map((bName, bIdx) => (
                  <button
                    key={bName}
                    onClick={() => setCurrentBoardIndex(bIdx)}
                    style={{
                      padding: '0.2rem 0.4rem',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      background: currentBoardIndex === bIdx ? 'rgba(99,102,241,0.2)' : 'transparent',
                      border: 'none',
                      color: currentBoardIndex === bIdx ? 'var(--primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {bIdx === 0 ? 'TN (Mine)' : bName}
                  </button>
                ))}
              </div>
            </div>

            {/* Board cards swipable section */}
            <div className="board-comparison-scroll">
              {['Tamil Nadu State Board', 'CBSE / NCERT', 'ICSE'].map((boardName, bIndex) => {
                // If on mobile emulation, we might want to highlight/only show active card or render all.
                // We show all, but dynamically position them based on currentBoardIndex.
                const isUserBoard = boardName === user.board;
                
                // On mobile we scroll natively, but let's make it snap and highlight based on tab selector
                return (
                  <div 
                    key={boardName} 
                    className="glass-card board-card-item"
                    style={{ 
                      margin: 0,
                      border: isUserBoard ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-glass)',
                      background: isUserBoard ? 'rgba(99, 102, 241, 0.03)' : 'var(--bg-card)',
                      opacity: currentBoardIndex === bIndex ? 1 : 0.6,
                      transform: currentBoardIndex === bIndex ? 'scale(1)' : 'scale(0.96)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className="board-card-header">
                      <span style={{ color: isUserBoard ? 'var(--primary)' : 'var(--text-primary)' }}>
                        {boardName} {isUserBoard && ' (Your Board)'}
                      </span>
                    </div>

                    <div className="board-concept-list">
                      {activeTopic.concepts.map((concept) => {
                        const status = concept.boards[boardName] || 'missing';
                        return (
                          <div 
                            key={concept.id} 
                            className="concept-list-row"
                            onClick={() => setSelectedConcept(concept)}
                          >
                            {getStatusIcon(status)}
                            <span style={{ flex: 1, textDecoration: status === 'missing' ? 'line-through' : 'none', opacity: status === 'missing' ? 0.5 : 1 }}>
                              {concept.name}
                            </span>
                            <span style={{ fontSize: '0.6rem', color: getPriorityColor(concept.relevance[selectedGoal]?.priority), fontWeight: 'bold' }}>
                              {concept.relevance[selectedGoal]?.priority}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              💡 Tap any concept to view exam weightage, importance, and gaps details.
            </div>
          </div>

          {/* Topics You Are Missing Quick List */}
          {missingTopicsList.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Gaps in Your Board</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {missingTopicsList.map((concept) => (
                  <div
                    key={concept.id}
                    className="glass-card"
                    onClick={() => setSelectedConcept(concept)}
                    style={{ margin: 0, padding: '0.65rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderLeft: '3px solid var(--color-missing)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="status-indicator missing" style={{ width: '16px', height: '16px', fontSize: '0.6rem' }}>×</div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{concept.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
                      <span style={{ padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-missing)', fontWeight: 'bold' }}>
                        {concept.boards[user.board] === 'missing' ? 'Missing' : 'Partial'}
                      </span>
                      <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Path Panel */}
          <div className="glass-card" style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.15)', margin: 0 }}>
            <h3 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
              <Award size={16} style={{ color: 'var(--primary)' }} /> Your Recommended Study Path
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.75rem', position: 'relative', paddingLeft: '0.75rem', borderLeft: '1px dashed var(--border-glass)' }}>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-16px', top: '2px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                <strong>1. Learn → {recommendedConcept.name}</strong>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>Core topic missing in your curriculum. Essential for {selectedGoal}.</div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-16px', top: '2px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--text-muted)' }}></div>
                <strong>2. Understand → Quantum Numbers</strong>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>Understand electron addresses and energy states.</div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-16px', top: '2px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--text-muted)' }}></div>
                <strong>3. Practice → Application Questions</strong>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>Solve high-yield equations and formula application.</div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-16px', top: '2px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--text-muted)' }}></div>
                <strong>4. Test → Quick Topic Quiz</strong>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>Test your speed & earn +20 XP +5 Diamonds.</div>
              </div>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', height: '40px', marginTop: '1rem', borderRadius: '10px', fontSize: '0.8rem' }}
              onClick={() => {
                // Set the active learning concept globally and transition to Learn Tab
                const targetKey = recommendedConcept.id === 'quantum_model' ? 'quantum_model' : 'heisenberg';
                setActiveConcept(targetKey);
                onNavigateToLearn();
              }}
            >
              Learn This: {recommendedConcept.name}
            </button>
          </div>
        </div>
      )}

      {/* 4. DETAIL CONCEPT BOTTOM PANEL DRAWER */}
      {selectedConcept && (
        <>
          <div className="bottom-sheet-backdrop" onClick={() => setSelectedConcept(null)}></div>
          <div className="concept-drawer-sheet">
            <div className="drawer-drag-bar"></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--secondary)', fontWeight: 600 }}>Concept Analysis</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.1rem', color: 'var(--text-primary)' }}>{selectedConcept.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedConcept(null)}
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {selectedConcept.description}
            </p>

            {/* Board Status Breakdowns */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.15)', padding: '0.75rem', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Coverage by Boards</div>
              {Object.entries(selectedConcept.boards).map(([bName, bStatus]) => {
                const isUserBoard = bName === user.board;
                return (
                  <div key={bName} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                    <span style={{ color: isUserBoard ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: isUserBoard ? 'bold' : 'normal' }}>
                      {bName} {isUserBoard && '(You)'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {getStatusIcon(bStatus)}
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-primary)' }}>{getStatusTextLabel(bStatus)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Goal Weightage */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Exam Weightage & Priority ({selectedGoal})</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div 
                  style={{
                    background: getPriorityColor(selectedConcept.relevance[selectedGoal]?.priority),
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}
                >
                  {selectedConcept.relevance[selectedGoal]?.priority} Priority
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Importance Level: {selectedConcept.importance}</span>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.35', fontStyle: 'italic', marginTop: '0.2rem' }}>
                💡 {selectedConcept.relevance[selectedGoal]?.desc}
              </p>
            </div>

            {/* Action buttons inside drawer */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                className="btn-primary"
                style={{ flex: 2, height: '40px', fontSize: '0.8rem', borderRadius: '10px' }}
                onClick={() => {
                  const targetKey = selectedConcept.id === 'quantum_model' ? 'quantum_model' : 'heisenberg';
                  setActiveConcept(targetKey);
                  setSelectedConcept(null);
                  onNavigateToLearn();
                }}
              >
                Go to Study Module
              </button>
              <button
                className="btn-secondary"
                style={{ flex: 1, height: '40px', fontSize: '0.8rem', borderRadius: '10px' }}
                onClick={() => setSelectedConcept(null)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
