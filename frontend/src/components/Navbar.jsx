import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logo-mark">M</span>
          <span className="navbar__logo-text">
            MARGIN
            <span className="navbar__logo-sub">Reading club</span>
          </span>
        </Link>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/catalogue" onClick={() => setMenuOpen(false)}>
            Catalogue
          </NavLink>
          <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({itemCount})
          </NavLink>

          <div className="navbar__mobile-auth">
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </NavLink>
                <button className="btn btn-outline btn-block" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <Link to="/register" className="btn btn-gold btn-block" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="btn btn-ghost navbar__cart" aria-label={`View cart with ${itemCount} items`}>
                Cart ({itemCount})
              </Link>
              <Link to="/profile" className="btn btn-ghost navbar__profile">
                Profile
              </Link>
              <div className="navbar__user" onMouseLeave={() => setUserMenuOpen(false)}>
                <button className="navbar__avatar" onClick={() => setUserMenuOpen((o) => !o)}>
                  {initials || 'U'}
                </button>
                {userMenuOpen && (
                  <div className="navbar__dropdown fade-in">
                    <p className="navbar__dropdown-name">{user.name}</p>
                    <p className="navbar__dropdown-email">{user.email}</p>
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                      My Profile
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-gold">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
