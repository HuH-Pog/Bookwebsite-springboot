import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import './Cart.css';

export default function Cart() {
  const { items, total, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="container cart-page">
        <span className="eyebrow">Your Shelf</span>
        <h1 className="section-heading">Your Cart</h1>
        <div className="state-block fade-in">
          <p>Your cart is waiting for its first story.</p>
          <Link to="/catalogue" className="btn btn-gold">Browse Catalogue</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page fade-in">
      <span className="eyebrow">Your Shelf</span>
      <h1 className="section-heading">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item glass-card" key={item.id}>
              <img src={item.imageUrl} alt={item.title} className="cart-item__image" />
              <div className="cart-item__details">
                <Link to={`/book/${item.id}`} className="cart-item__title">{item.title}</Link>
                <p>{item.author}</p>
                <span className="cart-item__price">${Number(item.price).toFixed(2)}</span>
              </div>
              <div className="cart-item__controls">
                <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.id, Math.max(1, Number(event.target.value) || 1))}
                />
                <button type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary glass-card">
          <h2>Order Summary</h2>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <p>Checkout is ready for the next step.</p>
          <button type="button" className="btn btn-gold btn-block" disabled>
            Checkout Coming Soon
          </button>
        </aside>
      </div>
    </div>
  );
}
