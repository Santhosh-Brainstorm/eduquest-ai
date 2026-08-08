import React, { useState } from 'react';
import { User, Shield, Trophy, Settings, Bell, MessageSquare, Check, Sparkles, Award } from 'lucide-react';
import { LEADERBOARD } from '../services/eduData';

export default function ProfileTab({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    school: user.school,
    goal: user.goal,
    language: user.language
  });

  const [settingsForm, setSettingsForm] = useState({
    notifyStudy: true,
    weeklyGoal: 'JEE',
    soundEffects: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: editForm.name,
      school: editForm.school,
      goal: editForm.goal,
      language: editForm.language
    });
    setIsEditing(false);
  };

  // Sync leaderboard XP dynamically if user earned extra XP
  const updatedLeaderboard = LEADERBOARD.map(player => {
    if (player.isUser) {
      return { ...player, xp: user.xp, name: `${user.name} (You)` };
    }
    return player;
  }).sort((a, b) => b.xp - a.xp);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Page Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>STUDENT DOSSIER</span>
          <h2 style={{ fontSize: '1.3rem' }}>Profile & Settings</h2>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="btn-secondary"
          style={{ padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.7rem' }}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Card Banner */}
      {!isEditing ? (
        <div className="glass-card" style={{ margin: 0, padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src={user.avatar} 
            alt="user avatar" 
            style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '2px solid var(--primary)', flexShrink: 0 }} 
          />
          <div style={{ overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1.1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Class {user.className} • {user.board}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginTop: '0.15rem' }}>🏫 {user.school}</p>
            
            <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.6rem', background: 'var(--grad-primary)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }}>
                Goal: {user.goal}
              </span>
              <span style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '0.1rem 0.4rem', border: '1px solid var(--border-glass)', borderRadius: '4px' }}>
                {user.language}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Profile Form */
        <form onSubmit={handleSave} className="glass-card" style={{ margin: 0, padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Name</label>
            <input 
              type="text" 
              className="input-glass"
              value={editForm.name} 
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>School</label>
            <input 
              type="text" 
              className="input-glass"
              value={editForm.school} 
              onChange={(e) => setEditForm({ ...editForm, school: e.target.value })} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Goal</label>
              <select 
                className="input-glass" 
                style={{ background: '#16182f' }}
                value={editForm.goal} 
                onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
              >
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="Board Exam">Board Exam</option>
                <option value="Concept Mastery">Mastery</option>
              </select>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Language</label>
              <select 
                className="input-glass" 
                style={{ background: '#16182f' }}
                value={editForm.language} 
                onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
              >
                <option value="Tamil + English">Tamil + English</option>
                <option value="English">English</option>
                <option value="Hindi + English">Hindi + English</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ height: '36px', fontSize: '0.75rem', borderRadius: '8px', marginTop: '0.25rem' }}>
            <Check size={14} /> Save Profile Details
          </button>
        </form>
      )}

      {/* School Leaderboard Card */}
      <div className="glass-card" style={{ margin: 0, padding: '1.15rem' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Trophy size={16} style={{ color: '#fbbf24' }} /> School Leaderboard (Class 11)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {updatedLeaderboard.map((player, idx) => {
            const isSelf = player.isUser || player.name.includes('Arjun');
            return (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '10px',
                  background: isSelf ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: isSelf ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid var(--border-glass)',
                  fontSize: '0.75rem'
                }}
              >
                {/* Rank Medal/Circle */}
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  background: player.rank === 1 ? '#fbbf24' : player.rank === 2 ? '#94a3b8' : player.rank === 3 ? '#b45309' : 'rgba(255,255,255,0.05)',
                  color: player.rank <= 3 ? 'black' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.65rem',
                  flexShrink: 0
                }}>
                  {player.rank}
                </div>

                <img 
                  src={player.avatar} 
                  alt="avatar" 
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: isSelf ? '1px solid var(--primary)' : '1px solid var(--border-glass)', flexShrink: 0 }} 
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: isSelf ? 'bold' : 'normal', color: isSelf ? 'var(--text-primary)' : 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {player.name}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{player.school}</div>
                </div>

                <div style={{ fontWeight: 800, color: isSelf ? 'var(--secondary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                  <span>{player.xp}</span> <span style={{ fontSize: '0.6rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preferences & Settings */}
      <div className="glass-card" style={{ margin: 0, padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Settings size={15} style={{ color: 'var(--text-muted)' }} /> Study Preferences
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Daily Study Notifications</span>
            <input 
              type="checkbox" 
              style={{ width: '34px', height: '18px', cursor: 'pointer' }}
              checked={settingsForm.notifyStudy} 
              onChange={() => setSettingsForm({ ...settingsForm, notifyStudy: !settingsForm.notifyStudy })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Audio Reward Feedback</span>
            <input 
              type="checkbox" 
              style={{ width: '34px', height: '18px', cursor: 'pointer' }}
              checked={settingsForm.soundEffects} 
              onChange={() => setSettingsForm({ ...settingsForm, soundEffects: !settingsForm.soundEffects })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderTop: '1px solid var(--border-glass)', paddingTop: '0.65rem', marginTop: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>App Version</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>v1.4.2-beta (AI Engine v2)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
