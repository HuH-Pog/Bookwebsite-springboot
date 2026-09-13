import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import BookCard from "../components/BookCard.jsx";
import "../styles/home.css";

const DRAWERS = [
  { label: "Fiction", code: "813" },
  { label: "Science Fiction", code: "813.5" },
  { label: "History", code: "909" },
  { label: "Non-Fiction", code: "158" },
  { label: "Fantasy", code: "813.6" },
  { label: "Technology", code: "005" },
  { label: "Design", code: "745" },
  { label: "Nature", code: "305" },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/books")
      .then((res) => setFeatured(res.data.slice(0, 3)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero__row">
          <div className="hero__copy">
            <p className="hero__eyebrow">A card catalogue for the internet</p>
            <h1 className="hero__title">
              Every book here has been <em>read</em>, not just listed.
            </h1>
            <p className="hero__sub">
              PuneBookstall is an independent bookstore for curious minds, collecting sharp
              ideas, strange stories, and books worth passing to a friend.
            </p>
            <div className="hero__actions">
              <Link to="/catalogue" className="btn btn-primary">
                Browse the catalogue
              </Link>
              <Link to="/register" className="btn btn-outline">
                Get a library card
              </Link>
            </div>
          </div>

          <div className="hero__stamp ticket-edge card-surface">
            <p className="hero__stamp-label">Today's shelf report</p>
            <div className="hero__stamp-row">
              <span className="hero__stamp-num">1,240+</span>
              <span>titles catalogued</span>
            </div>
            <div className="hero__stamp-row">
              <span className="hero__stamp-num">38</span>
              <span>genres in stock</span>
            </div>
            <div className="hero__stamp-row">
              <span className="hero__stamp-num">6★</span>
              <span>years in the neighbourhood</span>
            </div>
          </div>
        </div>
      </section>

      {/* Drawer grid */}
      <section className="drawers">
        <div className="container">
          <h2 className="drawers__title">Pull a drawer</h2>
          <div className="drawers__grid">
            {DRAWERS.map((d) => (
              <button
                key={d.label}
                className="drawer"
                onClick={() => navigate(`/catalogue?genre=${encodeURIComponent(d.label)}`)}
              >
                <span className="drawer__pull" aria-hidden="true" />
                <span className="drawer__label">{d.label}</span>
                <span className="drawer__code">{d.code}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — a real sequence, so numbering earns its keep */}
      <section className="process">
        <div className="container">
          <h2 className="process__title">How the shop works</h2>
          <ol className="process__list">
            <li>
              <span className="process__step">01</span>
              <div>
                <h3>Get a library card</h3>
                <p>Register with your name and email &mdash; it takes under a minute.</p>
              </div>
            </li>
            <li>
              <span className="process__step">02</span>
              <div>
                <h3>Sign in</h3>
                <p>Your card unlocks the full catalogue and keeps your visits in one place.</p>
              </div>
            </li>
            <li>
              <span className="process__step">03</span>
              <div>
                <h3>Browse the shelves</h3>
                <p>Search by title, author or genre, and see what's actually in stock.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Featured shelf */}
      <section className="featured">
        <div className="container">
          <div className="featured__head">
            <h2>From this week's shelf</h2>
            <Link to="/catalogue" className="featured__link">
              See the full catalogue &rarr;
            </Link>
          </div>
          {loading ? (
            <p className="featured__loading">Pulling books from the shelf&hellip;</p>
          ) : (
            <div className="featured__grid">
              {featured.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
