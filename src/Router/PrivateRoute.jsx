import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/SharedComponent/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, userLoading } = useAuth();
  if (userLoading) return <Loading/>;
  if (user) return children;
  return <Navigate to="/login" state={location} replace></Navigate>;
};

export default PrivateRoute;
