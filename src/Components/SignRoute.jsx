import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SignRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default SignRoute;