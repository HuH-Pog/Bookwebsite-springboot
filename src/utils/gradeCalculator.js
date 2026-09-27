// gradeCalculator.js
// Core marks, weightage, grade, SGPA, and validation engine.

export const MSE_MAX = 30
export const ESE_MAX = 70
export const MSE_WEIGHT = 0.3
export const ESE_WEIGHT = 0.7
export const PASS_THRESHOLD = 40

export const GRADE_POINTS_MAP = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  F: 0,
}

/**
 * Calculates the weighted final marks (out of 100) for a subject.
 * Weighted breakdown: (MSE / 30) * 30% * 100 + (ESE / 70) * 70% * 100
 */
export function calculateFinalMarks(mse, ese) {
  const mseWeighted = (Number(mse) / MSE_MAX) * MSE_WEIGHT * 100
  const eseWeighted = (Number(ese) / ESE_MAX) * ESE_WEIGHT * 100
  return round(mseWeighted + eseWeighted)
}

export function calculateWeightedComponents(mse, ese) {
  const mseWeighted = (Number(mse) / MSE_MAX) * MSE_WEIGHT * 100
  const eseWeighted = (Number(ese) / ESE_MAX) * ESE_WEIGHT * 100
  return { mseWeighted: round(mseWeighted), eseWeighted: round(eseWeighted) }
}

export function getGrade(finalMarks) {
  if (finalMarks >= 90) return 'O'
  if (finalMarks >= 80) return 'A+'
  if (finalMarks >= 70) return 'A'
  if (finalMarks >= 60) return 'B+'
  if (finalMarks >= 50) return 'B'
  if (finalMarks >= 40) return 'C'
  return 'F'
}

export function getGradePoints(grade) {
  return GRADE_POINTS_MAP[grade] ?? 0
}

export function getSubjectStatus(finalMarks) {
  return finalMarks >= PASS_THRESHOLD ? 'PASS' : 'FAIL'
}

export function getClassification(percentage, overallResult) {
  if (overallResult === 'FAIL') return 'Needs Improvement / Backlog'
  if (percentage >= 75) return 'First Class with Distinction'
  if (percentage >= 60) return 'First Class'
  if (percentage >= 50) return 'Second Class'
  return 'Pass Class'
}

export function validateMarks(mse, ese) {
  const errors = {}

  if (mse === '' || mse === null || mse === undefined) {
    errors.mse = 'Enter MSE marks.'
  } else if (Number(mse) < 0) {
    errors.mse = 'Marks cannot be negative.'
  } else if (Number(mse) > MSE_MAX) {
    errors.mse = `Max MSE marks: ${MSE_MAX}.`
  }

  if (ese === '' || ese === null || ese === undefined) {
    errors.ese = 'Enter ESE marks.'
  } else if (Number(ese) < 0) {
    errors.ese = 'Marks cannot be negative.'
  } else if (Number(ese) > ESE_MAX) {
    errors.ese = `Max ESE marks: ${ESE_MAX}.`
  }

  return errors
}

export function validateStudentInfo(info) {
  const errors = {}
  if (!info.name || !info.name.trim()) errors.name = 'Please provide student name.'
  if (!info.prn || !info.prn.trim()) errors.prn = 'Please provide PRN / Roll number.'
  if (!info.branch) errors.branch = 'Please select academic department.'
  if (!info.semester) errors.semester = 'Please select semester.'
  if (!info.year || !info.year.trim()) errors.year = 'Please specify academic session.'
  return errors
}

/**
 * Builds the full computed result for all subjects:
 * individual figures, grade points, overall totals, percentage, SGPA, and status.
 */
export function computeResult(subjects) {
  const rows = subjects.map((s) => {
    const finalMarks = calculateFinalMarks(s.mse, s.ese)
    const { mseWeighted, eseWeighted } = calculateWeightedComponents(s.mse, s.ese)
    const grade = getGrade(finalMarks)
    const gradePoints = getGradePoints(grade)
    const status = getSubjectStatus(finalMarks)
    return {
      ...s,
      finalMarks,
      mseWeighted,
      eseWeighted,
      grade,
      gradePoints,
      status,
    }
  })

  const totalMarks = round(rows.reduce((sum, r) => sum + r.finalMarks, 0))
  const maxTotal = subjects.length * 100
  const percentage = round((totalMarks / maxTotal) * 100)
  const subjectsPassed = rows.filter((r) => r.status === 'PASS').length
  const overallResult = subjectsPassed === subjects.length ? 'PASS' : 'FAIL'
  
  // SGPA is the average grade point across all subjects (standard credit weight = 1:1)
  const totalGradePoints = rows.reduce((sum, r) => sum + r.gradePoints, 0)
  const sgpa = overallResult === 'PASS' ? round(totalGradePoints / rows.length) : round(totalGradePoints / rows.length)
  const classification = getClassification(percentage, overallResult)

  // Find best and lowest subject
  const sorted = [...rows].sort((a, b) => b.finalMarks - a.finalMarks)
  const topSubject = sorted[0]
  const lowestSubject = sorted[sorted.length - 1]

  return {
    rows,
    totalMarks,
    maxTotal,
    percentage,
    subjectsPassed,
    overallResult,
    sgpa,
    classification,
    topSubject,
    lowestSubject,
  }
}

function round(value) {
  return Math.round(value * 100) / 100
}
