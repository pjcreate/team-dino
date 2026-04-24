import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const INITIAL = {
  name: '', roll: '', year: '', degree: '', email: '',
  role: '', project: '', hobbies: '', certificate: '',
  internship: '', aboutAim: ''
};

function Field({ name, label, placeholder, type = 'text', required, value, onChange, error }) {
  return (
    <div className="form-group">
      <label>{label}{required && <span style={{ color: 'var(--accent-green)' }}> *</span>}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}

export default function AddMember() {
  const [form, setForm] = useState(INITIAL);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.roll.trim()) errs.roll = 'Roll number is required';
    if (!form.year) errs.year = 'Year is required';
    if (!form.degree.trim()) errs.degree = 'Degree is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Invalid email address';
    }
    if (!form.role.trim()) errs.role = 'Role is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setSuccess('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);

      await axios.post('/api/members', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('🦕 Member added to the herd successfully!');
      setForm(INITIAL);
      setImage(null);
      setPreview(null);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to add member. Is the backend running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Link to="/" className="btn btn-back">← Back to Home</Link>
      <h2 className="section-title">ADD MEMBER</h2>
      <p className="section-subtitle">Welcome a new dino to the herd 🦕</p>

      <div className="form-card">
        {success && <div className="success-banner">{success}</div>}
        {errors.submit && <div className="error-msg" style={{ marginBottom: '1rem', padding: '0.8rem', background: 'rgba(248,81,73,0.08)', borderRadius: '8px' }}>{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <Field name="name" label="Full Name" placeholder="e.g. Dharani K" required value={form.name} onChange={handleChange} error={errors.name} />
            <Field name="roll" label="Roll Number" placeholder="e.g. RA2111003010001" required value={form.roll} onChange={handleChange} error={errors.roll} />

            <div className="form-group">
              <label>Year <span style={{ color: 'var(--accent-green)' }}>*</span></label>
              <select name="year" value={form.year} onChange={handleChange}>
                <option value="">Select Year</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              {errors.year && <span className="error-msg">{errors.year}</span>}
            </div>

            <Field name="degree" label="Degree" placeholder="e.g. B.Tech CSE" required value={form.degree} onChange={handleChange} error={errors.degree} />
            <Field name="email" label="Email" placeholder="you@srmist.edu.in" type="email" required value={form.email} onChange={handleChange} error={errors.email} />
            <Field name="role" label="Role / Designation" placeholder="e.g. Frontend Developer" required value={form.role} onChange={handleChange} error={errors.role} />
            <Field name="project" label="Project" placeholder="e.g. E-commerce Website" value={form.project} onChange={handleChange} error={errors.project} />
            <Field name="certificate" label="Certification" placeholder="e.g. AWS Cloud Practitioner" value={form.certificate} onChange={handleChange} error={errors.certificate} />
            <Field name="internship" label="Internship" placeholder="e.g. TCS – Web Developer" value={form.internship} onChange={handleChange} error={errors.internship} />
            <Field name="hobbies" label="Hobbies" placeholder="e.g. Gaming, Reading" value={form.hobbies} onChange={handleChange} error={errors.hobbies} />

            <div className="form-group full-width">
              <label>About Your Aim</label>
              <textarea name="aboutAim" rows={3} value={form.aboutAim} onChange={handleChange} placeholder="Describe your goals and aspirations..." />
            </div>

            <div className="form-group full-width">
              <label>Profile Photo</label>
              <div className="file-upload-area">
                <input type="file" accept="image/*" onChange={handleImage} />
                <div className="file-upload-icon">📷</div>
                <div className="file-upload-text">
                  {image ? image.name : 'Click to upload your professional photo'}
                </div>
                {image && <div className="file-name">✓ {image.name}</div>}
              </div>
              {preview && <img src={preview} alt="Preview" className="image-preview" />}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1.8rem', justifyContent: 'center', fontSize: '1.05rem' }}
            disabled={loading}
          >
            {loading ? '🦕 Saving...' : '🦕 Add to the Herd'}
          </button>
        </form>
      </div>
    </div>
  );
}
