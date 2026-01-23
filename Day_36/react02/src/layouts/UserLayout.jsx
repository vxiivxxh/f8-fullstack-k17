import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../stores/authStore";

export default function UserLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const from = location.pathname + location.search;
    logout();
    navigate(`/login?continue=${encodeURIComponent(from)}`);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <Link to={"/users"}>Dashboard</Link>
        <Link to={"#"}>Password</Link>
        <Link to={"#"}>Account</Link>
        <Link to={"#"}>My order</Link>
        {user && <span>Hi, {user.name}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Outlet />
    </div>
  );
}
