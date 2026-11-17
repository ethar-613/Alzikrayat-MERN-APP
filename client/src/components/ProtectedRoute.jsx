import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Only logged in users can see the page inside it.
// Visitors who are not logged in are sent to the login page.
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // wait until we finish reading the user from localStorage
  if (loading) return <div className="status-msg">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
