import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="site-navbar">
      <Link to="/" className="navbar-brand">
        DEV@Deakin
      </Link>

      <nav className="navbar-navigation">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/articles">
          Articles
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>

        <NavLink to="/subscribe">
          Subscribe
        </NavLink>

        <NavLink to="/pricing">
          Pricing
        </NavLink>

        <div className="navbar-auth">
          <Link to="/login" className="navbar-login">
            Login
          </Link>

          <Link to="/signup" className="navbar-signup">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;