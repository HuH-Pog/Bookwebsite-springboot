import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
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
      const res = await api.post("/auth/register", form);
      login(res.data);
      navigate("/catalogue");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your card. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-page__wrap">
        <div className="auth-card ticket-edge card-surface">
          <p className="auth-card__stub">New member</p>
          <h1 className="auth-card__title">Get your library card</h1>
          <p className="auth-card__sub">Takes under a minute. No fines, we promise.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Jordan Alvarez"
              />
            </div>
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
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
              />
            </div>

            {error && <p className="field-error">{error}</p>}

            <button className="btn btn-primary auth-card__submit" type="submit" disabled={submitting}>
              {submitting ? "Creating your card…" : "Create my card"}
            </button>
          </form>

          <p className="auth-card__foot">
            Already a member? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
