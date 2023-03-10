import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    <div>
        <Link to="/">Home</Link>
        &nbsp;&nbsp;
        <Link to="/about">About</Link>
        &nbsp;&nbsp;
        <Link to="/pong">Pong</Link>
    </div>
  </footer>
);

export default Footer;