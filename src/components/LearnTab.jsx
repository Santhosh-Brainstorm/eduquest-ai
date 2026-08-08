import React, { useState } from 'react';
import { BookOpen, Sparkles, Video, Play, Star, AlertCircle, ArrowLeft } from 'lucide-react';
import { CONCEPT_RESOURCES } from '../services/eduData';
import VideoPlayer from './VideoPlayer';

export default function LearnTab({ activeConceptKey = 'heisenberg', onBackToCompare }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const conceptData = CONCEPT_RESOURCES[activeConceptKey] || CONCEPT_RESOURCES['heisenberg'];

  return (
    <div className="fade-in">
      {selectedVideo ? (
        <VideoPlayer 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Back button */}
          <button 
            onClick={onBackToCompare} 
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.8rem', paddingLeft: 0 }}
          >
            ← Back to Comparison Dashboard
          </button>

          {/* Heading */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)' }}>
              <BookOpen size={18} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Active Learning Module</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', marginTop: '0.1rem' }}>{conceptData.concept}</h2>
          </div>

          {/* Conceptual Summary */}
          <div className="glass-card" style={{ margin: 0, padding: '1.15rem' }}>
            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={14} /> Topic Overview
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
              {conceptData.overview}
            </p>
          </div>

          {/* Key Points */}
          <div className="glass-card" style={{ margin: 0, padding: '1.15rem' }}>
            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.65rem', color: 'var(--primary)' }}>Key Study Points</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {conceptData.keyPoints.map((point, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'start' }}>
                  <div style={{ 
                    width: '18px', 
                    height: '18px', 
                    borderRadius: '50%', 
                    background: 'rgba(99, 102, 241, 0.15)', 
                    color: 'var(--primary)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    marginTop: '0.1rem'
                  }}>
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Recommendations */}
          <div>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Video size={18} style={{ color: '#ef4444' }} /> YouTube Video Recommendations
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {conceptData.videos.map((vid) => (
                <div 
                  key={vid.id} 
                  className="glass-card" 
                  style={{ margin: 0, padding: '0.75rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onClick={() => setSelectedVideo(vid)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {/* Video Thumbnail Mock */}
                    <div style={{ position: 'relative', width: '110px', height: '70px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#111' }}>
                      <img 
                        src={vid.thumbnail} 
                        alt="video thumbnail" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                      />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                          <Play size={14} style={{ fill: '#000', marginLeft: '2px' }} />
                        </div>
                      </div>
                      <span style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', padding: '0.1rem 0.3rem', borderRadius: '4px', fontSize: '0.55rem', fontWeight: 'bold' }}>
                        {vid.duration}
                      </span>
                    </div>

                    {/* Video Text details */}
                    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '0.8rem', color: 'var(--text-primary)', whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.25', fontWeight: 600 }}>
                        {vid.title}
                      </h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        <span>{vid.channel}</span>
                        <span>{vid.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Recommendation Reason */}
                  <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.12)', borderRadius: '8px', padding: '0.5rem', marginTop: '0.65rem', fontSize: '0.65rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                    <Star size={14} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '0.05rem' }} />
                    <span><strong>AI Reason:</strong> {vid.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
