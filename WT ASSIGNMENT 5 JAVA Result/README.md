# VIT Semester Result Management System

A full-stack web app for engineering students to enter subject marks (MSE + ESE),
and automatically calculate final marks, grades, grade points, and semester CGPA.

- **Backend:** Java 17, Spring Boot, Maven, Spring Web, Spring Data JPA, Validation, MySQL
- **Frontend:** React (Vite), React Router, Axios

```
vit-result-system/
├── backend/     → Spring Boot REST API
└── frontend/    → React app (Vite)
```

---

## 1. Prerequisites

- **Java 17** (JDK)
- **Maven** (or use the included wrapper if you add one — see note below)
- **Node.js 18+** and npm
- **MySQL 8.x** running locally

---

## 2. Database Setup

The backend is configured to auto-create the database on first connection
(`createDatabaseIfNotExist=true`), and `spring.jpa.hibernate.ddl-auto=update`
will auto-create the tables. You just need MySQL running with a valid user.

1. Make sure MySQL is running locally on port `3306`.
2. Note your MySQL `root` username/password (or create a dedicated user).
3. No manual `CREATE DATABASE` step is required — Spring Boot handles it.

---

## 3. Running the Backend

```bash
cd backend

# Option A: set your DB credentials via environment variables (recommended)
export DB_URL="jdbc:mysql://localhost:3306/vit_result_db?createDatabaseIfNotExist=true"
export DB_USERNAME="root"
export DB_PASSWORD="your_mysql_password"

# Option B: or just edit src/main/resources/application.properties directly

mvn spring-boot:run
```

The API will start on **http://localhost:8080**.

Quick test once it's running:
```bash
curl http://localhost:8080/api/results
```
(should return `[]` on a fresh database)

> **Note on Spring Boot version:** `pom.xml` is set to Spring Boot `4.1.1` to
> match the Spring Initializr configuration you provided. If that exact
> version isn't available in Maven Central by the time you build this, open
> `pom.xml` and change the `<version>` under `<parent>` to the latest stable
> Spring Boot 3.x release (e.g. `3.3.5`) — no other code changes are needed,
> since the project only uses stable, well-established Spring Boot APIs.

---

## 4. Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will start on **http://localhost:5173** and is already configured
(via CORS on the backend, and `baseURL` in `src/services/resultService.js`)
to talk to the backend at `http://localhost:8080`.

Open **http://localhost:5173** in your browser.

---

## 5. Using the App

1. Go to **Home** → click **Calculate Result**.
2. Fill in student details (Name, PRN, Branch, Semester, Academic Year).
3. Enter MSE (0–30) and ESE (0–70) marks for the 4 default subjects
   (Data Structures, DBMS, Computer Networks, Operating Systems).
4. Click **Calculate Result**.
5. You're taken to a separate, marksheet-style **Result Page** showing:
   - Subject-wise final marks, grade, and grade point
   - Total credits, total marks, percentage
   - Semester CGPA (large, prominent card)
   - PASS / FAIL status
6. Use **Print Result** (browser print) or **Download Result** (PDF download)
   at the bottom of the result page.

Every calculated result is saved in MySQL and can be re-fetched via
`GET /api/results/{id}` or listed via `GET /api/results`.

---

## 6. Calculation Rules (implemented in the backend only)

- **Final Marks** = MSE Marks + ESE Marks (MSE out of 30, ESE out of 70)
- **Grading:**

  | Marks    | Grade | Grade Point |
  |----------|-------|-------------|
  | 90–100   | O     | 10          |
  | 80–89    | A+    | 9           |
  | 70–79    | A     | 8           |
  | 60–69    | B+    | 7           |
  | 50–59    | B     | 6           |
  | 40–49    | C     | 5           |
  | Below 40 | F     | 0           |

- **CGPA** = Σ(Credit × Grade Point) / Σ(Credits), rounded to 2 decimal places
- **Result Status** = `FAIL` if any subject scores an `F`, otherwise `PASS`

All of this logic lives in `GradingService` and `ResultService` on the
backend (`backend/src/main/java/.../service/`) — the frontend never
calculates these values itself, it only displays what the backend returns.

---

## 7. REST API Reference

| Method | Endpoint             | Description                             |
|--------|-----------------------|------------------------------------------|
| POST   | `/api/results`        | Calculate + save a new semester result   |
| GET    | `/api/results/{id}`   | Fetch a saved result by id               |
| GET    | `/api/results`        | List all saved results                   |

---

## 8. Project Structure

```
backend/
└── src/main/java/com/example/VIT_Semester_Result_Springboot/
    ├── controller/    → ResultController (REST endpoints)
    ├── service/       → ResultService, GradingService (business logic)
    ├── repository/    → StudentRepository, ResultRepository (JPA)
    ├── entity/        → Student, Result, SubjectResult
    ├── dto/           → Request/response DTOs
    ├── exception/     → ResourceNotFoundException, GlobalExceptionHandler
    └── config/        → CorsConfig

frontend/
└── src/
    ├── components/    → Navbar, StudentForm, SubjectMarksTable,
    │                    ResultTable, ResultSummary, CGPACard
    ├── pages/         → Home, CalculateResult, ResultPage
    ├── services/      → resultService.js (Axios API calls)
    ├── App.jsx        → React Router routes
    └── index.css      → Global styling (calc page vs. formal result page)
```

---

## 9. Notes

- Subjects are seeded as a plain array (`DEFAULT_SUBJECTS` in
  `CalculateResult.jsx`) so they can be changed easily — swap the codes,
  names, and credits there for a different semester.
- The MSE/ESE weightage logic is isolated in `GradingService.calculateFinalMarks()`,
  so the weighting scheme can be changed in one place if the college's
  policy changes.
- Do not commit real database passwords — use environment variables in
  any deployment beyond local development.
