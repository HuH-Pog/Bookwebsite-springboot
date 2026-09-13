import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import BookCard from "../components/BookCard.jsx";
import "../styles/catalogue.css";

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const activeGenre = searchParams.get("genre") || "";

  useEffect(() => {
    setLoading(true);
    setErrorMsg("");
    const params = {};
    if (searchParams.get("search")) params.search = searchParams.get("search");
    if (searchParams.get("genre")) params.genre = searchParams.get("genre");

    api
      .get("/books", { params })
      .then((res) => setBooks(res.data))
      .catch(() =>
        setErrorMsg(
          "Couldn't reach the catalogue service. Make sure the Spring Boot backend is running on port 8080."
        )
      )
      .finally(() => setLoading(false));
  }, [searchParams]);

  const genres = useMemo(() => {
    const set = new Set(books.map((b) => b.genre));
    return Array.from(set).sort();
  }, [books]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (query) next.search = query;
    if (activeGenre) next.genre = activeGenre;
    setSearchParams(next);
  };

  const selectGenre = (genre) => {
    const next = {};
    if (searchParams.get("search")) next.search = searchParams.get("search");
    if (genre) next.genre = genre;
    setSearchParams(next);
  };

  return (
    <div className="catalogue">
      <div className="container">
        <header className="catalogue__head">
          <p className="catalogue__eyebrow">The full catalogue</p>
          <h1>Search the shelves</h1>

          <form className="catalogue__search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or author…"
              aria-label="Search books"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </header>

        {genres.length > 0 && (
          <div className="catalogue__filters">
            <button
              className={`catalogue__chip ${activeGenre === "" ? "is-active" : ""}`}
              onClick={() => selectGenre("")}
            >
              All genres
            </button>
            {genres.map((g) => (
              <button
                key={g}
                className={`catalogue__chip ${activeGenre === g ? "is-active" : ""}`}
                onClick={() => selectGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="catalogue__status">Pulling the drawer&hellip;</p>}
        {!loading && errorMsg && <p className="catalogue__status catalogue__status--error">{errorMsg}</p>}
        {!loading && !errorMsg && books.length === 0 && (
          <p className="catalogue__status">No books match that search. Try another title or author.</p>
        )}

        {!loading && !errorMsg && books.length > 0 && (
          <div className="catalogue__grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
