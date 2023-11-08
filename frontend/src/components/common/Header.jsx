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
      <div className="flex justify-between flex-row  bg-gradient-to-r from-blue-200/30 to-primary/30 p-5 backdrop-blur-lg fixed w-screen shadow-secondary/50 shadow-md rounded-lg z-50 items-center">
        <div className="ml-10 flex flex-row relative xl:justify-between" >
          <Link to="/" onClick={handleShuffle}>
            <img
              src="\logoTitle.png"
              alt="Test Logo"
              className="h-[40px] w-[40px] mt-[-5px] lg:flex xl:flex min-[820px]:flex"
            />
          </Link>
          <h1 className="mt-1 ml-[7px] md:ml-[-40px] text-2xl text-primary min-[820px]:hidden md:hidden xl:flex xl:ml-4 xl:mt-0">GloCast</h1>
        </div>

        <div className="relative">
          { isShowing ? 
          <CgClose className="text-[28px] text-primary md:hidden" onClick={handlerHamburger}/>:<GiHamburgerMenu className="text-[28px] text-primary md:hidden" onClick={handlerHamburger}/>}
        { isShowing && <div className="bg-primary md:bg-transparent md:rounded-none md:p-0 md:w-[unset] md:h-[unset] absolute md:static rounded-[8px] p-4 right-[16px] w-[80vw] h-[42vh]">
          <nav className="h-full md:mb-0 md:mt-3 lg:mb-0 xl:mb-0 min-[820px]:mb-0">
            <ul className="h-full gap-10 mt-10 lg:mt-0 xl:mt-0 lg:gap-10 lg:text-sm xl:gap-10 flex flex-col justify-start text-sm text-background ml-20 md:text-primary md:flex-row md:text-[16px] md:gap-4 sm:flex-col min-[375px]:text-lg min-[375px]:m-0 min-[375px]:justify-center min-[375px]:ml-32 min-[414px]:mt-[-30px] min-[414px]:ml-[60px] min-[412px]:ml-[50px] min-[820px]:mt-1 min-[912px]:text-[18px] xl:w-full">
              <li className="mt-2 w-[58px] lg:w-full xl:w-full hover:text-violet-600 ml-9 md:ml-[-20px] min-[375px]:w-full min-[414px]:ml-[48px] min-[412px]:ml-[62px] min-[820px]:mr-[-20px] md:mt-5 min-[912px]:mt-2">
                <Link to="#section2">Nosotros</Link>
              </li>
              <li className="mt-2 ml-10 lg:w-full xl:w-full md:ml-0 hover:text-violet-600 min-[414px]:ml-[50px] min-[412px]:ml-[65px] min-[820px]:mr-3 md:mt-5 min-[912px]:mt-2">
                <Link to="#section3">Contacto</Link>
              </li>
              <li className="mr-20 mt-2 ml-2 w-[127px] lg:mr-0 xl:mr-10 xl:w-42 hover:text-violet-600 min-[375px]:w-full min-[375px]:ml-6 min-[414px]:ml-2 min-[820px]:mr-2 md:mr-2 min-[912px]:mt-0">
                <Link to="#section1">Productos & Servicios</Link>
              </li>
              <li className="mr-56 mt-1 md:mr-0">
                <SearchBar />
              </li>

              <li className="hover:text-violet-600 md:mr-[-10px] hidden xl:flex lg:flex md:flex md:mt-4 lg:mt-3 lg:ml-2 lg:mr-[-20px]">
                <Link to="/register"><button className="w-[150px] h-[35px] bg-secondary text-white hover:bg-violet-300 hover:text-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800 min-[820px]:w-[110px] min-[820px]:mt-3 min-[912px]:mb-0 min-[912px]:mt-[-40px]">Crear Cuenta</button></Link>
              </li>
              <li className="hover:text-violet-600 hidden xl:flex lg:flex md:flex md:mr-5 md:mt-4 lg:mt-2">
                <Link to="/login"><button className="w-[150px] h-[35px] text-white bg-secondary hover:bg-violet-300 hover:text-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800 flex flex-row gap-3 justify-start align-middle md:mr-[-2px] min-[820px]:w-[120px] min-[820px]:mt-3 min-[912px]:mt-[-4px] lg:w-[110px] xl:mr-20"><img src="/loginAvatar.svg" alt="login icon" className="h-[20px] w-[20px] min-[820px]:hidden" /><p>Iniciar Sesion</p></button></Link>
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
