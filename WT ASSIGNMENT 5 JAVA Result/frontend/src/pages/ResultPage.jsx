import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  GraduationCap,
  Printer,
  Download,
  Share2,
  Check,
  RotateCcw,
  History,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Calendar,
  Building2
} from 'lucide-react'
import { getResultById } from '../services/resultService.js'
import ResultTable from '../components/ResultTable.jsx'
import ResultSummary from '../components/ResultSummary.jsx'
import CGPACard from '../components/CGPACard.jsx'

function ResultPage() {
  const { id } = useParams()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)
  const marksheetRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const fetchResult = async () => {
      try {
        setLoading(true)
        const data = await getResultById(id)
        if (isMounted) setResult(data)
      } catch (err) {
        if (isMounted) {
          setError(
            err.response
              ? err.response.data?.message || 'Examination record not found.'
              : 'Unable to reach backend service. Please check network and server status.'
          )
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchResult()
    return () => {
      isMounted = false
    }
  }, [id])

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPdf = async () => {
    if (!result) return
    try {
      setIsExporting(true)
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ])

      const element = marksheetRef.current
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })
      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = (canvas.height * pageWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight)
      pdf.save(`ApexGrade_GradeCard_${result.prn}_Sem_${result.semester}.pdf`)
    } catch (err) {
      console.error('PDF Export Error:', err)
      alert('Unable to generate PDF document. Please try using the Print option.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (loading) {
    return (
      <main className="page" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <Loader2 size={40} className="spin" style={{ animation: 'spin 1s linear infinite', color: 'var(--primary-600)', margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Retrieving Academic Examination Record...</h2>
        <p style={{ color: 'var(--text-muted)' }}>Querying student marks, grade points, and database registers.</p>
      </main>
    )
  }

  if (error || !result) {
    return (
      <main className="page">
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <div>
            <strong>Unable to Load Result: </strong>
            <span>{error || 'Result record could not be loaded.'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/calculate" className="btn btn-primary">
            Calculate New Result
          </Link>
          <Link to="/history" className="btn btn-secondary">
            Browse All Records
          </Link>
        </div>
      </main>
    )
  }

  const formattedDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="page">
      <div className="marksheet-container" ref={marksheetRef}>
        <div className="marksheet-watermark">APEXGRADE</div>

        <div className="marksheet-content">
          <div className="official-header">
            <div className="official-crest">
              <div className="crest-icon-wrapper">
                <GraduationCap size={36} />
              </div>
              <div className="institution-title">
                <h1>APEX INSTITUTE OF HIGHER LEARNING & TECHNOLOGY</h1>
                <div className="institution-subtitle">
                  Autonomous Institution • Office of The Controller of Examinations
                </div>
              </div>
            </div>

            <div className="official-meta">
              <div>
                <strong>SESSION:</strong> {result.academicYear}
              </div>
              <div>
                <strong>ISSUED:</strong> {formattedDate}
              </div>
              <div className="report-id-badge">RECORD ID: #{String(result.id).padStart(5, '0')}</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.25rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary-600)' }}>
              Official Semester Examination Grade Card
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Statement of marks and credit-weighted grade points awarded in the university examination.
            </p>
          </div>

          <div className="student-bio-grid">
            <div className="bio-item">
              <span className="bio-label">Student Name</span>
              <span className="bio-value">{result.studentName}</span>
            </div>
            <div className="bio-item">
              <span className="bio-label">University PRN / Roll No</span>
              <span className="bio-value" style={{ fontFamily: 'var(--font-mono)' }}>{result.prn}</span>
            </div>
            <div className="bio-item">
              <span className="bio-label">Program & Branch</span>
              <span className="bio-value">{result.branch}</span>
            </div>
            <div className="bio-item">
              <span className="bio-label">Semester</span>
              <span className="bio-value">{result.semester}</span>
            </div>
            <div className="bio-item">
              <span className="bio-label">Academic Year</span>
              <span className="bio-value">{result.academicYear}</span>
            </div>
          </div>

          <ResultTable subjects={result.subjects} />

          <div className="result-analytics-grid">
            <ResultSummary result={result} />
            <CGPACard cgpa={result.cgpa} />
          </div>

          <div className="marksheet-signatures">
            <div className="signature-block">
              <div className="signature-line" />
              <span className="signature-title">Prepared by System</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-success)', fontSize: '0.82rem', fontWeight: 600 }}>
              <ShieldCheck size={18} />
              <span>Cryptographically Verified Database Record</span>
            </div>

            <div className="signature-block">
              <div className="signature-line" />
              <span className="signature-title">Controller of Examinations</span>
            </div>
          </div>
        </div>
      </div>

      <div className="result-action-toolbar no-print">
        <Link to="/calculate" className="btn btn-secondary">
          <RotateCcw size={16} />
          New Evaluation
        </Link>
        <Link to="/history" className="btn btn-secondary">
          <History size={16} />
          All Records
        </Link>
        <button type="button" className="btn btn-primary" onClick={handlePrint}>
          <Printer size={16} />
          Print Marksheet
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownloadPdf}
          disabled={isExporting}
        >
          {isExporting ? <Loader2 size={16} className="spin" /> : <Download size={16} />}
          {isExporting ? 'Generating PDF...' : 'Download PDF Grade Card'}
        </button>
        <button type="button" className="btn btn-outline" onClick={handleCopyLink}>
          {copied ? <Check size={16} color="var(--color-success)" /> : <Share2 size={16} />}
          {copied ? 'Link Copied!' : 'Share Result Link'}
        </button>
      </div>
    </main>
  )
}

export default ResultPage
