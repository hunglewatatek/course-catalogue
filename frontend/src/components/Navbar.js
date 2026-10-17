import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/catalogue">Catalogue</NavLink>
      <NavLink to="/courses/new">Thêm khóa học</NavLink>
    </nav>
  );
}

export default Navbar;
