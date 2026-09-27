import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  History,
  Search,
  Filter,
  Eye,
  Calculator,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle,
  GraduationCap
} from 'lucide-react'
import { getAllResults } from '../services/resultService.js'

function ResultHistory() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    let isMounted = true

    const fetchAll = async () => {
      try {
        setLoading(true)
        const data = await getAllResults()
        if (isMounted) setResults(data || [])
      } catch (err) {
        if (isMounted) {
          setError(
            err.response
              ? err.response.data?.message || 'Failed to fetch examination records.'
              : 'Could not connect to backend server. Make sure the Spring Boot API is running on port 8080.'
          )
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchAll()
    return () => {
      isMounted = false
    }
  }, [])

  const filteredResults = results.filter((res) => {
    const matchesSearch =
      (res.studentName && res.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (res.prn && res.prn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (res.branch && res.branch.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (res.semester && res.semester.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus =
      statusFilter === 'ALL' || res.resultStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <main className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title">University Examination Records</h1>
          <p className="page-subtitle">
            Browse and inspect all calculated student semester records and official transcripts.
          </p>
        </div>

        <Link to="/calculate" className="btn btn-primary">
          <Calculator size={16} />
          Evaluate New Result
        </Link>
      </div>

      <div className="card" style={{ padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: 260, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: 42 }}
              placeholder="Search by student name, PRN, branch or semester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status:</span>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '9px 14px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PASS">PASS Only</option>
              <option value="FAIL">FAIL Only</option>
            </select>
          </div>

          <span className="card-badge" style={{ marginLeft: 'auto' }}>
            {filteredResults.length} {filteredResults.length === 1 ? 'Record' : 'Records'} Found
          </span>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Loader2 size={36} className="spin" style={{ animation: 'spin 1s linear infinite', color: 'var(--primary-600)', margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--text-muted)' }}>Loading examination archives from database...</p>
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <div>
            <strong>Database Error: </strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {!loading && !error && filteredResults.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <GraduationCap size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px', opacity: 0.6 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>No Examination Records Found</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto 20px', fontSize: '0.92rem' }}>
            {searchQuery || statusFilter !== 'ALL'
              ? 'No student results match your current search filters. Try adjusting your search query.'
              : 'No results have been calculated yet in the system. Use the calculator to evaluate and store the first result.'}
          </p>
          <Link to="/calculate" className="btn btn-primary">
            <Calculator size={16} />
            Evaluate New Result
          </Link>
        </div>
      )}

      {!loading && !error && filteredResults.length > 0 && (
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th style={{ width: '8%' }}>ID</th>
                <th style={{ width: '22%' }}>Student Details</th>
                <th style={{ width: '15%' }}>Branch</th>
                <th style={{ width: '10%' }}>Semester</th>
                <th style={{ width: '10%' }}>Marks</th>
                <th style={{ width: '10%' }}>Percentage</th>
                <th style={{ width: '10%' }}>CGPA</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '5%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-600)' }}>
                      #{item.id}
                    </span>
                  </td>
                  <td className="subject-cell">
                    <span style={{ fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                      {item.studentName}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      PRN: {item.prn}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{item.branch}</td>
                  <td style={{ fontWeight: 600 }}>{item.semester}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{item.totalMarks}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{Number(item.percentage).toFixed(2)}%</td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: 'var(--primary-600)',
                        background: 'var(--primary-50)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {Number(item.cgpa).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${item.resultStatus === 'PASS' ? 'status-pass' : 'status-fail'}`}>
                      {item.resultStatus === 'PASS' ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                      {item.resultStatus}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/result/${item.id}`}
                      className="btn btn-outline btn-sm"
                      title="Inspect Official Grade Card"
                    >
                      <Eye size={14} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default ResultHistory
