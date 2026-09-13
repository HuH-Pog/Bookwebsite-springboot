import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="nav-ticket">
      <div className="container nav-ticket__row">
        <Link to="/" className="nav-ticket__brand">
          <span className="nav-ticket__mark">M</span>
          <span className="nav-ticket__name">OMMATERE</span>
        </Link>

        <nav className="nav-ticket__links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "is-active" : "")}>
            Home
          </NavLink>
          <NavLink to="/catalogue" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Catalogue
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Cart <span className="nav-ticket__cart-count">{cartCount}</span>
          </NavLink>
        </nav>

        <div className="nav-ticket__auth">
          {user ? (
            <>
              <span className="nav-ticket__member">Reading as {user.fullName.split(" ")[0]}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-ticket__linkbtn">
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary">
                Get a card
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
