
import { Navigate } from "react-router-dom";
import { useGetProfileQuery } from "../features/auth/authAPI";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");

  const { data: user, isLoading, isError } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // token invalid or API fails
  if (isError || !user) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && user?.role !== roleRequired) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;