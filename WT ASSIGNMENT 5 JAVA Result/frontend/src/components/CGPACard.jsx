import React from 'react'
import { Sparkles, Trophy } from 'lucide-react'

function getAcademicStanding(cgpa) {
  if (cgpa >= 8.5) return 'First Class with Distinction'
  if (cgpa >= 7.0) return 'First Class'
  if (cgpa >= 6.0) return 'Second Class'
  if (cgpa >= 5.0) return 'Pass Division'
  return 'Remedial / Under Performance'
}

function CGPACard({ cgpa }) {
  const numericCGPA = Number(cgpa) || 0
  const standing = getAcademicStanding(numericCGPA)

  return (
    <div className="cgpa-grand-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <Trophy size={16} color="#38bdf8" />
        <span className="cgpa-title">Semester CGPA Score</span>
      </div>

      <div className="cgpa-score-display">{numericCGPA.toFixed(2)}</div>

      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: 12 }}>
        Scale of 10.00 Credit Points
      </div>

      <div className="cgpa-standing">
        <Sparkles size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'text-bottom' }} />
        {standing}
      </div>
    </div>
  )
}

export default CGPACard
