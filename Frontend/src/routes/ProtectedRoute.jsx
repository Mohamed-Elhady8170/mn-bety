import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * @desc  Protects routes based on authentication and role.
 *
 * @param {string} requiredRole - 'customer' | 'seller' | null (just needs login)
 *
 * Flow:
 *  - Not logged in                     → /auth/login
 *  - customer trying /seller/*         → /customer
 *  - seller-only trying /customer/*    → /seller  (edge case: seller with no customer role)
 *  - logged in + correct role          → render children
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Not authenticated → go to login, remember where they were going
  if (!user || !accessToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  const roles = user.roles || [];

  // 2. Role check
  if (requiredRole && !roles.includes(requiredRole)) {
    if (requiredRole === 'seller') {
      // customer trying to access seller area
      return <Navigate to="/customer" replace />;
    }
    if (requiredRole === 'customer') {
      // seller-only trying to access customer area (very edge case)
      return <Navigate to="/seller" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;