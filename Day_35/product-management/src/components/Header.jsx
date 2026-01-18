import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <NavLink to="/" end>
        Home |
      </NavLink>
      <NavLink to="/about">About |</NavLink>
      <NavLink to="/contact">Contact |</NavLink>
      <NavLink to="/products">Products |</NavLink>
    </nav>
  );
};
export default Header;
