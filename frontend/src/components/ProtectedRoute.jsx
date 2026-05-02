import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children,roleRequired }) => {
  const { isAuthenticated, user,loading } = useSelector((state) => state.auth);

  // 🔥 WAIT before deciding
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && user?.role !== roleRequired) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;