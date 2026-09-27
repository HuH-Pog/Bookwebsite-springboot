import './ResultTable.css'

export default function ResultTable({ rows }) {
  return (
    <div className="card result-table-wrap">
      <div className="section-heading">
        <div className="table-heading-row">
          <div>
            <span className="eyebrow">DETAILED TRANSCRIPT</span>
            <h2>Course-Wise Assessment Breakdown</h2>
            <p>Component-level analysis including scaled weightages and assigned academic grade points.</p>
          </div>
          <div className="table-stats-badge mono-val">
            {rows.length} Courses Computed
          </div>
        </div>
      </div>

      <div className="table-scroll-container">
        <table className="result-table">
          <thead>
            <tr>
              <th>Course Subject</th>
              <th>Mid-Sem (30%)</th>
              <th>End-Sem (70%)</th>
              <th>Final Score</th>
              <th>Grade Pts</th>
              <th>Letter Grade</th>
              <th>Clearance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.id}>
                <td data-label="Course Subject" className="subject-col">
                  <div className="subject-cell">
                    <span className="subject-row-idx mono-val">0{idx + 1}</span>
                    <strong className="subject-cell-name">{r.name}</strong>
                  </div>
                </td>

                <td data-label="Mid-Sem (30%)" className="mono-val">
                  <div className="weight-cell">
                    <span>{r.mse} <small>/30</small></span>
                    <span className="scaled-tag">scaled: {r.mseWeighted}</span>
                  </div>
                </td>

                <td data-label="End-Sem (70%)" className="mono-val">
                  <div className="weight-cell">
                    <span>{r.ese} <small>/70</small></span>
                    <span className="scaled-tag">scaled: {r.eseWeighted}</span>
                  </div>
                </td>

                <td data-label="Final Score" className="mono-val score-col">
                  <span className="final-mark-strong">{r.finalMarks}</span>
                  <small className="final-max">/ 100</small>
                </td>

                <td data-label="Grade Pts" className="mono-val">
                  <span className="points-cell">{r.gradePoints} pts</span>
                </td>

                <td data-label="Letter Grade">
                  <span className={`grade-pill grade-${r.grade.replace('+', 'plus')}`}>
                    {r.grade}
                  </span>
                </td>

                <td data-label="Clearance">
                  <span className={`status-pill ${r.status === 'PASS' ? 'status-pass' : 'status-fail'}`}>
                    <span className="status-indicator-dot" />
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
