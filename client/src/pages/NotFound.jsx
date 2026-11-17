import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-page">
      <p className="notfound-code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}

export default NotFound;
