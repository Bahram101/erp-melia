import { useLocation, Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {
  const location = useLocation();
  if (!localStorage.getItem("access_token")) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default PrivateRouter;
