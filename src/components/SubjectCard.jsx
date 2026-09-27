import { MSE_MAX, ESE_MAX, calculateFinalMarks, getGrade, getSubjectStatus } from '../utils/gradeCalculator'
import './SubjectCard.css'

export default function SubjectCard({ index, subject, errors, onNameChange, onMarksChange }) {
  const hasBoth = subject.mse !== '' && subject.ese !== ''
  const liveFinal = hasBoth ? calculateFinalMarks(subject.mse, subject.ese) : null
  const liveGrade = liveFinal !== null ? getGrade(liveFinal) : null
  const liveStatus = liveFinal !== null ? getSubjectStatus(liveFinal) : null

  // Calculate percentage of max for progress indicators
  const msePct = subject.mse ? Math.min((Number(subject.mse) / MSE_MAX) * 100, 100) : 0
  const esePct = subject.ese ? Math.min((Number(subject.ese) / ESE_MAX) * 100, 100) : 0

  const setMaxMse = () => onMarksChange(subject.id, 'mse', String(MSE_MAX))
  const setMaxEse = () => onMarksChange(subject.id, 'ese', String(ESE_MAX))

  return (
    <div className={`card subject-card ${liveStatus === 'FAIL' ? 'is-failing-card' : ''}`}>
      <div className="subject-card-head">
        <div className="head-left">
          <span className="subject-index-badge mono-val">#{String(index + 1).padStart(2, '0')}</span>
          <div className="subject-name-wrap">
            <label className="sr-only" htmlFor={`sub-name-${subject.id}`}>Subject Title</label>
            <input
              id={`sub-name-${subject.id}`}
              className="subject-name-input"
              type="text"
              value={subject.name}
              onChange={(e) => onNameChange(subject.id, e.target.value)}
              placeholder={`Course ${index + 1} Name`}
            />
          </div>
        </div>

        {liveFinal !== null && (
          <div className="live-feedback-pill">
            <span className="live-score mono-val">{liveFinal} pts</span>
            <span className={`live-grade grade-tag-${liveGrade.replace('+', 'plus')}`}>{liveGrade}</span>
          </div>
        )}
      </div>

      <div className="subject-inputs-grid">
        {/* MSE Input */}
        <div className="field">
          <div className="field-label-row">
            <label htmlFor={`mse-${subject.id}`}>Mid-Sem (MSE)</label>
            <div className="field-action-tags">
              <span className="field-max-badge mono-val">Max {MSE_MAX}</span>
              <button type="button" className="btn-quick-max" onClick={setMaxMse} title="Set full marks">
                Full
              </button>
            </div>
          </div>
          <div className="input-with-subtext">
            <input
              id={`mse-${subject.id}`}
              type="number"
              min="0"
              max={MSE_MAX}
              placeholder={`0 - ${MSE_MAX}`}
              value={subject.mse}
              onChange={(e) => onMarksChange(subject.id, 'mse', e.target.value)}
              className={errors.mse ? 'has-error' : ''}
            />
            <span className="weight-tag">30% weight</span>
          </div>
          {errors.mse && <span className="error-msg">⚠ {errors.mse}</span>}
        </div>

        {/* ESE Input */}
        <div className="field">
          <div className="field-label-row">
            <label htmlFor={`ese-${subject.id}`}>End-Sem (ESE)</label>
            <div className="field-action-tags">
              <span className="field-max-badge mono-val">Max {ESE_MAX}</span>
              <button type="button" className="btn-quick-max" onClick={setMaxEse} title="Set full marks">
                Full
              </button>
            </div>
          </div>
          <div className="input-with-subtext">
            <input
              id={`ese-${subject.id}`}
              type="number"
              min="0"
              max={ESE_MAX}
              placeholder={`0 - ${ESE_MAX}`}
              value={subject.ese}
              onChange={(e) => onMarksChange(subject.id, 'ese', e.target.value)}
              className={errors.ese ? 'has-error' : ''}
            />
            <span className="weight-tag">70% weight</span>
          </div>
          {errors.ese && <span className="error-msg">⚠ {errors.ese}</span>}
        </div>
      </div>

      {/* Real-time component gauge */}
      <div className="subject-meter">
        <div className="meter-labels">
          <span>MSE Filled: {subject.mse || 0}/{MSE_MAX}</span>
          <span>ESE Filled: {subject.ese || 0}/{ESE_MAX}</span>
        </div>
        <div className="dual-track">
          <div className="meter-segment mse-segment" style={{ width: `${(msePct * 0.3).toFixed(1)}%` }} />
          <div className="meter-segment ese-segment" style={{ width: `${(esePct * 0.7).toFixed(1)}%` }} />
        </div>
      </div>
    </div>
  )
}
