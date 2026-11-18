/**
 * route guard component
 * allows only visitors to open the page inside it (login/register), logged in users are redirected to home
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Only visitors who are NOT logged in can see the page inside it
// (login and register). Logged in users are sent to the home page.
// parameters; children, the page that is only for visitors (login/register)
// Returns the page, or a Loading message while checking, or a redirect to the home page
function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  // wait until we finish reading the user from localStorage
  if (loading) return <div className="status-msg">Loading...</div>;

  if (user) return <Navigate to="/" replace />;

  return children;
}

export default GuestRoute;
