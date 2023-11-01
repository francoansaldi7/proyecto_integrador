import { HashLink as Link } from "react-router-hash-link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../contexts/globalContext";
import { CgClose } from "react-icons/cg";
import SearchBar from "../SearchBar";

function Header() {
  const [isShowing, setIsShowing] = useState(false);
  const {handleShuffle} = useContext(GlobalContext)
  useEffect(() => {
    const isMobile = document.documentElement.clientWidth >= 768;
    console.log(
      document.documentElement.clientWidth,
      window.innerWidth,
      isMobile
    );
    setIsShowing(isMobile);
  }, []);

  const handlerHamburger = () => {
    setIsShowing(!isShowing);
  };
  return (
    <>
      <div className="flex justify-between flex-row  bg-gradient-to-r from-blue-200/30  to-primary/30 p-5 backdrop-blur-lg fixed w-screen  shadow-secondary/50 shadow-md rounded-lg z-50 items-center">
        <div className="ml-10 flex flex-row relative" >
          <Link to="/" onClick={handleShuffle}>
            <img
              src="\logoTitle.png"
              alt="Test Logo"
              className="h-[40px] w-[40px] mt-[-5px]"
            />
          </Link>
          <h1 className="mt-0 ml-[7px] text-2xl text-primary">GloCast</h1>
        </div>

        <div className="relative">
          { isShowing ? 
          <CgClose className="text-[28px] text-primary md:hidden" onClick={handlerHamburger}/>:<GiHamburgerMenu className="text-[28px] text-primary md:hidden" onClick={handlerHamburger}/>}
        { isShowing && <div className="bg-primary md:bg-transparent md:rounded-none md:p-0 md:w-[unset] md:h-[unset] absolute md:static rounded-[8px] p-4 right-[16px] w-[80vw] h-[42vh]">
          <nav className="h-full">
            <ul className="flex gap-10 flex-row text-background md:text-primary mr-20 md:flex-row text-[22px] md:text-[18px] justify-around h-full font-medium">
              <li className="mt-2 hover:text-violet-600">
                <Link to="#section2">About Us</Link>
              </li>
              <li className="mt-2 hover:text-violet-600">
                <Link to="#section3">Contact</Link>
              </li>
              <li className="mr-20 mt-2 hover:text-violet-600">
                <Link to="#section1">Products & Services</Link>
              </li>
              <li className="mr-60 mt-1">
                <SearchBar className="md:hidden sm:hidden"/>
              </li>

              <li className="hover:text-violet-600">
                <Link to="/register"><button className="w-[120px] h-[35px] bg-secondary text-white hover:bg-violet-300 hover:text-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800">Crear Cuenta</button></Link>
              </li>
              <li className="hover:text-violet-600">
                <Link to="/login"><button className="w-[120px] text-white bg-secondary hover:bg-violet-300 hover:text-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800 flex flex-row gap-3 justify-start align-middle"><img src="/loginicon.png" alt="login icon" className="bg-white" /><p className="mt-[-2px]">Login</p></button></Link>
              </li>
            </ul>
          </nav>
        </div>}
        </div>
      </div>
    </>
  );
}

export default Header;
