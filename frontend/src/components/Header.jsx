import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="flex justify-between flex-row  bg-primary p-7 fixed w-screen">
        <div className="">
          <Link to="/">
            <img src="../assets/LogoTest.svg" alt="Test Logo" />
          </Link>
        </div>

        <div>
          <nav className="">
            <ul className="flex gap-5 flex-row text-white">
              <li>
                <Link to="/aboutUs">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/products&services">Products & Services</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Header;
