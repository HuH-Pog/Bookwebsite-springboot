import './StudentForm.css'

const BRANCHES = [
  'Computer Science & Engineering',
  'Artificial Intelligence & Data Science',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil & Environmental Engineering',
]

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]

export default function StudentForm({ info, errors, onChange }) {
  const handle = (field) => (e) => onChange(field, e.target.value)

  return (
    <div className="card student-form-card">
      <div className="section-heading">
        <span className="eyebrow">STEP 01 · CANDIDATE PROFILE</span>
        <h2>Student Credentials & Enrollment</h2>
        <p>Specify the candidate information registered in the official academic registry.</p>
      </div>

      <div className="student-form-grid">
        <div className="field">
          <label htmlFor="name">
            <span>Candidate Full Name</span>
            <span className="required-star">*</span>
          </label>
          <div className="input-wrap">
            <input
              id="name"
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={info.name}
              onChange={handle('name')}
              className={errors.name ? 'has-error' : ''}
              autoComplete="name"
            />
          </div>
          {errors.name && <span className="error-msg">⚠ {errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="prn">
            <span>PRN / Roll Number</span>
            <span className="required-star">*</span>
          </label>
          <div className="input-wrap">
            <input
              id="prn"
              type="text"
              placeholder="e.g. 12210452"
              value={info.prn}
              onChange={handle('prn')}
              className={errors.prn ? 'has-error' : ''}
            />
          </div>
          {errors.prn && <span className="error-msg">⚠ {errors.prn}</span>}
        </div>

        <div className="field">
          <label htmlFor="branch">
            <span>Department / Branch</span>
            <span className="required-star">*</span>
          </label>
          <div className="input-wrap">
            <select
              id="branch"
              value={info.branch}
              onChange={handle('branch')}
              className={errors.branch ? 'has-error' : ''}
            >
              <option value="">Select Department</option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          {errors.branch && <span className="error-msg">⚠ {errors.branch}</span>}
        </div>

        <div className="field">
          <label htmlFor="semester">
            <span>Semester Level</span>
            <span className="required-star">*</span>
          </label>
          <div className="input-wrap">
            <select
              id="semester"
              value={info.semester}
              onChange={handle('semester')}
              className={errors.semester ? 'has-error' : ''}
            >
              <option value="">Select Semester</option>
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>
          {errors.semester && <span className="error-msg">⚠ {errors.semester}</span>}
        </div>

        <div className="field">
          <label htmlFor="year">
            <span>Academic Session</span>
            <span className="required-star">*</span>
          </label>
          <div className="input-wrap">
            <input
              id="year"
              type="text"
              placeholder="e.g. 2026-2027"
              value={info.year}
              onChange={handle('year')}
              className={errors.year ? 'has-error' : ''}
            />
          </div>
          {errors.year && <span className="error-msg">⚠ {errors.year}</span>}
        </div>
      </div>
    </div>
  )
}
