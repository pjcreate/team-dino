import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-hero">
      <div className="home-dino-banner">🦕</div>
      <h1 className="home-title">TEAM DINO</h1>
      <p className="home-subtitle">Welcome to the Team Dino Management Portal — SRM Institute of Science and Technology</p>

      <div className="home-buttons">
        <Link to="/add" className="btn btn-primary">
          ➕ Add Member
        </Link>
        <Link to="/view" className="btn btn-secondary">
          👥 View Members
        </Link>
      </div>

      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {[
          { icon: '🦖', title: 'Fast & Agile', desc: 'Manage your team members with lightning speed' },
          { icon: '🌿', title: 'Always Green', desc: 'Track roles, projects, and achievements' },
          { icon: '🦴', title: 'Solid Foundation', desc: 'Built on React + Node + MongoDB' },
        ].map((f) => (
          <div key={f.title} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.5rem 1.8rem',
            maxWidth: '240px',
            textAlign: 'center',
            flex: '1 1 200px'
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.6rem' }}>{f.icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '1px', color: 'var(--accent-green)', marginBottom: '0.4rem' }}>
              {f.title}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600' }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
