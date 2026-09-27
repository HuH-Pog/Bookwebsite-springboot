import SubjectCard from './SubjectCard.jsx'
import './MarksInput.css'

export default function MarksInput({ subjects, errors, onNameChange, onMarksChange }) {
  return (
    <div className="marks-input-section">
      <div className="section-heading">
        <div className="heading-row">
          <div>
            <span className="eyebrow">STEP 02 · COURSE EVALUATION</span>
            <h2>Subject Assessment Matrix</h2>
            <p>
              Input Mid-Semester Examination (out of 30) and End-Semester Examination (out of 70)
              marks for your curriculum coursework.
            </p>
          </div>
          <div className="weight-legend-badge">
            <span className="legend-item">
              <span className="legend-chip mse" /> MSE (30%)
            </span>
            <span className="legend-divider">+</span>
            <span className="legend-item">
              <span className="legend-chip ese" /> ESE (70%)
            </span>
          </div>
        </div>
      </div>

      <div className="subject-grid">
        {subjects.map((subject, index) => (
          <SubjectCard
            key={subject.id}
            index={index}
            subject={subject}
            errors={errors[subject.id] || {}}
            onNameChange={onNameChange}
            onMarksChange={onMarksChange}
          />
        ))}
      </div>
    </div>
  )
}
