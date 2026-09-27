import { useEffect, useState } from 'react'
import './ResultSummary.css'

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame
    const start = performance.now()
    const from = 0

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(from + (target - from) * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

export default function ResultSummary({ result }) {
  const {
    totalMarks,
    maxTotal,
    percentage,
    subjectsPassed,
    rows,
    overallResult,
    sgpa,
    classification,
    topSubject,
  } = result

  const totalAnim = useCountUp(totalMarks)
  const percentAnim = useCountUp(percentage)
  const sgpaAnim = useCountUp(sgpa || 0)
  const isPass = overallResult === 'PASS'

  return (
    <div className="bento-summary-grid">
      {/* 1. Main Status & Standing Bento Card */}
      <div className={`card bento-card bento-hero-status ${isPass ? 'status-pass' : 'status-fail'}`}>
        <div className="bento-card-top">
          <span className="bento-label">SEMESTER VERDICT</span>
          <span className="bento-chip mono-val">OFFICIAL OUTCOME</span>
        </div>

        <div className="status-hero-row">
          <div className="status-badge-glow">
            <span className="status-verdict mono-val">{overallResult}</span>
          </div>

          <div className="status-subtext">
            <span className="standing-title">{classification}</span>
            <span className="standing-meta">
              {isPass
                ? `All ${rows.length} curricular courses successfully cleared`
                : `${rows.length - subjectsPassed} course(s) require re-examination`}
            </span>
          </div>
        </div>

        <div className="status-footer-progress">
          <div className="status-bar-track">
            <div
              className={`status-bar-fill ${isPass ? 'fill-emerald' : 'fill-rose'}`}
              style={{ width: `${(subjectsPassed / rows.length) * 100}%` }}
            />
          </div>
          <div className="status-bar-labels">
            <span>Clearance Progress</span>
            <span className="mono-val">
              {subjectsPassed} of {rows.length} Passed
            </span>
          </div>
        </div>
      </div>

      {/* 2. SGPA Card */}
      <div className="card bento-card bento-metric-card">
        <div className="bento-card-top">
          <span className="bento-label">ESTIMATED SGPA</span>
          <span className="metric-badge-blue">10.0 Scale</span>
        </div>
        <div className="metric-large-val mono-val">
          {sgpaAnim.toFixed(2)}
          <small className="metric-max">/ 10</small>
        </div>
        <div className="metric-sub-note">
          <span>Weighted Grade Point Average</span>
        </div>
      </div>

      {/* 3. Aggregate Percentage Card */}
      <div className="card bento-card bento-metric-card">
        <div className="bento-card-top">
          <span className="bento-label">AGGREGATE PERCENTAGE</span>
          <span className="metric-badge-cyan">30:70 Weighted</span>
        </div>
        <div className="metric-large-val mono-val text-gradient-cyan">
          {percentAnim.toFixed(2)}%
        </div>
        <div className="metric-sub-note">
          <span>Formula-based cumulative score</span>
        </div>
      </div>

      {/* 4. Total Marks Card */}
      <div className="card bento-card bento-metric-card">
        <div className="bento-card-top">
          <span className="bento-label">TOTAL ACCUMULATED</span>
          <span className="metric-badge-purple">4 Courses</span>
        </div>
        <div className="metric-large-val mono-val">
          {totalAnim.toFixed(0)}
          <small className="metric-max">/ {maxTotal}</small>
        </div>
        <div className="metric-sub-note">
          <span>Total scaled marks out of 400</span>
        </div>
      </div>

      {/* 5. Course Highlight Card */}
      <div className="card bento-card bento-metric-card bento-highlight">
        <div className="bento-card-top">
          <span className="bento-label">TOP PERFORMANCE</span>
          <span className="metric-badge-amber">★ Peak Course</span>
        </div>
        <div className="top-course-title">
          {topSubject?.name || 'N/A'}
        </div>
        <div className="top-course-metrics">
          <span className="top-score mono-val">{topSubject?.finalMarks} pts</span>
          <span className="top-grade-pill">Grade {topSubject?.grade}</span>
        </div>
      </div>
    </div>
  )
}
