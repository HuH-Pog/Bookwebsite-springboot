import React from 'react'
import { Award, CheckCircle2, XCircle, TrendingUp, BookCheck, Percent } from 'lucide-react'

function ResultSummary({ result }) {
  const { totalCredits, totalMarks, subjects, percentage, resultStatus } = result
  const maxTotalMarks = subjects.length * 100
  const isPass = resultStatus === 'PASS'

  return (
    <div className="summary-stat-box">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <TrendingUp size={20} color="var(--primary-600)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Academic Performance Summary</h3>
        </div>

        <div className="summary-rows">
          <div className="summary-metric-row">
            <span className="summary-metric-label">
              <BookCheck size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
              Registered Credits
            </span>
            <span className="summary-metric-val">{totalCredits} Credits</span>
          </div>

          <div className="summary-metric-row">
            <span className="summary-metric-label">
              <Award size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
              Total Marks Obtained
            </span>
            <span className="summary-metric-val">
              {totalMarks} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/ {maxTotalMarks}</span>
            </span>
          </div>

          <div className="summary-metric-row">
            <span className="summary-metric-label">
              <Percent size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
              Overall Percentage
            </span>
            <span className="summary-metric-val">{Number(percentage).toFixed(2)}%</span>
          </div>

          <div className="summary-metric-row" style={{ borderBottom: 'none' }}>
            <span className="summary-metric-label">Semester Standing</span>
            <span className={`status-badge ${isPass ? 'status-pass' : 'status-fail'}`}>
              {isPass ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
              {resultStatus}
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6 }}>
          <span>Overall Percentage Progress</span>
          <span style={{ fontWeight: 700 }}>{Number(percentage).toFixed(1)}%</span>
        </div>
        <div style={{ height: 8, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, percentage))}%`,
              background: isPass
                ? 'linear-gradient(90deg, var(--primary-600), var(--color-success))'
                : 'linear-gradient(90deg, var(--color-danger), #f87171)',
              borderRadius: 4,
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ResultSummary
