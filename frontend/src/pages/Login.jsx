import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      navigate("/catalogue");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't sign you in. Check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-page__wrap">
        <div className="auth-card ticket-edge card-surface">
          <p className="auth-card__stub">Member sign-in</p>
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__sub">Sign in with your library card to keep browsing.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="field-error">{error}</p>}

            <button className="btn btn-primary auth-card__submit" type="submit" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="auth-card__foot">
            New here? <Link to="/register">Get a library card</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
