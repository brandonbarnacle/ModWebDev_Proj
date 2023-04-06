import { Link } from "react-router-dom";
import "../../footer_styles.css";

const linkStyle = {
  textDecoration: 'none',
  color: 'white'
};

const Footer = () => (
  <footer>
    <div class="navigation">
        <div><Link to="/" style={linkStyle}>Home</Link></div>
        &nbsp;&nbsp;
        <div><Link to="/about" style={linkStyle}>About</Link></div>
        &nbsp;&nbsp;
        <div><Link to="/pong" style={linkStyle}>Pong</Link></div>
        &nbsp;&nbsp;
        <div><Link to="/auth/login" style={linkStyle}>Login</Link></div>
        &nbsp;&nbsp;
        <div><Link to="/auth/register" style={linkStyle}>Register</Link></div>
    </div>
  </footer>
);

export default Footer;