# ApexGrade Studio

> **Next-Generation Academic Evaluation & Semester Analytics Platform**  
> Engineered for real-time weighted assessment synthesis (30% MSE / 70% ESE), SGPA estimation, dynamic performance analytics, and verified digital grade transcripts.

---

## ✨ Overview

**ApexGrade Studio** is a modern, high-performance web application designed for academic evaluation. Moving far beyond traditional ledger tables, it delivers a high-tech glassmorphic command center that calculates weighted subject scores, computes cumulative grade points (SGPA on a 10.0 scale), provides interactive score breakdowns, and generates print-ready authenticated transcripts.

---

## 🚀 Key Features

- **⚡ Weighted Assessment Engine**:
  - Continuous Mid-Semester Assessment (MSE): **30% weightage** (Max 30 marks).
  - Terminal End-Semester Examination (ESE): **70% weightage** (Max 70 marks).
  - Explicit normalized mathematical model preserving the 30/70 formula split.
- **🎯 Real-Time Score Feedback**:
  - Live tentative score pill & grade badge preview on each subject card as marks are entered.
  - Interactive dual-meter track displaying MSE vs ESE contribution proportions.
  - Quick-fill "Full" buttons for instantaneous maximum marks setting.
- **⚡ Instant Sample Scenarios**:
  - One-click presets (`Distinction (88%)`, `First Class (72%)`, and `Critical Edge (42%)`) to test and demo the evaluation dashboard immediately without manual typing.
- **📊 Bento-Grid Performance Dashboard**:
  - **Verdict Hero Card**: Clearance verdict (`PASS` / `FAIL`), academic standing, and clearance progress.
  - **Estimated SGPA Card**: Weighted Semester Grade Point Average on a 10.0 scale.
  - **Aggregate Percentage**: Formula-scaled total percentage with animated count-up.
  - **Curricular Highlights**: Automated detection of top-performing courses.
- **📈 Dual-Component Performance Visualization**:
  - Stacked horizontal bars distinguishing MSE (30 pts) vs ESE (70 pts) contributions.
  - Benchmark passing line fixed at **40.0 points** for immediate risk detection.
- **📜 Verified Digital Grade Transcript**:
  - Executive digital certificate with security watermark, examination seal, document serial number, QR verification badge, and Controller of Examinations signature block.
  - Dedicated `@media print` rules for clean, high-contrast, paper-optimized printing via `window.print()`.
- **💎 Luminous Dark Glassmorphism Design**:
  - Deep slate nebula palette (`#080c17`), electric indigo/cyan/rose accents, frosted glass blur, and responsive mobile drawers.

---

## 📐 Mathematical Formulation & Logic

### 1. Weighted Course Mark Calculation
For each course subject:

$$\text{Final Marks} = \left(\frac{\text{MSE}}{30} \times 0.30 \times 100\right) + \left(\frac{\text{ESE}}{70} \times 0.70 \times 100\right)$$

- Component 1: $\text{MSE Weighted} = \text{MSE}$
- Component 2: $\text{ESE Weighted} = \text{ESE}$
- Scaled Subject Score: $\text{Final Marks} = \text{MSE Weighted} + \text{ESE Weighted}$ (out of 100)

### 2. Academic Grading Matrix & Grade Points (10-Point Scale)

| Score Range (Marks) | Letter Grade | Grade Points | Performance Tier |
| :---: | :---: | :---: | :--- |
| **90 – 100** | **O** | 10 | Outstanding / Distinction |
| **80 – 89** | **A+** | 9 | Excellent |
| **70 – 79** | **A** | 8 | Very Good |
| **60 – 69** | **B+** | 7 | Good |
| **50 – 59** | **B** | 6 | Above Average |
| **40 – 49** | **C** | 5 | Pass |
| **Below 40** | **F** | 0 | Fail / Backlog |

### 3. Semester Clearance Criteria
- A course is marked **PASS** if its final scaled score is **$\ge 40$**.
- The overall semester result is **PASS only if all 4 courses meet or exceed the 40-mark threshold**. If any subject is below 40, the semester verdict is **FAIL**.

### 4. SGPA Calculation
$$\text{SGPA} = \frac{\sum (\text{Course Grade Points})}{\text{Total Courses (4)}}$$

---

## 🛠️ Project Structure

```
WebTechnologies-Assignments-assignment-4/
├── public/
│   └── favicon.svg               # Vector brand emblem
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css      # Floating frosted navbar with presets & status pulse
│   │   ├── Hero.jsx / .css        # Analytical hero with holographic ring preview & presets
│   │   ├── StudentForm.jsx / .css # Candidate profile & enrollment input deck
│   │   ├── MarksInput.jsx / .css  # Course assessment matrix wrapper
│   │   ├── SubjectCard.jsx / .css # Interactive card with live pills & dual-progress meters
│   │   ├── ResultSummary.jsx / .css # Bento-grid dashboard (SGPA, verdict, stats)
│   │   ├── ResultTable.jsx / .css # Component-level transcript table with scaled weights
│   │   ├── PerformanceChart.jsx / .css # Stacked score breakdown with 40-pt threshold
│   │   ├── ResultCard.jsx / .css  # Verified digital grade certificate (print ready)
│   │   └── Footer.jsx / .css      # Executive footer with specifications & badges
│   ├── utils/
│   │   └── gradeCalculator.js    # Decoupled calculation, SGPA, & validation engine
│   ├── App.jsx / App.css         # Root state orchestrator & action bar
│   ├── index.css                 # Global design tokens, typography & print styling
│   └── main.jsx                  # React application entry
├── index.html                    # Root HTML with Google Fonts & metadata
├── package.json
└── vite.config.js
```

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm`

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd WebTechnologies-Assignments-assignment-4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open the printed local URL (typically `http://localhost:5173`) in any modern browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🛡️ Validation & Constraints

- **MSE Range**: Enforced between `0` and `30`.
- **ESE Range**: Enforced between `0` and `70`.
- **Required Fields**: Candidate Name, PRN, Department, Semester, and Academic Session.
- Form prevents calculation and displays inline visual error tags until all fields satisfy validation constraints.

---

## 📄 License & Notes
- Built with **React 18** + **Vite 5**.
- Designed for academic self-evaluation and semester performance forecasting.
