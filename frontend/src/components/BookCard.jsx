import { Link } from 'react-router-dom';
import './BookCard.css';

export default function BookCard({ book }) {
  const price = Number(book.price).toFixed(2);

  return (
    <Link to={`/book/${book.id}`} className="book-card glass-card">
      <div className="book-card__cover">
        <img src={book.imageUrl} alt={book.title} loading="lazy" />
        <span className="book-card__category">{book.category}</span>
      </div>
      <div className="book-card__body">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <div className="book-card__meta">
          <span className="book-card__rating">&#9733; {book.rating?.toFixed(1) ?? '—'}</span>
          <span className="book-card__price">${price}</span>
        </div>
      </div>
    </Link>
  );
}
