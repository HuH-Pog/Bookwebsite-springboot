import { useState } from 'react'
import './Navbar.css'

export default function Navbar({ onSelectPreset }) {
  const [open, setOpen] = useState(false)

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="navbar">
      <div className="app-shell navbar-inner">
        <button className="brand" onClick={() => scrollTo('hero')}>
          <div className="brand-logo-wrap">
            <svg
              className="brand-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <strong>ApexGrade</strong>
              <span className="brand-badge">STUDIO</span>
            </div>
            <em>Precision Academic Evaluation Engine</em>
          </div>
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <button onClick={() => scrollTo('hero')}>Overview</button>
          <button onClick={() => scrollTo('calculator')}>Evaluation Deck</button>
          <button onClick={() => scrollTo('grading-standard')}>Grading Matrix</button>

          <div className="nav-preset-group">
            <span className="preset-label">Quick Presets:</span>
            <button
              className="preset-pill topper"
              onClick={() => {
                setOpen(false)
                onSelectPreset?.('distinction')
              }}
              title="Load Distinction (>85%) sample profile"
            >
              Distinction
            </button>
            <button
              className="preset-pill firstclass"
              onClick={() => {
                setOpen(false)
                onSelectPreset?.('firstclass')
              }}
              title="Load First Class (~70%) sample profile"
            >
              First Class
            </button>
          </div>
        </nav>

        <div className="navbar-actions">
          <div className="engine-status">
            <span className="status-dot pulse" />
            <span>Core Active</span>
          </div>

          <button
            className={`hamburger ${open ? 'active' : ''}`}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
