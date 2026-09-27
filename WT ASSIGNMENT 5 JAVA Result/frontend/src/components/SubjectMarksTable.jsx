import React from 'react'
import { BookMarked, Plus, Trash2, AlertCircle, Info } from 'lucide-react'

function calculatePreviewGrade(total) {
  if (isNaN(total) || total === null || total === undefined) return null
  if (total >= 90) return { grade: 'O', badge: 'grade-O' }
  if (total >= 80) return { grade: 'A+', badge: 'grade-Aplus' }
  if (total >= 70) return { grade: 'A', badge: 'grade-A' }
  if (total >= 60) return { grade: 'B+', badge: 'grade-Bplus' }
  if (total >= 50) return { grade: 'B', badge: 'grade-B' }
  if (total >= 40) return { grade: 'C', badge: 'grade-C' }
  return { grade: 'F', badge: 'grade-F' }
}

function SubjectMarksTable({ subjects, onChange, errors }) {
  const handleMarksChange = (index, field, value) => {
    const updated = [...subjects]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleAddSubject = () => {
    const newSubNum = subjects.length + 1
    onChange([
      ...subjects,
      {
        subjectCode: `ELEC${newSubNum}`,
        subjectName: `Elective Course ${newSubNum}`,
        credits: 3,
        mse: '',
        ese: '',
      },
    ])
  }

  const handleRemoveSubject = (index) => {
    if (subjects.length <= 1) return
    const updated = subjects.filter((_, i) => i !== index)
    onChange(updated)
  }

  const totalCredits = subjects.reduce((sum, s) => sum + (Number(s.credits) || 0), 0)

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <BookMarked className="card-title-icon" size={20} />
          <div>
            <h2 className="card-title">Curriculum & Subject Marks</h2>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="card-badge">Total Credits: {totalCredits}</span>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handleAddSubject}
            title="Add an elective or laboratory subject"
          >
            <Plus size={14} /> Add Subject
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', marginBottom: 16, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
        <Info size={15} color="var(--primary-600)" />
        <span>MSE is evaluated out of <strong>30</strong> marks. ESE is evaluated out of <strong>70</strong> marks. Total = 100.</span>
      </div>

      <div className="table-responsive">
        <table className="modern-table">
          <thead>
            <tr>
              <th style={{ width: '35%' }}>Course / Subject</th>
              <th style={{ width: '10%' }}>Credits</th>
              <th style={{ width: '18%' }}>MSE (Max 30)</th>
              <th style={{ width: '18%' }}>ESE (Max 70)</th>
              <th style={{ width: '14%' }}>Live Preview</th>
              {subjects.length > 1 && <th style={{ width: '5%' }}></th>}
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => {
              const mseNum = subject.mse !== '' ? Number(subject.mse) : null
              const eseNum = subject.ese !== '' ? Number(subject.ese) : null
              const hasMarks = mseNum !== null || eseNum !== null
              const combinedTotal = (mseNum || 0) + (eseNum || 0)
              const preview = hasMarks ? calculatePreviewGrade(combinedTotal) : null

              return (
                <tr key={index}>
                  <td className="subject-cell">
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '6px 10px', fontSize: '0.88rem', fontWeight: 600, marginBottom: 4 }}
                      value={subject.subjectName}
                      onChange={(e) => handleMarksChange(index, 'subjectName', e.target.value)}
                      placeholder="Course Title"
                    />
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '4px 8px', fontSize: '0.75rem', width: 110, fontFamily: 'var(--font-mono)' }}
                      value={subject.subjectCode}
                      onChange={(e) => handleMarksChange(index, 'subjectCode', e.target.value)}
                      placeholder="Code (e.g. CS301)"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="table-input"
                      style={{ width: 60 }}
                      value={subject.credits}
                      onChange={(e) => handleMarksChange(index, 'credits', e.target.value)}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      step="any"
                      placeholder="0–30"
                      className={`table-input ${errors[`subject-${index}-mse`] ? 'has-error' : ''}`}
                      value={subject.mse}
                      onChange={(e) => handleMarksChange(index, 'mse', e.target.value)}
                    />
                    {errors[`subject-${index}-mse`] && (
                      <div className="field-error-message" style={{ justifyContent: 'center' }}>
                        <AlertCircle size={11} />
                        {errors[`subject-${index}-mse`]}
                      </div>
                    )}
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="70"
                      step="any"
                      placeholder="0–70"
                      className={`table-input ${errors[`subject-${index}-ese`] ? 'has-error' : ''}`}
                      value={subject.ese}
                      onChange={(e) => handleMarksChange(index, 'ese', e.target.value)}
                    />
                    {errors[`subject-${index}-ese`] && (
                      <div className="field-error-message" style={{ justifyContent: 'center' }}>
                        <AlertCircle size={11} />
                        {errors[`subject-${index}-ese`]}
                      </div>
                    )}
                  </td>

                  <td>
                    {preview ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem' }}>
                          {combinedTotal}/100
                        </span>
                        <span className={`grade-badge ${preview.badge}`} style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                          {preview.grade}
                        </span>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                    )}
                  </td>

                  {subjects.length > 1 && (
                    <td>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(index)}
                        className="btn btn-danger-outline btn-sm"
                        style={{ padding: '6px 8px', borderRadius: 'var(--radius-sm)' }}
                        title="Remove Subject"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SubjectMarksTable
