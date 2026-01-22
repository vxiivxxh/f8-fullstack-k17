import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../stores/authStore";

export default function AuthMiddleware() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/login?continue=${location.pathname + location.search}`}
      replace
    />
  );
}
