import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { booksApi } from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';
import './BookDetails.css';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState('loading');

  const loadBook = () => {
    setStatus('loading');
    booksApi
      .getById(id)
      .then((data) => {
        setBook(data);
        setStatus('success');
      })
      .catch((err) => {
        setStatus(err.status === 404 ? 'not-found' : 'error');
      });
  };

  useEffect(() => {
    loadBook();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (status === 'loading') {
    return <Loader label="Fetching book details..." />;
  }

  if (status === 'not-found') {
    return (
      <div className="container">
        <div className="state-block">
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem' }}>
            This title could not be found on our shelves.
          </p>
          <button className="btn btn-outline" onClick={() => navigate('/catalogue')}>
            Back to Catalogue
          </button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container">
        <ErrorState message="Could not load this book. Please check the backend connection." onRetry={loadBook} />
      </div>
    );
  }

  return (
    <div className="container book-details fade-in">
      <Link to="/catalogue" className="book-details__back">
        &larr; Back to Catalogue
      </Link>

      <div className="book-details__grid">
        <div className="book-details__cover glass-card">
          <img src={book.imageUrl} alt={book.title} />
        </div>

        <div className="book-details__info">
          <span className="badge">{book.category}</span>
          <h1 className="book-details__title">{book.title}</h1>
          <p className="book-details__author">by {book.author}</p>

          <div className="book-details__meta">
            <span className="book-details__rating">&#9733; {book.rating?.toFixed(1) ?? '—'} / 5</span>
            <span className="book-details__dot">&bull;</span>
            <span className={book.stock > 0 ? 'book-details__in-stock' : 'book-details__out-stock'}>
              {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <p className="book-details__price">${Number(book.price).toFixed(2)}</p>

          <p className="book-details__description">{book.description}</p>

          <div className="book-details__actions">
            <button className="btn btn-gold" disabled={book.stock <= 0} onClick={() => addToCart(book)}>
              {book.stock > 0 ? 'Add to Reading List' : 'Currently Unavailable'}
            </button>
            <Link to="/catalogue" className="btn btn-outline">
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
