import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand-logo footer-logo">
            <span className="brand-mark">D</span>
            <span>
              DEV<span className="brand-highlight">@</span>Deakin
            </span>
          </Link>

          <p>
            A community for learning, sharing ideas, and exploring the future
            of technology.
          </p>

          <Link to="/articles" className="footer-discover-link">
            Discover something new →
          </Link>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-column">
          <h3>Community</h3>
          <Link to="/signup">Create Account</Link>
          <Link to="/login">Sign In</Link>
          <Link to="/pricing">Membership</Link>
        </div>

        <div className="footer-column">
          <h3>Stay Connected</h3>
          <p>Get updates and discover new ideas.</p>
          <Link to="/subscribe" className="footer-subscribe-button">
            Join Our Newsletter →
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} DEV@Deakin. All rights reserved.
        </p>

        <Link to="/about">Learn more about us</Link>
      </div>
    </footer>
  );
}

export default Footer;