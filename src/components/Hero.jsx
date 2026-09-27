import './Hero.css'

const GRADE_TIERS = [
  { grade: 'O', range: '90 - 100', points: '10 pts', color: 'tier-o' },
  { grade: 'A+', range: '80 - 89', points: '9 pts', color: 'tier-aplus' },
  { grade: 'A', range: '70 - 79', points: '8 pts', color: 'tier-a' },
  { grade: 'B+', range: '60 - 69', points: '7 pts', color: 'tier-bplus' },
  { grade: 'B', range: '50 - 59', points: '6 pts', color: 'tier-b' },
  { grade: 'C', range: '40 - 49', points: '5 pts', color: 'tier-c' },
  { grade: 'F', range: '0 - 39', points: '0 pts', color: 'tier-f' },
]

export default function Hero({ onCalculate, onViewGrading, onSelectPreset }) {
  return (
    <section id="hero" className="hero-section">
      <div className="app-shell">
        <div className="hero-grid">
          {/* Left Column: Copy & Actions */}
          <div className="hero-content">
            <div className="hero-eyebrow-wrap">
              <span className="hero-badge-dot" />
              <span>APEXGRADE ANALYTICS · SEMESTER ASSESSMENT SUITE</span>
            </div>

            <h1 className="hero-headline">
              Intelligent Semester <br />
              <span className="text-gradient">Performance Engine</span>
            </h1>

            <p className="hero-description">
              Engineered for rigorous academic evaluation. Accurately compiles 
              weighted assessments (<strong>30% MSE</strong> + <strong>70% ESE</strong>),
              computes SGPA metrics, and generates verified digital grade transcripts instantly.
            </p>

            <div className="hero-cta-group">
              <button className="btn btn-primary hero-btn-main" onClick={onCalculate}>
                <span>Launch Evaluation Deck</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </button>

              <button className="btn btn-secondary" onClick={onViewGrading}>
                <span>Grading Matrix</span>
              </button>
            </div>

            {/* Quick Presets for instant gratification */}
            <div className="hero-presets">
              <span className="presets-title">Instant Sample Scenarios:</span>
              <div className="preset-buttons">
                <button
                  type="button"
                  className="preset-btn distinction"
                  onClick={() => onSelectPreset?.('distinction')}
                >
                  ⚡ Distinction (88%)
                </button>
                <button
                  type="button"
                  className="preset-btn firstclass"
                  onClick={() => onSelectPreset?.('firstclass')}
                >
                  🎯 First Class (72%)
                </button>
                <button
                  type="button"
                  className="preset-btn backlog"
                  onClick={() => onSelectPreset?.('edge')}
                >
                  ⚠️ Critical Edge (42%)
                </button>
              </div>
            </div>

            {/* Micro stats banner */}
            <div className="hero-metrics-bar">
              <div className="hero-metric-item">
                <span className="metric-val mono-val">30%</span>
                <span className="metric-lbl">Mid-Sem Weight (MSE)</span>
              </div>
              <div className="metric-sep" />
              <div className="hero-metric-item">
                <span className="metric-val mono-val">70%</span>
                <span className="metric-lbl">End-Sem Weight (ESE)</span>
              </div>
              <div className="metric-sep" />
              <div className="hero-metric-item">
                <span className="metric-val mono-val">40.0</span>
                <span className="metric-lbl">Pass Threshold Mark</span>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Glass Dashboard Mockup */}
          <div className="hero-visual-pane">
            <div className="glass-showcase-card">
              <div className="showcase-header">
                <div className="showcase-indicator">
                  <span className="showcase-dot active" />
                  <span>Real-time Analytical Preview</span>
                </div>
                <span className="showcase-session mono-val">SEM-04 LIVE</span>
              </div>

              {/* Central Radial Progress & Score */}
              <div className="showcase-body">
                <div className="showcase-score-ring">
                  <svg className="ring-svg" viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="50" />
                    <circle className="ring-fill" cx="60" cy="60" r="50" />
                  </svg>
                  <div className="ring-content">
                    <span className="ring-number mono-val">88.25%</span>
                    <span className="ring-label">Aggregate Score</span>
                  </div>
                </div>

                <div className="showcase-key-metrics">
                  <div className="showcase-metric-box">
                    <span className="box-label">ESTIMATED SGPA</span>
                    <span className="box-val mono-val text-gradient-indigo">9.25 / 10</span>
                  </div>
                  <div className="showcase-metric-box">
                    <span className="box-label">CLEARANCE RATE</span>
                    <span className="box-val mono-val text-emerald">4/4 Passed</span>
                  </div>
                  <div className="showcase-metric-box">
                    <span className="box-label">CLASSIFICATION</span>
                    <span className="box-val text-amber">First Class Dist.</span>
                  </div>
                </div>
              </div>

              {/* Mini Interactive Subject Bars */}
              <div className="showcase-bars">
                <div className="showcase-bar-row">
                  <span>Data Structures</span>
                  <div className="bar-track">
                    <div className="bar-fill cyan" style={{ width: '92%' }} />
                  </div>
                  <span className="bar-pts mono-val">92%</span>
                </div>
                <div className="showcase-bar-row">
                  <span>DBMS Architecture</span>
                  <div className="bar-track">
                    <div className="bar-fill indigo" style={{ width: '87%' }} />
                  </div>
                  <span className="bar-pts mono-val">87%</span>
                </div>
                <div className="showcase-bar-row">
                  <span>Computer Networks</span>
                  <div className="bar-track">
                    <div className="bar-fill purple" style={{ width: '84%' }} />
                  </div>
                  <span className="bar-pts mono-val">84%</span>
                </div>
              </div>

              {/* Floating holographic badges */}
              <div className="holo-badge badge-top">
                <span className="holo-icon">★</span>
                <span>Top Grade: <strong>O Tier</strong></span>
              </div>

              <div className="holo-badge badge-bottom">
                <span className="holo-shield">🛡</span>
                <span>Verified Weighting Split</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grading Standard Matrix strip */}
        <div id="grading-standard" className="grading-matrix-strip">
          <div className="grading-strip-title">
            <span className="grading-dot" />
            <span>Academic Grading Standards Matrix</span>
          </div>

          <div className="grading-tiers-scroller">
            {GRADE_TIERS.map((tier) => (
              <div className={`tier-card ${tier.color}`} key={tier.grade}>
                <div className="tier-grade-badge mono-val">{tier.grade}</div>
                <div className="tier-details">
                  <span className="tier-range mono-val">{tier.range}</span>
                  <span className="tier-points">{tier.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
