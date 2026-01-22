import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/Users/Dashboard";
import CreateOrder from "../pages/Users/CreateOrder";
import RoleMiddleware from "../middlewares/RoleMiddleware";
import Sales from "../pages/Users/Sales";
import GuestMiddleware from "../middlewares/GuestMiddleware";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products">
          <Route index element={<Products />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="/contact" element={<Contact />} />

        <Route element={<GuestMiddleware />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route element={<AuthMiddleware />}>
        <Route element={<UserLayout />} path="/users">
          <Route index element={<Dashboard />} />
          <Route path="order/:productId" element={<CreateOrder />} />
          <Route element={<RoleMiddleware />}>
            <Route path="sales" element={<Sales />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
