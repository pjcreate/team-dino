import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMembers = async () => {
    try {
      const res = await axios.get('/api/members');
      setMembers(res.data);
    } catch (err) {
      setError('Could not fetch members. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the herd?`)) return;
    try {
      await axios.delete(`/api/members/${id}`);
      setMembers(members.filter((m) => m._id !== id));
    } catch {
      alert('Failed to delete member.');
    }
  };

  return (
    <div className="page">
      <Link to="/" className="btn btn-back">← Back to Home</Link>
      <h2 className="section-title">THE HERD</h2>
      <p className="section-subtitle">All Team Dino members from the database 🌿</p>

      {loading && (
        <div className="loading-wrap">
          <div className="dino-loader">🦕</div>
          <p style={{ marginTop: '1rem', fontWeight: '700' }}>Fetching the herd...</p>
        </div>
      )}

      {error && (
        <div style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: '12px', padding: '1.5rem', color: '#f85149', fontWeight: '700' }}>
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && members.length === 0 && (
        <div className="empty-state">
          <div className="big-emoji">🦴</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '2px', color: 'var(--text-secondary)' }}>NO DINOS YET</p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
            Add the first team member to get started!
          </p>
          <Link to="/add" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            ➕ Add Member
          </Link>
        </div>
      )}

      {!loading && members.length > 0 && (
        <>
          <div className="stats-bar">
            <div className="stat-pill">👥 Total Members: <span>{members.length}</span></div>
            <div className="stat-pill">🦕 Team: <span>Dino</span></div>
          </div>

          <div className="members-grid">
            {members.map((member) => (
              <div key={member._id} className="member-card">
                <div className="member-card-img">
                  {member.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${member.image}`}
                      alt={member.name}
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.textContent = '🦕'; }}
                    />
                  ) : (
                    '🦕'
                  )}
                </div>
                <div className="member-card-body">
                  <div className="member-card-name">{member.name}</div>
                  <div className="member-card-role">{member.role}</div>
                  <div className="member-card-info">🎓 Roll: {member.roll}</div>
                  <div className="member-card-info">📧 {member.email}</div>
                  <div className="member-card-footer">
                    <Link to={`/member/${member._id}`} className="btn btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
                      View Details
                    </Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(member._id, member.name)}>
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
