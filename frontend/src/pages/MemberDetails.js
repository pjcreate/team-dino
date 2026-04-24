import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`/api/members/${id}`)
      .then((res) => setMember(res.data))
      .catch(() => setError('Member not found or server is offline.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="page">
      <div className="loading-wrap">
        <div className="dino-loader">🦕</div>
        <p style={{ marginTop: '1rem', fontWeight: '700' }}>Loading member...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="page">
      <Link to="/view" className="btn btn-back">← Back to Members</Link>
      <div style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: '12px', padding: '2rem', color: '#f85149', fontWeight: '700', textAlign: 'center' }}>
        ⚠️ {error}
      </div>
    </div>
  );

  const imgSrc = member.image ? `http://localhost:5000/uploads/${member.image}` : null;

  const rows = [
    { label: 'Roll Number', value: member.roll },
    { label: 'Email', value: member.email },
    { label: 'Year', value: member.year },
    { label: 'Degree', value: member.degree },
    { label: 'Project', value: member.project },
    { label: 'Certification', value: member.certificate },
    { label: 'Internship', value: member.internship },
    { label: 'Hobbies', value: member.hobbies },
    { label: 'About / Aim', value: member.aboutAim },
  ].filter((r) => r.value && r.value.trim() !== '');

  return (
    <div className="page">
      <Link to="/view" className="btn btn-back">← Back to Members</Link>

      <div className="detail-container">
        <div className="detail-hero">
          <div className="detail-cover">
            <div className="detail-cover-pattern" />
            <div className="detail-avatar-wrap">
              <div className="detail-avatar">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={member.name}
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.textContent = '🦕'; }}
                  />
                ) : (
                  '🦕'
                )}
              </div>
            </div>
          </div>

          <div className="detail-info-block">
            <div className="detail-name">{member.name}</div>
            <div className="detail-meta">{member.degree} · {member.year}</div>
            <div className="detail-role-badge">🦕 {member.role}</div>
          </div>
        </div>

        <div className="detail-fields">
          {rows.map((row) => (
            <div key={row.label} className="detail-row">
              <div className="detail-label">{row.label}</div>
              <div className="detail-value">{row.value}</div>
            </div>
          ))}
          <div className="detail-row">
            <div className="detail-label">Added On</div>
            <div className="detail-value">
              {new Date(member.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <Link to="/view" className="btn btn-secondary">← All Members</Link>
          <Link to="/add" className="btn btn-primary">➕ Add Another</Link>
        </div>
      </div>
    </div>
  );
}
