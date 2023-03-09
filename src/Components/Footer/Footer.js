import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    <div>
        <Link to="/">Home</Link>
        &nbsp;&nbsp;
        <Link to="/about">About</Link>
    </div>
  </footer>
);

export default Footer;