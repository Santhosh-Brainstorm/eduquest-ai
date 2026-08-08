import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Search, Globe, FileText, CheckCircle, Plus, ChevronLeft, Volume2, Maximize, Subtitles } from 'lucide-react';
import { SIMULATED_TRANSCRIPTS } from '../services/eduData';

export default function VideoPlayer({ video, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // in seconds, max 120 (2 mins for demo)
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [searchText, setSearchText] = useState('');
  const [showCaptions, setShowCaptions] = useState(true);
  
  // Notes generator state
  const [notesState, setNotesState] = useState('none'); // none -> generating -> generated
  const [isAddedToPath, setIsAddedToPath] = useState(false);

  // Playback timer ref
  const timerRef = useRef(null);
  const duration = 120; // 2 minutes

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  // Format time helper (e.g. 75 -> 01:15)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Convert "M:SS" string to seconds
  const parseTimeToSecs = (timeStr) => {
    const parts = timeStr.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const transcriptList = SIMULATED_TRANSCRIPTS[video.id]?.[activeLanguage] || [];

  // Filter transcript text
  const filteredTranscript = transcriptList.filter(item => 
    item.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // Determine current active transcript caption
  const getCurrentCaption = () => {
    let activeText = '';
    for (let i = 0; i < transcriptList.length; i++) {
      const itemSecs = parseTimeToSecs(transcriptList[i].time);
      if (currentTime >= itemSecs) {
        activeText = transcriptList[i].text;
      }
    }
    return activeText;
  };

  const handleGenerateNotes = () => {
    setNotesState('generating');
    setTimeout(() => {
      setNotesState('generated');
    }, 1200); // 1.2s delay for AI notes generation
  };

  const handleSeek = (secs) => {
    setCurrentTime(secs);
  };

  return (
    <div className="fade-in" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--bg-mobile)', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-glass)', background: '#090a16', zIndex: 110 }}>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
        >
          <ChevronLeft size={24} />
        </button>
        <div style={{ marginLeft: '0.75rem', overflow: 'hidden' }}>
          <h3 style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{video.title}</h3>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{video.channel}</span>
        </div>
      </div>

      {/* Main video area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Simulated Video Player */}
        <div style={{ position: 'relative', width: '100%', height: '210px', background: '#000', overflow: 'hidden', flexShrink: 0 }}>
          
          {/* Render interesting visualization based on playback */}
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            
            {/* Visualizer animation representing a particle/wave */}
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
              transform: isPlaying ? `scale(${1 + Math.sin(currentTime) * 0.15})` : 'scale(1)',
              transition: 'transform 0.5s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px dashed var(--primary)',
                animation: isPlaying ? 'spin 6s linear infinite' : 'none'
              }}></div>
            </div>
            
            <div style={{ position: 'absolute', bottom: '50px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              {isPlaying ? '⚡ Concept Waveform Oscillating...' : 'Paused'}
            </div>

            {/* Captions Overlay */}
            {showCaptions && getCurrentCaption() && (
              <div style={{ 
                position: 'absolute', 
                bottom: '12px', 
                left: '10px', 
                right: '10px', 
                background: 'rgba(0, 0, 0, 0.75)', 
                color: '#fff', 
                padding: '0.4rem 0.6rem', 
                borderRadius: '8px', 
                fontSize: '0.7rem', 
                textAlign: 'center', 
                lineHeight: '1.3',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {getCurrentCaption()}
              </div>
            )}
          </div>

          {/* Controls Bar Overlay */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)', padding: '0.4rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {/* Timeline Progress Bar */}
            <div 
              style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', cursor: 'pointer', position: 'relative' }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = clickX / rect.width;
                handleSeek(Math.floor(percent * duration));
              }}
            >
              <div style={{ width: `${(currentTime / duration) * 100}%`, height: '100%', background: 'var(--secondary)', borderRadius: '2px' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <span style={{ fontSize: '0.65rem', color: '#ccc' }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  style={{ background: 'none', border: 'none', color: showCaptions ? 'var(--secondary)' : '#aaa', cursor: 'pointer', display: 'flex' }}
                >
                  <Subtitles size={16} />
                </button>
                <Volume2 size={16} style={{ color: '#ccc' }} />
                <Maximize size={16} style={{ color: '#ccc' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel under Video */}
        <div style={{ padding: '0.85rem 1rem', display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-glass)' }}>
          <button 
            className="btn-primary" 
            style={{ flex: 1, height: '36px', borderRadius: '8px', fontSize: '0.75rem', padding: 0 }}
            onClick={handleGenerateNotes}
          >
            <FileText size={14} /> Generate AI Notes
          </button>
          
          <button 
            className="btn-secondary" 
            style={{ 
              flex: 1, 
              height: '36px', 
              borderRadius: '8px', 
              fontSize: '0.75rem', 
              padding: 0, 
              background: isAddedToPath ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
              borderColor: isAddedToPath ? 'var(--color-covered)' : 'var(--border-glass)',
              color: isAddedToPath ? 'var(--color-covered)' : 'var(--text-primary)'
            }}
            onClick={() => setIsAddedToPath(!isAddedToPath)}
          >
            {isAddedToPath ? <CheckCircle size={14} /> : <Plus size={14} />} 
            {isAddedToPath ? " Added to Path" : " Add to Study Path"}
          </button>
        </div>

        {/* Multi-language Transcripts Area */}
        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Transcript & Language</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
              <Globe size={12} style={{ color: 'var(--secondary)' }} />
              <select
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '0.7rem', cursor: 'pointer', outline: 'none' }}
                value={activeLanguage}
                onChange={(e) => setActiveLanguage(e.target.value)}
              >
                <option value="English" style={{ background: '#16182f' }}>English</option>
                <option value="Tamil" style={{ background: '#16182f' }}>Tamil (தமிழ்)</option>
                <option value="Hindi" style={{ background: '#16182f' }}>Hindi (हिंदी)</option>
              </select>
            </div>
          </div>

          {/* Search within transcript */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.2rem 0.5rem' }}>
            <Search size={14} style={{ color: 'var(--text-muted)', marginRight: '0.35rem' }} />
            <input
              type="text"
              placeholder="Search words in transcript..."
              className="input-glass"
              style={{ border: 'none', background: 'transparent', padding: '0.25rem 0', fontSize: '0.75rem', width: '100%', outline: 'none', boxShadow: 'none' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Transcript Scrollable Area */}
          <div style={{ flex: 1, minHeight: '140px', overflowY: 'auto', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '0.5rem' }}>
            {filteredTranscript.map((item, idx) => {
              const itemSecs = parseTimeToSecs(item.time);
              const isActive = currentTime >= itemSecs && (idx === filteredTranscript.length - 1 || currentTime < parseTimeToSecs(filteredTranscript[idx + 1].time));
              
              return (
                <div 
                  key={idx} 
                  onClick={() => handleSeek(itemSecs)}
                  style={{ 
                    display: 'flex', 
                    gap: '0.65rem', 
                    padding: '0.45rem', 
                    borderRadius: '8px', 
                    fontSize: '0.75rem', 
                    lineHeight: '1.4', 
                    cursor: 'pointer',
                    background: isActive ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(6,182,212,0.18)' : '1px solid transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontWeight: 700, color: isActive ? 'var(--secondary)' : 'var(--text-muted)' }}>{item.time}</span>
                  <span>{item.text}</span>
                </div>
              );
            })}
            {filteredTranscript.length === 0 && (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                No matching transcript lines found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI SUMMARY NOTES SLIDING OVERLAY */}
      {notesState !== 'none' && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(4,5,16,0.92)', zIndex: 120, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)' }}>
                <Sparkles size={20} />
                <h3 style={{ fontSize: '1rem' }}>AI Generated Study Notes</h3>
              </div>
              <button 
                onClick={() => setNotesState('none')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>

            {notesState === 'generating' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '2rem 0' }}>
                <div className="pipeline-spinner" style={{ width: '32px', height: '32px' }}></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Summarizing transcript points & extracting key formulas...</span>
              </div>
            ) : (
              <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '300px', overflowY: 'auto' }}>
                <p style={{ fontWeight: 600, color: 'var(--secondary)' }}>Topic: Heisenberg's Uncertainty Principle (Core Summary)</p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  <li><strong>Core Formula:</strong> <code>Δx · Δp ≥ h/4π</code>, stating precision bounds on micro-particles.</li>
                  <li><strong>Wave-Particle Duality:</strong> The uncertainty is a physical property of wave packets, not equipment limits.</li>
                  <li><strong>Macroscopic vs Microscopic:</strong> While an electron has visible uncertainty, a macroscopic ball's mass renders uncertainty zero in calculations.</li>
                  <li><strong>Atomic Physics Impact:</strong> Disproved Bohr's deterministic shells, leading to probability wavefunction clouds (orbitals).</li>
                </ul>
                <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.08)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.18)', color: 'var(--color-covered)', marginTop: '0.25rem' }}>
                  <CheckCircle size={14} style={{ flexShrink: 0 }} />
                  <span>Study notes compiled. Saved successfully under Arjun's active profile folder.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
