import React from 'react'
import { Link } from 'react-router-dom'
import { Calculator, History, Award, CheckCircle, ArrowRight, BookOpen, Sparkles, ShieldCheck, BarChart3 } from 'lucide-react'

function Home({ onOpenGradeScale }) {
  const gradeScalePreview = [
    { range: '90–100', grade: 'O', pt: 10, label: 'Outstanding' },
    { range: '80–89', grade: 'A+', pt: 9, label: 'Excellent' },
    { range: '70–79', grade: 'A', pt: 8, label: 'Very Good' },
    { range: '60–69', grade: 'B+', pt: 7, label: 'Good' },
    { range: '50–59', grade: 'B', pt: 6, label: 'Above Average' },
    { range: '40–49', grade: 'C', pt: 5, label: 'Pass' },
    { range: '< 40', grade: 'F', pt: 0, label: 'Fail' },
  ]

  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-pill">
          <span className="hero-pill-badge">ApexGrade v2.0</span>
          <span>Next-Gen Academic Analytics</span>
        </div>

        <h1 className="hero-title">
          Precision Examination Grading & <br />
          <span className="hero-title-gradient">Semester CGPA Analytics</span>
        </h1>

        <p className="hero-description">
          Automated weighted score aggregation, official university transcript generation,
          and credit-based performance analytics engineered for higher education.
        </p>

        <div className="hero-cta-group">
          <Link to="/calculate" className="btn btn-primary btn-lg">
            <Calculator size={18} />
            Calculate Semester Result
            <ArrowRight size={18} />
          </Link>
          <Link to="/history" className="btn btn-secondary btn-lg">
            <History size={18} />
            Browse Result Records
          </Link>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-box">
            <BarChart3 size={24} />
          </div>
          <h3 className="feature-title">Automated Weightage Engine</h3>
          <p className="feature-text">
            Complies with university standards where Mid-Semester Exams (MSE out of 30)
            and End-Semester Exams (ESE out of 70) are calculated into 100-mark aggregates.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">
            <Award size={24} />
          </div>
          <h3 className="feature-title">Credit-Weighted CGPA</h3>
          <p className="feature-text">
            Computes exact Grade Points based on subject credits using standard university
            formula: &Sigma;(Credit &times; Grade Point) / &Sigma;(Total Credits).
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">
            <ShieldCheck size={24} />
          </div>
          <h3 className="feature-title">Official Grade Transcripts</h3>
          <p className="feature-text">
            Generates standardized, print-ready semester examination grade cards with
            instant PDF download and complete database persistence.
          </p>
        </div>
      </section>

      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <BookOpen className="card-title-icon" size={20} />
            <h2 className="card-title">Institutional Evaluation Framework</h2>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onOpenGradeScale}
          >
            <Sparkles size={14} /> Full Policy Details
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div>
            <h4 style={{ fontSize: '0.98rem', marginBottom: 12, color: 'var(--primary-600)' }}>
              Weightage & Evaluation Rules
            </h4>
            <ul style={{ paddingLeft: 18, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8 }}>
              <li>
                <strong>Mid-Semester Exam (MSE):</strong> Scaled out of <strong>30 Marks</strong>.
              </li>
              <li>
                <strong>End-Semester Exam (ESE):</strong> Scaled out of <strong>70 Marks</strong>.
              </li>
              <li>
                <strong>Final Aggregate:</strong> MSE + ESE yields final score out of <strong>100</strong>.
              </li>
              <li>
                <strong>Pass Threshold:</strong> Minimum 40 marks required per subject. Any subject below 40 triggers semester <strong>FAIL</strong>.
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.98rem', marginBottom: 12, color: 'var(--primary-600)' }}>
              Letter Grade Scale (10-Point Scale)
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {gradeScalePreview.map((g) => (
                <div
                  key={g.grade}
                  style={{
                    background: 'var(--bg-muted)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 12px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ fontWeight: 800, color: 'var(--primary-600)' }}>{g.grade}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({g.range})</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{g.pt} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <CheckCircle size={15} color="var(--color-success)" style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
            Ready to evaluate? Fill in student marks and generate instant results.
          </span>
          <Link to="/calculate" className="btn btn-primary btn-sm">
            Launch Calculator →
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
