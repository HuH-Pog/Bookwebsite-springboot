import './Footer.css'

export default function Footer() {
  return (
    <footer id="about" className="site-footer">
      <div className="app-shell footer-inner">
        <div className="footer-brand-pane">
          <div className="footer-logo">
            <span className="footer-mark">AG</span>
            <strong>ApexGrade Studio</strong>
          </div>
          <p className="footer-desc">
            Next-generation academic evaluation engine designed for rapid weighted score synthesis,
            SGPA projection, and verified digital academic transcript generation.
          </p>
          <div className="tech-badges">
            <span className="tech-badge">React 18</span>
            <span className="tech-badge">Vite 5</span>
            <span className="tech-badge">CSS Grid & Flex</span>
            <span className="tech-badge">30/70 Weighted Core</span>
          </div>
        </div>

        <div className="footer-nav-col">
          <span className="footer-col-title">Evaluation Specs</span>
          <div className="footer-col-links">
            <span>Mid-Sem Weight: 30% (Max 30)</span>
            <span>End-Sem Weight: 70% (Max 70)</span>
            <span>Passing Benchmark: 40 pts</span>
            <span>Scale: 10-pt SGPA Standard</span>
          </div>
        </div>

        <div className="footer-meta-pane">
          <div className="meta-box">
            <span className="meta-status-pill">
              <span className="meta-dot" /> Verified Academic Engine
            </span>
            <p className="meta-disclaimer">
              Built for precision self-assessment and academic performance forecasting.
            </p>
            <span className="copyright-line">© {new Date().getFullYear()} ApexGrade Studio · All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
