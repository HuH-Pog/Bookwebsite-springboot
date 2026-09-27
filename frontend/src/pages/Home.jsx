import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { booksApi } from '../api/api.js';
import BookCard from '../components/BookCard.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';
import './Home.css';

const CATEGORIES = [
  { name: 'Fiction', blurb: 'Stories that outlive their pages.' },
  { name: 'Mystery', blurb: 'Secrets worth staying up for.' },
  { name: 'Sci-Fi', blurb: 'Futures written in careful ink.' },
  { name: 'Romance', blurb: 'Hearts, chapters, and consequence.' },
  { name: 'Self-Help', blurb: 'Small pages, larger lives.' },
  { name: 'Technology', blurb: 'The craft behind the machine.' },
];

export default function Home() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState('loading');

  const loadBooks = () => {
    setStatus('loading');
    booksApi
      .getAll()
      .then((data) => {
        setBooks(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const featured = books.slice(0, 4);
  const trending = [...books].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy fade-in">
            <span className="eyebrow">A better kind of book break</span>
            <h1 className="hero__title">
              Books for your
              <br />
              next <span className="hero__title-accent">obsession.</span>
            </h1>
            <p className="hero__desc">
              A quietly curated shelf of fiction, mystery, and ideas — chosen for readers who
              want more than a bestseller list. Every title here earned its place.
            </p>
            <div className="hero__actions">
              <Link to="/catalogue" className="btn btn-gold">
                Explore the shelves
              </Link>
              <Link to="/register" className="btn btn-outline">
                Join the club
              </Link>
            </div>
            <div className="hero__stats">
              <div>
                <strong>500+</strong>
                <span>Curated Titles</span>
              </div>
              <div>
                <strong>6</strong>
                <span>Categories</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Open Shelves</span>
              </div>
            </div>
          </div>

          <div className="hero__art fade-in">
            <div className="hero__book hero__book--back" />
            <div className="hero__book hero__book--mid" />
            <div className="hero__book hero__book--front">
              {featured[0] && (
                <img src={featured[0].imageUrl} alt={featured[0].title} />
              )}
            </div>
            <div className="hero__glow" />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section container">
        <div className="section__head">
          <div>
            <span className="eyebrow">Start here</span>
            <h2 className="section-heading">The current favourites</h2>
          </div>
          <Link to="/catalogue" className="btn btn-ghost">
            View All &rarr;
          </Link>
        </div>

        {status === 'loading' && <Loader label="Gathering featured titles..." />}
        {status === 'error' && <ErrorState message="Could not load books from the server." onRetry={loadBooks} />}
        {status === 'success' && (
          <div className="book-grid">
            {featured.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="section section--alt">
        <div className="container">
          <span className="eyebrow">Choose your lane</span>
          <h2 className="section-heading">What are you in the mood for?</h2>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <Link
                to={`/catalogue?category=${encodeURIComponent(cat.name)}`}
                key={cat.name}
                className="category-card glass-card"
              >
                <h3>{cat.name}</h3>
                <p>{cat.blurb}</p>
                <span className="category-card__arrow">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      {status === 'success' && trending.length > 0 && (
        <section className="section container">
          <span className="eyebrow">Most loved</span>
          <h2 className="section-heading">Readers can’t put these down</h2>
          <div className="book-grid" style={{ marginTop: 34 }}>
            {trending.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner glass-card">
          <div>
            <span className="eyebrow">Make a little room</span>
            <h2 className="section-heading">Your next great read is waiting.</h2>
            <p className="section-sub">
              Create a free account to save your reading history and pick up right where you
              left off.
            </p>
          </div>
          <Link to="/register" className="btn btn-gold">
            Become a member
          </Link>
        </div>
      </section>
    </div>
  );
}
