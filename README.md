# PuneBookstall — Online Book Store

A full-stack book store app:

- **Frontend:** React 18 + Vite, React Router, Axios
- **Backend:** Spring Boot 4.1.1 (Java 17, Maven), Spring Web, Spring Data JPA
- **Database:** MySQL
- **Auth:** BCrypt password hashing + JWT (issued on register/login)

Pages: **Home**, **Login**, **Registration**, **Catalogue** (search + genre filter, backed by MySQL).

The UI uses a warm studio palette with teal, vermilion, sunflower, and paper tones,
plus visible cover artwork on every seeded book.

```
bookstore-app/
├── backend/     Spring Boot API (port 8080)
└── frontend/    React app (port 5173)
```

---

## 1. Prerequisites

Install these once:

- **Java 17** — `java -version`
- **Maven 3.9+** — `mvn -version` (or use your IDE's built-in Maven, e.g. IntelliJ / Spring Tool Suite)
- **Node.js 18+** and npm — `node -v`
- **MySQL 8+** running locally — `mysql --version`

---

## 2. Set up the database

Open a MySQL shell and create the database (the app can also auto-create it, but
creating it yourself avoids permission surprises):

```sql
CREATE DATABASE bookstore_db;
```

Then open `backend/src/main/resources/application.properties` and set your own
MySQL username/password:

```properties
spring.datasource.username=root
spring.datasource.password=root
```

No need to create tables manually — Hibernate creates `users` and `books` automatically
on first run (`spring.jpa.hibernate.ddl-auto=update`). The app seeds 15 books, adds new
titles without duplicates, and fills missing cover URLs when an existing database starts.

---

## 3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. Quick check:

```bash
curl http://localhost:8080/api/books
```

You should get back a JSON array of the seeded books.

**Alternative:** open the `backend` folder in IntelliJ IDEA / Eclipse / Spring Tool
Suite as a Maven project and run `DemoApplication.java` directly.

### Backend API summary

| Method | Endpoint              | Purpose                                  |
|--------|------------------------|-------------------------------------------|
| POST   | `/api/auth/register`  | Create an account, returns a JWT          |
| POST   | `/api/auth/login`     | Log in, returns a JWT                     |
| GET    | `/api/books`           | List all books (`?search=`, `?genre=`)    |
| GET    | `/api/books/{id}`      | Get one book                              |
| POST   | `/api/books`            | Add a book                                |

---

## 4. Run the frontend

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

The React app is already configured (`src/api/axios.js`) to call the backend at
`http://localhost:8080/api`, and the backend already allows CORS requests from
`http://localhost:5173` (see `app.cors.allowed-origin` in `application.properties`).
If you change either port, update both files to match.

---

## 5. Using the app

1. Visit the **Home** page — click "Get a library card."
2. **Register** with a name, email, and a 6+ character password. This logs you in
   automatically and stores a JWT in `localStorage`.
3. Browse the **Catalogue** — search by title/author, or filter by genre using the
   pill filters or the drawer buttons on the Home page.
4. Use **Sign out** in the navbar to log out, and **Sign in** to log back in.

---

## 6. Building for production (optional)

```bash
# Backend — produces a runnable jar in backend/target/
cd backend
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar

# Frontend — produces a static build in frontend/dist/
cd frontend
npm run build
npm run preview   # serve the production build locally to test it
```

---

## 7. Troubleshooting

- **"Couldn't reach the catalogue service"** on the Catalogue page → the backend
  isn't running or isn't on port 8080. Start it with `mvn spring-boot:run`.
- **MySQL connection errors** → double-check `spring.datasource.username` /
  `password` in `application.properties`, and that MySQL is running
  (`mysqladmin -u root -p status`).
- **CORS errors in the browser console** → make sure `app.cors.allowed-origin` in
  `application.properties` matches the URL you're loading the frontend from.
- **Port already in use** → change `server.port` (backend) or run
  `npm run dev -- --port 5174` (frontend), and update the other side to match.
