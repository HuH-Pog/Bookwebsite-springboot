import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { booksApi } from '../api/api.js';
import BookCard from '../components/BookCard.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import './Catalogue.css';

const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'rating-desc', label: 'Rating (Highest First)' },
];

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState('loading');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('title-asc');

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

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) setCategory(urlCategory);
  }, [searchParams]);

  const categories = useMemo(() => {
    const set = new Set(books.map((b) => b.category));
    return ['All', ...Array.from(set).sort()];
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (category !== 'All') {
      result = result.filter((b) => b.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }

    return result;
  }, [books, category, search, sortBy]);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container catalogue">
      <div className="catalogue__head">
        <span className="eyebrow">The Full Collection</span>
        <h1 className="section-heading">Catalogue</h1>
        <p className="section-sub">Browse every title on our shelves, filtered your way.</p>
      </div>

      <div className="catalogue__controls glass-card">
        <input
          type="text"
          className="form-input catalogue__search"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-input catalogue__select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {status === 'success' && (
        <div className="catalogue__categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${category === cat ? 'chip--active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {status === 'loading' && <Loader label="Loading the catalogue..." />}
      {status === 'error' && (
        <ErrorState
          message="We couldn't reach the bookstore server. Please confirm the backend is running."
          onRetry={loadBooks}
        />
      )}
      {status === 'success' && filteredBooks.length === 0 && (
        <EmptyState message="No books match your search or filters." />
      )}
      {status === 'success' && filteredBooks.length > 0 && (
        <>
          <p className="catalogue__count">{filteredBooks.length} book(s) found</p>
          <div className="book-grid catalogue__grid">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
