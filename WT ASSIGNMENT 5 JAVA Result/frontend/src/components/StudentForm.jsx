import React from 'react'
import { User, Hash, GitBranch, Calendar, GraduationCap, AlertCircle } from 'lucide-react'

function StudentForm({ student, onChange, errors }) {
  const handleChange = (e) => {
    onChange({ ...student, [e.target.name]: e.target.value })
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <User className="card-title-icon" size={20} />
          <h2 className="card-title">Student Information</h2>
        </div>
        <span className="card-badge">Step 1 of 2</span>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="studentName">
            <User size={14} />
            Full Student Name
          </label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            className={`form-input ${errors.studentName ? 'has-error' : ''}`}
            placeholder="e.g. Alex Morgan"
            value={student.studentName}
            onChange={handleChange}
          />
          {errors.studentName && (
            <span className="field-error-message">
              <AlertCircle size={13} />
              {errors.studentName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="prn">
            <Hash size={14} />
            PRN / University Roll No.
          </label>
          <input
            id="prn"
            name="prn"
            type="text"
            className={`form-input ${errors.prn ? 'has-error' : ''}`}
            placeholder="e.g. 21BCE10452"
            value={student.prn}
            onChange={handleChange}
          />
          {errors.prn && (
            <span className="field-error-message">
              <AlertCircle size={13} />
              {errors.prn}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="branch">
            <GitBranch size={14} />
            Academic Branch / Specialization
          </label>
          <input
            id="branch"
            name="branch"
            type="text"
            className={`form-input ${errors.branch ? 'has-error' : ''}`}
            placeholder="e.g. Computer Science & Engineering"
            value={student.branch}
            onChange={handleChange}
          />
          {errors.branch && (
            <span className="field-error-message">
              <AlertCircle size={13} />
              {errors.branch}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="semester">
            <GraduationCap size={14} />
            Semester
          </label>
          <input
            id="semester"
            name="semester"
            type="text"
            className={`form-input ${errors.semester ? 'has-error' : ''}`}
            placeholder="e.g. V (Fifth)"
            value={student.semester}
            onChange={handleChange}
          />
          {errors.semester && (
            <span className="field-error-message">
              <AlertCircle size={13} />
              {errors.semester}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="academicYear">
            <Calendar size={14} />
            Academic Session / Year
          </label>
          <input
            id="academicYear"
            name="academicYear"
            type="text"
            className={`form-input ${errors.academicYear ? 'has-error' : ''}`}
            placeholder="e.g. 2026-2027"
            value={student.academicYear}
            onChange={handleChange}
          />
          {errors.academicYear && (
            <span className="field-error-message">
              <AlertCircle size={13} />
              {errors.academicYear}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentForm
