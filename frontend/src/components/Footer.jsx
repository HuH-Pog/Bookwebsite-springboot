import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">M</span>
            <span>Margin</span>
          </div>
          <p className="footer__tagline">
            The book club for people who always have one more chapter in them.
          </p>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/register">Create Account</Link>
        </div>

        <div className="footer__col">
          <h4>Categories</h4>
          <Link to="/catalogue?category=Fiction">Fiction</Link>
          <Link to="/catalogue?category=Mystery">Mystery</Link>
          <Link to="/catalogue?category=Sci-Fi">Sci-Fi</Link>
          <Link to="/catalogue?category=Technology">Technology</Link>
        </div>

        <div className="footer__col">
          <h4>Reading Club</h4>
          <span>Made for curious readers</span>
          <span>Always open, always browsing</span>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>&copy; {new Date().getFullYear()} Margin Reading Club.</span>
          <span className="footer__signature">Find your next conversation starter.</span>
        </div>
      </div>
    </footer>
  );
}
