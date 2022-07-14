import { NavLink, Link } from "react-router-dom";
import Logo from "../images/logo.png";

export default function Header() {
  return (
    <header className="navbar">
      <Link to="/">
        {" "}
        <img className="navbar--logo" src={Logo} alt="logo" />
      </Link>
      <NavLink to="/">Home</NavLink>
      <NavLink to="notes">Notes</NavLink>
      <NavLink to="contact">Contact</NavLink>
    </header>
  );
}
