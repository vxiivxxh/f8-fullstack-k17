import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../stores/authStore";

export default function Nav() {
  const activeClass = ({ isActive }) => {
    return isActive ? "bg-red-600" : "";
  };
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        fontSize: "20px",
      }}
    >
      <NavLink className={activeClass} to="/">
        Home
      </NavLink>
      <NavLink className={activeClass} to="/about">
        About
      </NavLink>
      <NavLink className={activeClass} to="/products">
        Products
      </NavLink>
      <NavLink className={activeClass} to="/contact">
        Contact
      </NavLink>
      {user ? (
        <>
          <span style={{ fontWeight: "bold" }}>Hi, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <NavLink className={activeClass} to="/login">
          Login
        </NavLink>
      )}
    </div>
  );
}
