import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/catalogue';

  const validate = () => {
    const errors = {};
    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!form.password) {
      errors.password = 'Password is required';
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
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await authApi.login({ email: form.email.trim(), password: form.password });
      login(res.user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card fade-in">
        <div className="auth-card__head">
          <span className="eyebrow">Good to see you</span>
          <h1>Sign In</h1>
          <p>Return to your shelf and pick up your story.</p>
        </div>

        {serverError && <div className="form-error-banner">{serverError}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
          </div>

          <button type="submit" className="btn btn-gold btn-block" disabled={submitting}>
            {submitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer-link">
          New to Margin? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
