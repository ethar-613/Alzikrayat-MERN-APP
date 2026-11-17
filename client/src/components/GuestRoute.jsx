import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Only visitors who are NOT logged in can see the page inside it
// (login and register). Logged in users are sent to the home page.
function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  // wait until we finish reading the user from localStorage
  if (loading) return <div className="status-msg">Loading...</div>;

  if (user) return <Navigate to="/" replace />;

  return children;
}

export default GuestRoute;
