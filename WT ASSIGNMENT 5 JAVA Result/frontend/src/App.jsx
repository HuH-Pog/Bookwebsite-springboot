import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import GradeScaleModal from './components/GradeScaleModal.jsx'
import Home from './pages/Home.jsx'
import CalculateResult from './pages/CalculateResult.jsx'
import ResultPage from './pages/ResultPage.jsx'
import ResultHistory from './pages/ResultHistory.jsx'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('apexgrade_theme') || 'light'
  })
  const [isGradeScaleModalOpen, setIsGradeScaleModalOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('apexgrade_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenGradeScale={() => setIsGradeScaleModalOpen(true)}
        />

        <Routes>
          <Route
            path="/"
            element={<Home onOpenGradeScale={() => setIsGradeScaleModalOpen(true)} />}
          />
          <Route
            path="/calculate"
            element={
              <CalculateResult onOpenGradeScale={() => setIsGradeScaleModalOpen(true)} />
            }
          />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/history" element={<ResultHistory />} />
        </Routes>

        <GradeScaleModal
          isOpen={isGradeScaleModalOpen}
          onClose={() => setIsGradeScaleModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
