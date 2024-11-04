import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
