# Margin — Online Bookstore

Margin is a full-stack bookstore built for readers looking for their next great read. It pairs a bright, editorial reading-club interface with a Spring Boot and MySQL backend.

## Highlights

- Distinctive Margin reading-club UI with responsive layouts
- Browse, search, filter, and sort the catalogue
- View full book details and add books to a persistent cart
- Register, log in, log out, and view a protected profile
- Clear loading, empty, error, and not-found states
- Sample inventory spanning six book categories

## Technology

| Area | Tools |
| --- | --- |
| Frontend | React 18, Vite, React Router, hand-written CSS |
| Backend | Java 17, Spring Boot 3.3.4, Maven |
| Database | MySQL 8 |
| Security | BCrypt password hashing and DTO-based API responses |

## Prerequisites

- Java 17 or later
- Maven 3.9 or later
- Node.js 18 or later and npm
- MySQL Server 8 running locally

## Setup

### 1. Create the database

The application can create the database automatically. To create it manually, run:

```sql
CREATE DATABASE IF NOT EXISTS online_bookstore;
```

On startup, Hibernate creates or updates the tables and the bundled SQL files seed the sample catalogue.

### 2. Configure MySQL

Update the credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 3. Start the backend

```bash
cd backend
mvn spring-boot:run
```

The API runs at `http://localhost:8080`.

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` to view Margin.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home and featured books |
| `/catalogue` | Searchable, filterable book collection |
| `/book/:id` | Individual book details |
| `/cart` | Shopping cart |
| `/login`, `/register` | Authentication |
| `/profile` | Protected member profile |

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/books` | Retrieve all books |
| GET | `/api/books/{id}` | Retrieve one book |
| GET | `/api/books/category/{category}` | Retrieve books by category |
| GET | `/api/users/{id}` | Retrieve profile information |

## Project Structure

```text
online-bookstore/
├── backend/                 # Spring Boot REST API
│   └── src/main/
│       ├── java/com/bookstore/
│       └── resources/
└── frontend/                # Margin React application
    └── src/
        ├── api/
        ├── components/
        ├── context/
        └── pages/
```

## Notes

- Passwords are stored only as BCrypt hashes.
- CORS is configured for `http://localhost:5173`; adjust `CorsConfig.java` before deploying elsewhere.
- The interface is built without a component framework: its responsive styles and Margin design system live in `frontend/src`.
