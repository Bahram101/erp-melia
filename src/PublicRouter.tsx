import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PublicRouter() {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  if (localStorage.getItem("access_token")) {
    return <Navigate to={fromPage} replace />;
  }

  return <Outlet />;
}

export default PublicRouter;
