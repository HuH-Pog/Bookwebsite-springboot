import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Calculator, Sparkles, RotateCcw, AlertTriangle, ArrowRight, Loader2, BookOpen } from 'lucide-react'
import StudentForm from '../components/StudentForm.jsx'
import SubjectMarksTable from '../components/SubjectMarksTable.jsx'
import { createResult } from '../services/resultService.js'

const DEFAULT_SUBJECTS = [
  { subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', credits: 4, mse: '', ese: '' },
  { subjectCode: 'CS302', subjectName: 'Database Management Systems', credits: 4, mse: '', ese: '' },
  { subjectCode: 'CS303', subjectName: 'Computer Networks & Protocols', credits: 3, mse: '', ese: '' },
  { subjectCode: 'CS304', subjectName: 'Operating Systems & Architecture', credits: 3, mse: '', ese: '' },
]

function CalculateResult({ onOpenGradeScale }) {
  const navigate = useNavigate()

  const [student, setStudent] = useState({
    studentName: '',
    prn: '',
    branch: '',
    semester: '',
    academicYear: '',
  })

  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleQuickDemoFill = () => {
    setStudent({
      studentName: 'Aarav Sharma',
      prn: '2024BCSE042',
      branch: 'Computer Science & Engineering',
      semester: 'Semester V',
      academicYear: '2026-2027',
    })

    setSubjects([
      { subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', credits: 4, mse: '27', ese: '64' },
      { subjectCode: 'CS302', subjectName: 'Database Management Systems', credits: 4, mse: '25', ese: '59' },
      { subjectCode: 'CS303', subjectName: 'Computer Networks & Protocols', credits: 3, mse: '28', ese: '62' },
      { subjectCode: 'CS304', subjectName: 'Operating Systems & Architecture', credits: 3, mse: '24', ese: '56' },
    ])

    setErrors({})
    setServerError('')
  }

  const handleReset = () => {
    setStudent({
      studentName: '',
      prn: '',
      branch: '',
      semester: '',
      academicYear: '',
    })
    setSubjects(DEFAULT_SUBJECTS)
    setErrors({})
    setServerError('')
  }

  const validate = () => {
    const newErrors = {}

    if (!student.studentName.trim()) newErrors.studentName = "Please enter student's full name."
    if (!student.prn.trim()) newErrors.prn = 'Please provide a valid PRN / Roll number.'
    if (!student.branch.trim()) newErrors.branch = 'Please specify the academic branch.'
    if (!student.semester.trim()) newErrors.semester = 'Please enter semester.'
    if (!student.academicYear.trim()) newErrors.academicYear = 'Please enter academic year.'

    subjects.forEach((subject, index) => {
      const mseVal = subject.mse
      const eseVal = subject.ese

      if (mseVal === '' || mseVal === null || isNaN(mseVal)) {
        newErrors[`subject-${index}-mse`] = 'Enter MSE marks.'
      } else if (Number(mseVal) < 0 || Number(mseVal) > 30) {
        newErrors[`subject-${index}-mse`] = 'MSE must be 0–30.'
      }

      if (eseVal === '' || eseVal === null || isNaN(eseVal)) {
        newErrors[`subject-${index}-ese`] = 'Enter ESE marks.'
      } else if (Number(eseVal) < 0 || Number(eseVal) > 70) {
        newErrors[`subject-${index}-ese`] = 'ESE must be 0–70.'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    if (!validate()) {
      return
    }

    const payload = {
      studentName: student.studentName.trim(),
      prn: student.prn.trim(),
      branch: student.branch.trim(),
      semester: student.semester.trim(),
      academicYear: student.academicYear.trim(),
      subjects: subjects.map((s) => ({
        subjectCode: s.subjectCode.trim(),
        subjectName: s.subjectName.trim(),
        credits: Number(s.credits) || 3,
        mse: Number(s.mse),
        ese: Number(s.ese),
      })),
    }

    try {
      setIsSubmitting(true)
      const result = await createResult(payload)
      navigate(`/result/${result.id}`)
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data
        if (data.fieldErrors) {
          setServerError('Please resolve the highlighted field errors and submit again.')
        } else {
          setServerError(data.message || 'Error occurred while processing result with backend server.')
        }
      } else {
        setServerError('Unable to reach backend API at http://localhost:8080. Ensure the Spring Boot backend server is running.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title">Semester Result Evaluation Engine</h1>
          <p className="page-subtitle">
            Enter student credentials and examination marks to compute official grades, credit-weighted score, and semester CGPA.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleQuickDemoFill}
            title="Populate test student information and marks"
          >
            <Sparkles size={14} color="var(--primary-600)" />
            Quick Fill Demo Data
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handleReset}
            title="Clear all fields"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onOpenGradeScale}
          >
            <BookOpen size={14} />
            Grading Scale
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <StudentForm student={student} onChange={setStudent} errors={errors} />
        <SubjectMarksTable subjects={subjects} onChange={setSubjects} errors={errors} />

        {serverError && (
          <div className="alert alert-error">
            <AlertTriangle size={18} />
            <div>
              <strong>Calculation Failed: </strong>
              <span>{serverError}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, flexWrap: 'wrap', gap: 12 }}>
          <Link to="/" className="btn btn-outline">
            ← Cancel & Back to Home
          </Link>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                Computing Official Grades...
              </>
            ) : (
              <>
                <Calculator size={18} />
                Calculate & Save Semester Result
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  )
}

export default CalculateResult
