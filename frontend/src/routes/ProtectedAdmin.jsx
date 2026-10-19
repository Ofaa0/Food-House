import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const currentUser = JSON.parse(
    sessionStorage.getItem("currentUser") || "null"
  );

  const role = currentUser?.state?.currentUser?.role;

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdmin;