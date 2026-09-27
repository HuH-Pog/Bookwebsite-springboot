import './ResultCard.css'

export default function ResultCard({ studentInfo, result }) {
  const {
    totalMarks,
    maxTotal,
    percentage,
    subjectsPassed,
    rows,
    overallResult,
    sgpa,
    classification,
  } = result

  const handlePrint = () => window.print()

  // Generate a deterministic serial based on PRN or timestamp
  const serialNumber = `APX-${(studentInfo.prn || '000000').slice(-6)}-${(studentInfo.semester || 'S')}`

  return (
    <div className="transcript-section">
      <div id="print-result" className="card transcript-card">
        {/* Holographic Watermark effect */}
        <div className="transcript-watermark" aria-hidden="true">
          APEXGRADE
        </div>

        {/* Certificate Header */}
        <div className="transcript-header">
          <div className="header-brand-block">
            <div className="seal-emblem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div>
              <span className="inst-eyebrow">OFFICIAL SEMESTER GRADE TRANSCRIPT</span>
              <h2 className="inst-title">Academic Evaluation Statement</h2>
              <span className="inst-sub">Weighted Evaluation Standard (30% MSE / 70% ESE)</span>
            </div>
          </div>

          <div className="header-doc-meta">
            <div className={`status-badge-stamp ${overallResult === 'PASS' ? 'stamp-pass' : 'stamp-fail'}`}>
              {overallResult}
            </div>
            <span className="doc-serial mono-val">{serialNumber}</span>
          </div>
        </div>

        {/* Candidate Credentials Box */}
        <div className="candidate-credentials-strip">
          <div className="credential-field">
            <span className="cred-lbl">Candidate Name</span>
            <strong className="cred-val">{studentInfo.name || '—'}</strong>
          </div>
          <div className="credential-field">
            <span className="cred-lbl">Registration PRN</span>
            <strong className="cred-val mono-val">{studentInfo.prn || '—'}</strong>
          </div>
          <div className="credential-field">
            <span className="cred-lbl">Department</span>
            <strong className="cred-val">{studentInfo.branch || '—'}</strong>
          </div>
          <div className="credential-field">
            <span className="cred-lbl">Semester & Session</span>
            <strong className="cred-val">
              {studentInfo.semester ? `Semester ${studentInfo.semester}` : '—'} ({studentInfo.year || '2026-27'})
            </strong>
          </div>
        </div>

        {/* Performance Metric Quadrant */}
        <div className="transcript-metrics-grid">
          <div className="t-metric">
            <span className="t-metric-label">Aggregate Percentage</span>
            <strong className="t-metric-val mono-val">{percentage}%</strong>
          </div>
          <div className="t-metric">
            <span className="t-metric-label">Cumulative SGPA</span>
            <strong className="t-metric-val mono-val">{sgpa} / 10</strong>
          </div>
          <div className="t-metric">
            <span className="t-metric-label">Total Scaled Marks</span>
            <strong className="t-metric-val mono-val">
              {totalMarks} / {maxTotal}
            </strong>
          </div>
          <div className="t-metric">
            <span className="t-metric-label">Academic Classification</span>
            <strong className="t-metric-val class-val">{classification}</strong>
          </div>
        </div>

        {/* Course Grades Table */}
        <div className="transcript-table-wrap">
          <table className="transcript-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Mid-Sem (30%)</th>
                <th>End-Sem (70%)</th>
                <th>Scaled Score</th>
                <th>Grade Pts</th>
                <th>Final Grade</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="t-course-name">{r.name}</td>
                  <td className="mono-val">{r.mse} <small>({r.mseWeighted})</small></td>
                  <td className="mono-val">{r.ese} <small>({r.eseWeighted})</small></td>
                  <td className="mono-val bold-score">{r.finalMarks} / 100</td>
                  <td className="mono-val">{r.gradePoints}</td>
                  <td>
                    <span className={`t-grade-pill grade-${r.grade.replace('+', 'plus')}`}>
                      {r.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Transcript Security & Validation Footer */}
        <div className="transcript-footer">
          <div className="security-qr-mock">
            <svg className="qr-svg" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="#0c1226" />
              <rect x="10" y="10" width="30" height="30" fill="#ffffff" />
              <rect x="16" y="16" width="18" height="18" fill="#0c1226" />
              <rect x="20" y="20" width="10" height="10" fill="#ffffff" />
              <rect x="60" y="10" width="30" height="30" fill="#ffffff" />
              <rect x="66" y="16" width="18" height="18" fill="#0c1226" />
              <rect x="70" y="20" width="10" height="10" fill="#ffffff" />
              <rect x="10" y="60" width="30" height="30" fill="#ffffff" />
              <rect x="16" y="66" width="18" height="18" fill="#0c1226" />
              <rect x="20" y="70" width="10" height="10" fill="#ffffff" />
              <rect x="50" y="50" width="15" height="15" fill="#38bdf8" />
              <rect x="70" y="60" width="20" height="10" fill="#ffffff" />
              <rect x="60" y="75" width="10" height="15" fill="#ffffff" />
              <rect x="75" y="80" width="15" height="10" fill="#ffffff" />
            </svg>
            <div className="qr-caption">
              <span>DIGITAL CERTIFICATE</span>
              <span className="mono-val">SECURE-VERIFIED</span>
            </div>
          </div>

          <div className="security-notes">
            <p className="transcript-note">
              This statement certifies the performance calculated via ApexGrade Evaluation Engine
              implementing a 30% Continuous Assessment / 70% End-Semester weighted curriculum.
            </p>
            <span className="date-stamp">Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <div className="signature-block">
            <div className="sig-line" />
            <span className="sig-title">Controller of Examinations</span>
            <span className="sig-sub">Digital Verification Seal</span>
          </div>
        </div>
      </div>

      <div className="transcript-actions no-print">
        <button className="btn btn-primary print-action-btn" onClick={handlePrint}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span>Print / Export Official Transcript</span>
        </button>
      </div>
    </div>
  )
}
