import React, { useState } from 'react';
import { Compass, GraduationCap, ArrowRight, Globe, Mail, Lock, User, ShieldAlert } from 'lucide-react';
import { INITIAL_USER } from '../services/eduData';

export default function LoginScreen({ onLoginSuccess }) {
  const [step, setStep] = useState('login'); // login -> onboarding
  
  // Login fields
  const [loginForm, setLoginForm] = useState({
    name: 'Arjun',
    email: 'arjun@eduquest.ai',
    password: 'password123',
    otpMode: false
  });

  // Onboarding personalization fields
  const [onboardForm, setOnboardForm] = useState({
    className: '11',
    board: 'Tamil Nadu State Board',
    school: 'ABC Higher Secondary School',
    goal: 'JEE',
    language: 'Tamil + English'
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // In demo, proceed directly to personalization/onboarding
    setStep('onboarding');
  };

  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    
    // Construct final user object
    const finalUserObj = {
      ...INITIAL_USER,
      name: loginForm.name,
      email: loginForm.email,
      className: onboardForm.className,
      board: onboardForm.board,
      school: onboardForm.school,
      goal: onboardForm.goal,
      language: onboardForm.language,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(loginForm.name)}&backgroundColor=b6e3f4`
    };

    onLoginSuccess(finalUserObj);
  };

  return (
    <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }}>
      
      {step === 'login' && (
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', backdropFilter: 'blur(20px)' }}>
          {/* Logo & Tagline */}
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ background: 'var(--grad-primary)', padding: '0.6rem', borderRadius: '14px', display: 'flex', color: 'white' }}>
                <Compass size={28} />
              </div>
              <span className="font-title" style={{ fontSize: '1.8rem', fontWeight: 800, background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                EduQuest AI
              </span>
            </div>
            <p style={{ fontStyle: 'normal', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600, padding: '0 0.5rem', lineHeight: '1.4' }}>
              “Know what you know. Discover what you're missing.”
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Name Input */}
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                required
                className="input-glass"
                placeholder="Full Name"
                style={{ paddingLeft: '36px' }}
                value={loginForm.name}
                onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
              />
            </div>

            {/* Email/Mobile Input */}
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                required
                className="input-glass"
                placeholder="Email or Mobile Number"
                style={{ paddingLeft: '36px' }}
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>

            {/* Password / OTP Input */}
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                className="input-glass"
                placeholder={loginForm.otpMode ? "Enter 6-digit OTP" : "Enter Password"}
                style={{ paddingLeft: '36px' }}
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>

            {/* OTP Toggle Link */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.75rem' }}>
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setLoginForm({ ...loginForm, otpMode: !loginForm.otpMode })}
              >
                {loginForm.otpMode ? "Use Password Login" : "Send OTP via SMS"}
              </button>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', height: '48px' }}>
              Get Started <ArrowRight size={18} />
            </button>
          </form>

          {/* Social login separator */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }}></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>OR CONTINUE WITH</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }}></div>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => setStep('onboarding')}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', width: '100%', height: '46px', fontSize: '0.85rem' }}
          >
            <Globe size={16} /> Google Account (Demo)
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Don't have an account? <span style={{ color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setStep('onboarding')}>Sign Up</span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.15)', borderRadius: '10px', padding: '0.6rem 0.8rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            <ShieldAlert size={20} style={{ flexShrink: 0, color: 'var(--primary)' }} />
            <span>Clicking login bypasses authentication backend for local inspection of the application prototype.</span>
          </div>
        </div>
      )}

      {step === 'onboarding' && (
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <div style={{ background: 'var(--grad-cyan)', padding: '0.4rem', borderRadius: '8px', color: 'white', display: 'flex' }}>
              <GraduationCap size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem' }}>Personalize Your Path</h3>
          </div>
          
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: '1.3' }}>
            EduQuest AI compares your current school board with major benchmarks (CBSE/JEE/NEET) to point out knowledge gaps.
          </p>

          <form onSubmit={handleOnboardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* School Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>School Name</label>
              <input
                type="text"
                required
                className="input-glass"
                placeholder="e.g. ABC Higher Secondary School"
                value={onboardForm.school}
                onChange={(e) => setOnboardForm({ ...onboardForm, school: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {/* Class Selection */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Class</label>
                <select
                  className="input-glass"
                  style={{ background: '#16182f', cursor: 'pointer' }}
                  value={onboardForm.className}
                  onChange={(e) => setOnboardForm({ ...onboardForm, className: e.target.value })}
                >
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>

              {/* Goal Selection */}
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Learning Goal</label>
                <select
                  className="input-glass"
                  style={{ background: '#16182f', cursor: 'pointer' }}
                  value={onboardForm.goal}
                  onChange={(e) => setOnboardForm({ ...onboardForm, goal: e.target.value })}
                >
                  <option value="JEE">JEE Prep (High Priority)</option>
                  <option value="NEET">NEET Prep</option>
                  <option value="Board Exam">Board Exam (High Marks)</option>
                  <option value="Concept Mastery">Concept Mastery</option>
                </select>
              </div>
            </div>

            {/* Board Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your School Board</label>
              <select
                className="input-glass"
                style={{ background: '#16182f', cursor: 'pointer' }}
                value={onboardForm.board}
                onChange={(e) => setOnboardForm({ ...onboardForm, board: e.target.value })}
              >
                <option value="Tamil Nadu State Board">Tamil Nadu State Board</option>
                <option value="CBSE / NCERT">CBSE / NCERT Board</option>
                <option value="ICSE">ICSE / ISC Board</option>
              </select>
            </div>

            {/* Language Preference */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Preferred Study Language</label>
              <select
                className="input-glass"
                style={{ background: '#16182f', cursor: 'pointer' }}
                value={onboardForm.language}
                onChange={(e) => setOnboardForm({ ...onboardForm, language: e.target.value })}
              >
                <option value="Tamil + English">Tamil + English (Bilingual)</option>
                <option value="English">English</option>
                <option value="Hindi + English">Hindi + English (Bilingual)</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.75rem', height: '48px' }}>
              Setup Navigator <ArrowRight size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
