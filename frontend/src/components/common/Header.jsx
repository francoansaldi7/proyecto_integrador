import { HashLink as Link } from "react-router-hash-link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../contexts/globalContext";
import { CgClose } from "react-icons/cg";
import { FaChessQueen } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { AuthContex } from "../../contexts/AuthContex";

function Header() {
  const {handleShuffle} = useContext(GlobalContext)
  const {isLoggedIn} = useContext(AuthContex);

  const [isShowing, setIsShowing] = useState(false);
  const [user] = useState(isLoggedIn());
  const initials = getInitials(user.name);
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

  function getInitials (name){
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
  
  return (
    
      <div className="flex justify-between flex-row  bg-gradient-to-r from-blue-200/30  to-primary/30 p-5 backdrop-blur-lg fixed w-screen  shadow-secondary/50 shadow-md rounded-lg z-50 items-center">
        <div className="ml-10 flex flex-row relative items-center" >
          <Link to="/" onClick={handleShuffle}>
            <img
              src="/logoTitle.png"
              alt="Test Logo"
              className="w-[40px]"
            />
          </Link>
          <h1 className="mt-1 ml-[7px] mr-[20px] text-2xl text-primary">GloCast</h1>
        </div>

        <div className="relative">
          { isShowing ? 
          <CgClose className="text-[28px] text-primary md:hidden" onClick={handlerHamburger}/>:<GiHamburgerMenu className="text-[28px] text-primary hidden md:block" onClick={handlerHamburger}/>}
        { isShowing && <div className="bg-primary md:bg-transparent md:rounded-nonemd:p-0 md:w-[unset] md:h-[unset] absolute md:static rounded-[8px] p-4 right-[16px] w-[80vw] h-[42vh]">
          <nav className="h-full">

            <ul className="flex  flex-row  flex justify-between  text-background md:text-primary md:flex-row text-[22px] md:text-[18px] h-full font-medium md:text-sm md:gap-4">
              <li className="mt-2 hover:text-violet-600 md:ml-5">
                <Link to="#section2">Sobre nosotros</Link>

              </li>
              <li className="mt-2 hover:text-violet-600">
                <Link to="#section3">Contacto</Link>
              </li>

              <li className="mr-20 mt-2 hover:text-violet-600 md:mr-5">
                <Link to="#section1">Productos y Servicios</Link>

              </li>
              <li className="mr-56 mt-1 md:mr-0">
                <SearchBar className="md:hidden sm:hidden"/>
              </li>
            {user.isLoggedIn ? 
            <div className="cursor-pointer flex flex-row gap-3 justify-center items-center">
              <h4>Bienvenido</h4>
              <div className="h-10 w-10 bg-white rounded-full relative flex items-center justify-center">
                <h2 className="font-extrabold">{initials}</h2>
                {user.isAdmin &&  (<FaChessQueen className="text-yellow-400 absolute top-[-10px] left-1/2 -translate-x-1/2 "/>)}
              </div>
              {user.isAdmin &&  (
              <button className="p-2 rounded-md bg-secondary text-white hover:bg-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
              )}
              <button 
              onClick={()=> {
                localStorage.clear()
                window.location.reload()
              }}
              className="p-2 rounded-md bg-secondary text-white hover:bg-primary">Log Out</button>
            </div>
             : 
            <>
              <li className="hover:text-violet-600 md:mr-[-10px]">
                <Link to="/register"><button className="w-[150px] h-[35px] bg-secondary text-white hover:bg-violet-300 hover:text-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800">Crear Cuenta</button></Link>
              </li>
              <li className="hover:text-violet-600">
                <Link to="/login"><button className="w-[150px] h-[35px] text-white bg-secondary hover:bg-violet-300 hover:text-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800 flex flex-row gap-3 justify-start align-middle md:mr-[-25px]"><img src="/loginAvatar.svg" alt="login icon" className="h-[20px] w-[20px]" /><p>Iniciar Sesion</p></button></Link>
              </li>
            </>
            }
            </ul>
          </nav>
        </div>}
        </div>
      </div>

  );
}

export default Header;
