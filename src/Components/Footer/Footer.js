import { Link } from "react-router-dom";
import "../../footer_styles.css";

const Footer = () => (
  <footer>
    <div class="navigation">
        <Link to="/">Home</Link>
        &nbsp;&nbsp;
        <Link to="/about">About</Link>
        &nbsp;&nbsp;
        <Link to="/pong">Pong</Link>
        &nbsp;&nbsp;
        <Link to="/auth/login">Login</Link>
        &nbsp;&nbsp;
        <Link to="/auth/register">Register</Link>
    </div>
  </footer>
);

export default Footer;