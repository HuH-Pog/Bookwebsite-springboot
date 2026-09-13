import "../styles/bookcard.css";
import { useCart } from "../context/CartContext.jsx";

export default function BookCard({ book }) {
  const inStock = book.stock > 0;
  const { items, addToCart } = useCart();
  const cartItem = items.find((item) => item.id === book.id);

  return (
    <article className="book-card card-surface">
      <div className="book-card__cover-wrap">
        {book.coverUrl ? (
          <img
            className="book-card__cover"
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            loading="lazy"
          />
        ) : (
          <div className="book-card__cover-fallback" aria-label="Cover unavailable">
            <span>{book.title.slice(0, 1)}</span>
          </div>
        )}
      </div>
      <div className="book-card__body">
        <div className="book-card__top">
          <span className="book-card__call">{book.callNumber || "—"}</span>
          <span className={`book-card__stock ${inStock ? "" : "is-out"}`}>
            {inStock ? `${book.stock} on shelf` : "Checked out"}
          </span>
        </div>

        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        {book.rating && <p className="book-card__rating">★ {book.rating.toFixed(1)} reader rating</p>}

        <p className="book-card__desc">{book.description}</p>

        <div className="book-card__bottom">
          <span className="book-card__genre">{book.genre}</span>
          <span className="book-card__price">${Number(book.price).toFixed(2)}</span>
        </div>
        <button
          className={`book-card__add ${cartItem ? "is-added" : ""}`}
          type="button"
          disabled={!inStock || cartItem?.quantity >= book.stock}
          onClick={() => addToCart(book)}
        >
          {cartItem ? `${cartItem.quantity} in cart` : inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </article>
  );
}
