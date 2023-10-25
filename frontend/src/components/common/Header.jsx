import { Link } from "react-router-dom";

function Header() {

  return (
    <>
      <div className="flex justify-between flex-row  bg-gradient-to-r from-blue-200/30  to-primary/30 p-5 backdrop-blur-lg fixed w-screen  shadow-secondary/50 shadow-md rounded-lg z-50">
        <div className="ml-10 flex flex-row relative">
          <Link to="/">
            <img src="\logoTitle.png" alt="Test Logo" className="h-[40px] w-[40px] mt-[-5px]" />
          </Link>
          <h1 className="mt-0 ml-[7px] text-2xl text-primary">GloCast</h1>
        </div>

        <div>
          <nav>
            <ul className="flex gap-5 flex-row text-primary mr-20">
              <li className="hover:text-violet-600">
                <Link to="/aboutUs">About Us</Link>
              </li>
              <li className="hover:text-violet-600">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="mr-10 hover:text-violet-600">
                <Link to="/products&services">Products & Services</Link>
              </li>
              <li className="hover:text-violet-600">
                <Link to="/register">Create Account</Link>
              </li>
              <li className="hover:text-violet-600">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>


    </>
  );
}

export default Header;