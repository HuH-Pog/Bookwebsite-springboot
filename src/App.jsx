import { useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StudentForm from './components/StudentForm.jsx'
import MarksInput from './components/MarksInput.jsx'
import ResultSummary from './components/ResultSummary.jsx'
import ResultTable from './components/ResultTable.jsx'
import PerformanceChart from './components/PerformanceChart.jsx'
import ResultCard from './components/ResultCard.jsx'
import Footer from './components/Footer.jsx'
import {
  computeResult,
  validateMarks,
  validateStudentInfo,
} from './utils/gradeCalculator.js'
import './App.css'

const DEFAULT_SUBJECTS = [
  { id: 'sub-1', name: 'Data Structures & Algorithms', mse: '', ese: '' },
  { id: 'sub-2', name: 'Database Management Systems', mse: '', ese: '' },
  { id: 'sub-3', name: 'Computer Networks & Security', mse: '', ese: '' },
  { id: 'sub-4', name: 'Operating Systems & Architecture', mse: '', ese: '' },
]

const DEFAULT_STUDENT_INFO = {
  name: '',
  prn: '',
  branch: '',
  semester: '',
  year: '2026-2027',
}

// Instant Pre-configured Profiles for testing
const SAMPLE_PRESETS = {
  distinction: {
    student: {
      name: 'Aarav Dev Sharma',
      prn: '12210452',
      branch: 'Computer Science & Engineering',
      semester: '4',
      year: '2026-2027',
    },
    subjects: [
      { id: 'sub-1', name: 'Data Structures & Algorithms', mse: '28', ese: '65' },
      { id: 'sub-2', name: 'Database Management Systems', mse: '27', ese: '62' },
      { id: 'sub-3', name: 'Computer Networks & Security', mse: '29', ese: '68' },
      { id: 'sub-4', name: 'Operating Systems & Architecture', mse: '26', ese: '60' },
    ],
  },
  firstclass: {
    student: {
      name: 'Priya Nandini Deshmukh',
      prn: '12210874',
      branch: 'Artificial Intelligence & Data Science',
      semester: '4',
      year: '2026-2027',
    },
    subjects: [
      { id: 'sub-1', name: 'Data Structures & Algorithms', mse: '22', ese: '52' },
      { id: 'sub-2', name: 'Database Management Systems', mse: '24', ese: '54' },
      { id: 'sub-3', name: 'Computer Networks & Security', mse: '20', ese: '48' },
      { id: 'sub-4', name: 'Operating Systems & Architecture', mse: '23', ese: '50' },
    ],
  },
  edge: {
    student: {
      name: 'Rohan Jayesh Kulkarni',
      prn: '12210998',
      branch: 'Information Technology',
      semester: '4',
      year: '2026-2027',
    },
    subjects: [
      { id: 'sub-1', name: 'Data Structures & Algorithms', mse: '14', ese: '30' },
      { id: 'sub-2', name: 'Database Management Systems', mse: '12', ese: '28' },
      { id: 'sub-3', name: 'Computer Networks & Security', mse: '15', ese: '32' },
      { id: 'sub-4', name: 'Operating Systems & Architecture', mse: '10', ese: '24' },
    ],
  },
}

export default function App() {
  const [studentInfo, setStudentInfo] = useState(DEFAULT_STUDENT_INFO)
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS)
  const [studentErrors, setStudentErrors] = useState({})
  const [subjectErrors, setSubjectErrors] = useState({})
  const [result, setResult] = useState(null)

  const calculatorRef = useRef(null)
  const resultRef = useRef(null)

  const handleStudentChange = (field, value) => {
    setStudentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubjectNameChange = (id, name) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)))
  }

  const handleMarksChange = (id, field, value) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToGrading = () => {
    document.getElementById('grading-standard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSelectPreset = (presetKey) => {
    const preset = SAMPLE_PRESETS[presetKey]
    if (!preset) return

    setStudentInfo(preset.student)
    setSubjects(preset.subjects)
    setStudentErrors({})
    setSubjectErrors({})

    const computed = computeResult(preset.subjects)
    setResult(computed)

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const handleCalculate = () => {
    const infoErrors = validateStudentInfo(studentInfo)
    const marksErrors = {}
    subjects.forEach((s) => {
      const errs = validateMarks(s.mse, s.ese)
      if (Object.keys(errs).length) marksErrors[s.id] = errs
    })

    setStudentErrors(infoErrors)
    setSubjectErrors(marksErrors)

    if (Object.keys(infoErrors).length || Object.keys(marksErrors).length) {
      setResult(null)
      return
    }

    const computed = computeResult(subjects)
    setResult(computed)

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleReset = () => {
    const confirmed = window.confirm('Reset all candidate parameters and assessment values?')
    if (!confirmed) return

    setStudentInfo(DEFAULT_STUDENT_INFO)
    setSubjects(DEFAULT_SUBJECTS.map((s) => ({ ...s, mse: '', ese: '' })))
    setStudentErrors({})
    setSubjectErrors({})
    setResult(null)
  }

  return (
    <div className="app-root">
      <Navbar onSelectPreset={handleSelectPreset} />

      <Hero
        onCalculate={scrollToCalculator}
        onViewGrading={scrollToGrading}
        onSelectPreset={handleSelectPreset}
      />

      <main id="calculator" ref={calculatorRef} className="app-shell main-content-wrap">
        <StudentForm info={studentInfo} errors={studentErrors} onChange={handleStudentChange} />

        <MarksInput
          subjects={subjects}
          errors={subjectErrors}
          onNameChange={handleSubjectNameChange}
          onMarksChange={handleMarksChange}
        />

        {/* Action Bar */}
        <div className="evaluation-action-deck">
          <div className="action-buttons-wrap">
            <button className="btn btn-primary run-eval-btn" onClick={handleCalculate}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              <span>Execute Semester Evaluation</span>
            </button>

            <button className="btn btn-secondary reset-btn" onClick={handleReset}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Reset Values</span>
            </button>
          </div>

          <div className="eval-deck-info">
            <span className="info-icon">ℹ</span>
            <span>All calculations apply real-time 30% MSE & 70% ESE weighting formula.</span>
          </div>
        </div>

        {/* Evaluation Output Section */}
        {result && (
          <section ref={resultRef} className="result-dashboard-section">
            <div className="section-heading result-hero-heading">
              <span className="eyebrow">EVALUATION METRICS COMPLETED</span>
              <h2>Semester Performance Dashboard</h2>
              <p>Comprehensive analytical synthesis of candidate assessment across all courses.</p>
            </div>

            <ResultSummary result={result} />
            <ResultTable rows={result.rows} />
            <PerformanceChart rows={result.rows} />
            <ResultCard studentInfo={studentInfo} result={result} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
