import React from 'react'

function ResultTable({ subjects }) {
  const totalCredits = subjects.reduce((sum, s) => sum + (Number(s.credits) || 0), 0)
  const totalMSE = subjects.reduce((sum, s) => sum + (Number(s.mseMarks) || 0), 0)
  const totalESE = subjects.reduce((sum, s) => sum + (Number(s.eseMarks) || 0), 0)
  const totalFinal = subjects.reduce((sum, s) => sum + (Number(s.finalMarks) || 0), 0)

  return (
    <div className="table-responsive" style={{ margin: '24px 0' }}>
      <table className="modern-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Credits</th>
            <th>MSE (30)</th>
            <th>ESE (70)</th>
            <th>Total Marks</th>
            <th>Letter Grade</th>
            <th>Grade Point</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.subjectCode || subject.id}>
              <td>
                <span className="subject-code-tag">{subject.subjectCode}</span>
              </td>
              <td className="subject-cell">
                <span className="subject-name">{subject.subjectName}</span>
              </td>
              <td style={{ fontWeight: 600 }}>{subject.credits}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{subject.mseMarks}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{subject.eseMarks}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {subject.finalMarks}
              </td>
              <td>
                <span className={`grade-badge grade-${subject.grade.replace('+', 'plus')}`}>
                  {subject.grade}
                </span>
              </td>
              <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {subject.gradePoint}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ background: 'var(--bg-muted)', fontWeight: 700 }}>
            <td colSpan={2} style={{ textAlign: 'left', paddingLeft: 16 }}>
              Total Aggregate
            </td>
            <td>{totalCredits}</td>
            <td style={{ fontFamily: 'var(--font-mono)' }}>{totalMSE}</td>
            <td style={{ fontFamily: 'var(--font-mono)' }}>{totalESE}</td>
            <td style={{ fontFamily: 'var(--font-mono)' }}>{totalFinal}</td>
            <td colSpan={2} style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Scale of 10.0
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default ResultTable
