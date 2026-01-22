import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function MainLayout() {
  return (
    <div>
      <Nav />
      <hr />
      <div style={{ padding: "15px" }}>
        <Outlet />
      </div>
    </div>
  );
}
