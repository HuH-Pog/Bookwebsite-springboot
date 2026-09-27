import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GraduationCap, Calculator, History, BookOpen, Sun, Moon, Menu, X } from 'lucide-react'

function Navbar({ theme, toggleTheme, onOpenGradeScale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="navbar no-print">
      <div className="navbar-inner">
        <Link to="/" className="brand-link">
          <div className="brand-logo-icon">
            <GraduationCap size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-name">ApexGrade</span>
            <span className="brand-tag">Academic Examination Portal</span>
          </div>
        </Link>

        <div className="navbar-actions">
          <nav className="navbar-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Dashboard
            </Link>
            <Link to="/calculate" className={`nav-link ${isActive('/calculate') ? 'active' : ''}`}>
              <Calculator size={16} />
              Calculate Result
            </Link>
            <Link to="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>
              <History size={16} />
              Result Records
            </Link>
            <button
              type="button"
              className="nav-link"
              onClick={onOpenGradeScale}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <BookOpen size={16} />
              Grading Policy
            </button>
          </nav>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/calculate"
            className={`nav-link ${isActive('/calculate') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Calculator size={16} />
            Calculate Result
          </Link>
          <Link
            to="/history"
            className={`nav-link ${isActive('/history') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <History size={16} />
            Result Records
          </Link>
          <button
            type="button"
            className="nav-link"
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenGradeScale()
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '8px 14px' }}
          >
            <BookOpen size={16} />
            Grading Policy
          </button>
        </div>
      )}
    </header>
  )
}

export default Navbar
