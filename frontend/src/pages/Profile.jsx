import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);
  const [status, setStatus] = useState('loading');

  const loadProfile = () => {
    if (!user?.id) return;
    setStatus('loading');
    usersApi
      .getById(user.id)
      .then((data) => {
        setProfile(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  const joined = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  return (
    <div className="container profile-page">
      <span className="eyebrow">Your Account</span>
      <h1 className="section-heading">My Profile</h1>

      {status === 'loading' && <Loader label="Loading your profile..." />}
      {status === 'error' && (
        <ErrorState message="Could not load your profile from the server." onRetry={loadProfile} />
      )}

      {status === 'success' && profile && (
        <div className="profile-card glass-card fade-in">
          <div className="profile-card__avatar">{initials || 'U'}</div>
          <h2 className="profile-card__name">{profile.name}</h2>
          <p className="profile-card__email">{profile.email}</p>

          <div className="profile-card__details">
            <div>
              <span className="form-label">Member Since</span>
              <p>{joined}</p>
            </div>
            <div>
              <span className="form-label">Account ID</span>
              <p>#{profile.id}</p>
            </div>
          </div>

          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
