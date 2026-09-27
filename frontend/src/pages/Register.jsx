import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/api.js';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', phone: '', address: '', email: '', password: '', confirmPassword: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) {
      errors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!form.phone.trim()) {
      errors.phone = 'Phone is required';
    }

    if (!form.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      await authApi.register({
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
      setSuccessMsg('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
      if (err.details?.length) {
        setServerError(err.details.join(' '));
      } else {
        setServerError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card fade-in">
        <div className="auth-card__head">
          <span className="eyebrow">Join Margin</span>
          <h1>Make room for good books</h1>
          <p>Begin your own quiet collection of stories.</p>
        </div>

        {serverError && <div className="form-error-banner">{serverError}</div>}
        {successMsg && <div className="form-success-banner">{successMsg}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-input ${fieldErrors.name ? 'has-error' : ''}`}
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={`form-input ${fieldErrors.phone ? 'has-error' : ''}`}
              placeholder="9876543210"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            {fieldErrors.phone && <p className="field-error">{fieldErrors.phone}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className={`form-input ${fieldErrors.address ? 'has-error' : ''}`}
              placeholder="Street, city, state"
              value={form.address}
              onChange={handleChange}
              autoComplete="street-address"
            />
            {fieldErrors.address && <p className="field-error">{fieldErrors.address}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-input ${fieldErrors.email ? 'has-error' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-input ${fieldErrors.password ? 'has-error' : ''}`}
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`form-input ${fieldErrors.confirmPassword ? 'has-error' : ''}`}
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {fieldErrors.confirmPassword && <p className="field-error">{fieldErrors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn btn-gold btn-block" disabled={submitting}>
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
