import React from 'react'
import { Award, CheckCircle, X } from 'lucide-react'

function GradeScaleModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const gradeRules = [
    { range: '90 – 100', grade: 'O', point: 10, desc: 'Outstanding', badgeClass: 'grade-O' },
    { range: '80 – 89', grade: 'A+', point: 9, desc: 'Excellent', badgeClass: 'grade-Aplus' },
    { range: '70 – 79', grade: 'A', point: 8, desc: 'Very Good', badgeClass: 'grade-A' },
    { range: '60 – 69', grade: 'B+', point: 7, desc: 'Good', badgeClass: 'grade-Bplus' },
    { range: '50 – 59', grade: 'B', point: 6, desc: 'Above Average', badgeClass: 'grade-B' },
    { range: '40 – 49', grade: 'C', point: 5, desc: 'Average / Pass', badgeClass: 'grade-C' },
    { range: 'Below 40', grade: 'F', point: 0, desc: 'Fail', badgeClass: 'grade-F' },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div className="card-title-group">
            <Award className="card-title-icon" size={24} />
            <h2 className="card-title">University Grading Policy & Scale</h2>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '50%', width: 32, height: 32, padding: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '12px 0 20px' }}>
          Official academic evaluation standard for weighted marks, letter grades, and CGPA computation.
        </p>

        <div className="table-responsive" style={{ marginBottom: 20 }}>
          <table className="modern-table">
            <thead>
              <tr>
                <th>Marks Range</th>
                <th>Letter Grade</th>
                <th>Grade Point</th>
                <th>Academic Performance</th>
              </tr>
            </thead>
            <tbody>
              {gradeRules.map((r) => (
                <tr key={r.grade}>
                  <td style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{r.range}</td>
                  <td>
                    <span className={`grade-badge ${r.badgeClass}`}>{r.grade}</span>
                  </td>
                  <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{r.point}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'var(--bg-muted)', padding: '16px', borderRadius: 'var(--radius-md)', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontWeight: 700, color: 'var(--text-main)' }}>
            <CheckCircle size={16} color="var(--color-success)" />
            <span>Calculation Formula:</span>
          </div>
          <ul style={{ paddingLeft: 22, lineHeight: 1.6 }}>
            <li><strong>Final Marks:</strong> MSE (out of 30) + ESE (out of 70) = Total (100)</li>
            <li><strong>CGPA:</strong> &Sigma;(Subject Credit &times; Grade Point) / &Sigma;(Total Credits)</li>
            <li><strong>Standing:</strong> Any subject with grade &apos;F&apos; results in overall semester <strong>FAIL</strong>.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <button className="btn btn-primary" onClick={onClose}>
            Close Reference
          </button>
        </div>
      </div>
    </div>
  )
}

export default GradeScaleModal
