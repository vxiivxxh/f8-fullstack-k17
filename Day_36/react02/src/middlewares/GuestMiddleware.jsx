import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../stores/authStore";

export default function GuestMiddleware() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
