import { useEffect, useState } from 'react'
import './PerformanceChart.css'

export default function PerformanceChart({ rows }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 80)
    return () => clearTimeout(t)
  }, [rows])

  return (
    <div className="card performance-chart-card">
      <div className="section-heading">
        <div className="chart-heading-row">
          <div>
            <span className="eyebrow">SCORE VISUALIZATION</span>
            <h2>Component Performance Breakdown</h2>
            <p>Weighted composition showing Mid-Semester vs End-Semester marks against the 40-pt passing benchmark.</p>
          </div>

          <div className="chart-legend-box">
            <span className="chart-legend-item">
              <span className="legend-dot mse-dot" /> MSE (Max 30)
            </span>
            <span className="chart-legend-item">
              <span className="legend-dot ese-dot" /> ESE (Max 70)
            </span>
            <span className="chart-legend-item">
              <span className="legend-line pass-mark-dot" /> Pass Benchmark (40)
            </span>
          </div>
        </div>
      </div>

      <div className="chart-bars-wrap">
        {rows.map((r) => {
          const isPass = r.status === 'PASS'
          return (
            <div className="chart-bar-item" key={r.id}>
              <div className="bar-info-row">
                <div className="bar-title-group">
                  <span className="bar-course-name">{r.name}</span>
                  <span className={`bar-status-tag ${isPass ? 'pass' : 'fail'}`}>
                    {r.status}
                  </span>
                </div>
                <div className="bar-score-group">
                  <span className="bar-breakdown mono-val">
                    MSE: {r.mseWeighted} + ESE: {r.eseWeighted}
                  </span>
                  <span className="bar-total-val mono-val">
                    {r.finalMarks}%
                  </span>
                </div>
              </div>

              {/* Progress Bar Container with 40-mark benchmark line */}
              <div className="bar-track-outer">
                <div className="benchmark-line" title="Passing threshold: 40 points" />

                <div className="bar-stacked-track">
                  {/* MSE Segment */}
                  <div
                    className="bar-seg seg-mse"
                    style={{
                      width: animate ? `${r.mseWeighted}%` : '0%',
                    }}
                    title={`MSE Component: ${r.mseWeighted} points`}
                  />
                  {/* ESE Segment */}
                  <div
                    className={`bar-seg seg-ese ${isPass ? 'ese-pass' : 'ese-fail'}`}
                    style={{
                      width: animate ? `${r.eseWeighted}%` : '0%',
                    }}
                    title={`ESE Component: ${r.eseWeighted} points`}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
