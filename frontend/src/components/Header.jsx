import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="flex justify-between flex-row  bg-primary p-7 fixed w-screen">
        <div className="ml-10">
          <Link to="/">
            <img src="\public\logoTitle.png" alt="Test Logo" className="h-[40px] w-[40px]" />
          </Link>
        </div>

        <div>
          <nav>
            <ul className="flex gap-5 flex-row text-white mr-20">
              <li className="hover:text-violet-400">
                <Link to="/aboutUs">About Us</Link>
              </li>
              <li className="hover:text-violet-400">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="mr-10 hover:text-violet-400">
                <Link to="/products&services">Products & Services</Link>
              </li>
              <li className="hover:text-violet-400">
                <Link to="/register">Register</Link>
              </li>
              <li className="hover:text-violet-400">
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
