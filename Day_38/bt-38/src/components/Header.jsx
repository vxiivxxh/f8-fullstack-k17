import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { User, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginForm from "./LoginForm";

const Header = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse Menu", path: "/menu" },
    { name: "Special Offers", path: "/offers" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Track Order", path: "/track-order" },
  ];

  return (
    <header className="w-full bg-background py-4 sticky top-0 z-50 border-b border-border/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-4xl font-extrabold flex items-center tracking-tight"
        >
          <span>Order</span>
          <span className="ml-1 bg-primary text-foreground px-2 py-1 rounded-md text-2xl leading-none">
            .UK
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[15px] font-medium px-5 py-2.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-secondary/50"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="font-bold text-sm hidden md:block">
              Hello, {user.name}
            </div>
            <Button
              onClick={handleLogout}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 h-10 px-6 flex items-center gap-2 cursor-pointer"
            >
              <UserCircle className="w-5 h-5" />
              <span className="font-semibold">Logout</span>
            </Button>
          </div>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 h-12 px-7 flex items-center gap-3 text-base shadow-lg cursor-pointer">
                <User className="w-5 h-5 text-primary" />
                <span className="font-semibold">Login/Signup</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">
                  Welcome Back
                </DialogTitle>
              </DialogHeader>
              <LoginForm onSuccess={handleLoginSuccess} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
};
export default Header;
