import { Link } from "react-router-dom";
import "../../footer_styles.css";

const Footer = () => (
  <footer>
    <div class="navigation">
        <div><Link to="/" style={{textDecoration: 'none', color: 'white'}}>Home</Link></div>
        &nbsp;&nbsp;
        <div><Link to="/about" style={{textDecoration: 'none', color: 'white'}}>About</Link></div>
        &nbsp;&nbsp;
        <div><Link to="/pong" style={{textDecoration: 'none', color: 'white'}}>Pong</Link></div>
        &nbsp;&nbsp;
        <div><Link to="/auth/login" style={{textDecoration: 'none', color: 'white'}}>Login</Link></div>
        &nbsp;&nbsp;
        <div><Link to="/auth/register" style={{textDecoration: 'none', color: 'white'}}>Register</Link></div>
    </div>
  </footer>
);

export default Footer;