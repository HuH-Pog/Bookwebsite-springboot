import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container notfound fade-in">
      <span className="notfound__code">404</span>
      <h1 className="section-heading">Looks like this page slipped between the pages.</h1>
      <p className="section-sub" style={{ margin: '14px auto 0' }}>
        Perhaps it was lent out and never returned. Let's get you back to the shelves.
      </p>
      <Link to="/" className="btn btn-gold" style={{ marginTop: 34 }}>
        Return Home
      </Link>
    </div>
  );
}
