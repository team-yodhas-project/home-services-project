
import { Navigate } from "react-router-dom";
import { useGetProfileQuery } from "../features/auth/authAPI";
import PageLoader from "./PageLoader";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");

  if (!token) {
  return <Navigate to="/login" replace />;
  }
  
  const { data: user, isLoading, isError } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return <PageLoader/>;
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