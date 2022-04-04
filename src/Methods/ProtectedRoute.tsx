import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { RootState } from "../Store/reducer";


interface IProps {
  children: JSX.Element;
}

const ProtectedRoute = (props: IProps) => {
  const location = useLocation();

  const store = useSelector((state: RootState) => state.auth)

  if (!store.auth_token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props.children;
}

export default ProtectedRoute;
