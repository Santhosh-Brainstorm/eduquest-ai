import React from 'react';
import { Flame, Zap, Gem, CheckCircle, Award, Target, Calendar } from 'lucide-react';
import { STUDY_CALENDAR } from '../services/eduData';

export default function StreakTab({ user }) {
  // Calendar Grid builder (represents last 28 days for clean presentation)
  const renderCalendarGrid = () => {
    // Generate dates for grid
    const today = new Date("2026-08-09");
    const gridItems = [];
    
    // Create mapping of study dates to speed up lookups
    const studyMap = {};
    STUDY_CALENDAR.forEach(day => {
      studyMap[day.date] = day;
    });

    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const studyInfo = studyMap[dateStr];
      const count = studyInfo ? studyInfo.count : 0;
      const xp = studyInfo ? studyInfo.xp : 0;
      
      // Determine colors based on intensity
      let boxBg = 'rgba(255, 255, 255, 0.03)';
      let boxBorder = 'rgba(255, 255, 255, 0.05)';
      if (count === 1) { boxBg = 'rgba(99, 102, 241, 0.25)'; boxBorder = 'rgba(99, 102, 241, 0.4)'; }
      else if (count === 2) { boxBg = 'rgba(99, 102, 241, 0.5)'; boxBorder = 'rgba(99, 102, 241, 0.7)'; }
      else if (count >= 3) { boxBg = 'var(--primary)'; boxBorder = 'var(--primary)'; }

      gridItems.push(
        <div 
          key={dateStr}
          title={`${dateStr}: ${count} study sessions, +${xp} XP`}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: boxBg,
            border: `1px solid ${boxBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.55rem',
            color: count > 0 ? 'white' : 'var(--text-muted)',
            position: 'relative'
          }}
        >
          {d.getDate()}
          {count > 0 && (
            <div style={{ position: 'absolute', bottom: '2px', width: '3px', height: '3px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
          )}
        </div>
      );
    }
    return gridItems;
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Page Title */}
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>STREAK DASHBOARD</span>
        <h2 style={{ fontSize: '1.3rem' }}>Habit & Progress</h2>
      </div>

      {/* Hero Streak Card */}
      <div className="glass-card" style={{ 
        margin: 0, 
        padding: '1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.25)',
        boxShadow: '0 10px 25px rgba(249, 115, 22, 0.05)'
      }}>
        <div className="flame-icon-pulse" style={{ color: '#f97316', marginBottom: '0.5rem' }}>
          <Flame size={54} fill="#f97316" />
        </div>
        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: '1' }}>{user.streak} Days</span>
        <span style={{ fontSize: '0.85rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', tracking: '0.05em', marginTop: '0.2rem' }}>Active Learning Streak</span>
        
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.45', padding: '0 0.5rem' }}>
          “Great consistency! Keep building your learning habit. Every day builds a stronger foundation.”
        </p>
      </div>

      {/* Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        
        <div className="glass-card" style={{ margin: 0, padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'rgba(99,102,241,0.15)', padding: '0.4rem', borderRadius: '8px', color: 'var(--primary)' }}>
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Total XP</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{user.xp}</div>
          </div>
        </div>

        <div className="glass-card" style={{ margin: 0, padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'rgba(251,113,133,0.15)', padding: '0.4rem', borderRadius: '8px', color: '#fb7185' }}>
            <Gem size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Diamonds</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{user.diamonds}</div>
          </div>
        </div>

        <div className="glass-card" style={{ margin: 0, padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'rgba(16,185,129,0.15)', padding: '0.4rem', borderRadius: '8px', color: 'var(--color-covered)' }}>
            <CheckCircle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Concepts Met</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{user.topicsCompleted}</div>
          </div>
        </div>

        <div className="glass-card" style={{ margin: 0, padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'rgba(6,182,212,0.15)', padding: '0.4rem', borderRadius: '8px', color: 'var(--secondary)' }}>
            <Target size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Avg Score</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{user.avgQuizScore}%</div>
          </div>
        </div>
      </div>

      {/* Learning Heat Grid */}
      <div className="glass-card" style={{ margin: 0, padding: '1rem' }}>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={15} style={{ color: 'var(--primary)' }} /> Study History Calendar
        </h3>
        
        {/* Calendar Grid of squares */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.45rem', justifyContent: 'center' }}>
          {renderCalendarGrid()}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', fontSize: '0.65rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-glass)', paddingTop: '0.5rem' }}>
          <span>Longest Streak: <strong>{user.longestStreak} days</strong></span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <span>Less</span>
            <div style={{ width: '8px', height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '1px' }}></div>
            <div style={{ width: '8px', height: '8px', background: 'rgba(99, 102, 241, 0.25)', borderRadius: '1px' }}></div>
            <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '1px' }}></div>
            <span>More</span>
          </div>
        </div>
      </div>

    </div>
  );
}
