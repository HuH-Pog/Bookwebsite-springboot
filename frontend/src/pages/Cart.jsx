import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/cart.css";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="cart-page">
      <div className="container">
        <header className="cart-page__head">
          <p className="cart-page__eyebrow">Your reading list</p>
          <h1>Shopping cart</h1>
          <p>Keep the books you want close, then decide when you are ready to check out.</p>
        </header>

        {items.length === 0 ? (
          <section className="cart-empty card-surface">
            <span className="cart-empty__mark">+</span>
            <h2>Your cart is waiting for a good story.</h2>
            <p>Browse the catalogue and add something that catches your eye.</p>
            <Link to="/catalogue" className="btn btn-primary">Browse books</Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-list" aria-label="Cart items">
              {items.map((item) => (
                <article className="cart-item card-surface" key={item.id}>
                  <img className="cart-item__cover" src={item.coverUrl} alt={`Cover of ${item.title}`} />
                  <div className="cart-item__info">
                    <p className="cart-item__genre">{item.genre}</p>
                    <h2>{item.title}</h2>
                    <p className="cart-item__author">{item.author}</p>
                    <p className="cart-item__price">${Number(item.price).toFixed(2)} each</p>
                  </div>
                  <div className="cart-item__controls">
                    <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, Math.min(Number(event.target.value), item.stock))}
                    />
                    <button type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="cart-summary card-surface">
              <p className="cart-page__eyebrow">Order summary</p>
              <div className="cart-summary__line">
                <span>Books</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              <div className="cart-summary__line">
                <span>Delivery</span>
                <strong>Free</strong>
              </div>
              <div className="cart-summary__total">
                <span>Total</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              <button className="btn btn-primary cart-summary__checkout" type="button">
                Continue to checkout
              </button>
              <Link to="/catalogue" className="cart-summary__continue">Keep browsing</Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
