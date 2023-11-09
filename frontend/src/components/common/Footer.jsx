/* eslint-disable react/no-unescaped-entities */
import { HashLink as Link } from "react-router-hash-link";
import heart from '../../assets/heart.png';

function Footer() {
  
  return (
    <>
    <div className="bg-primary text-white h-60">
      <p className="flex flex-row justify-center text-xl bg-primary p-5">¡Gracias por visitar GloCast!</p>

      <div className="flex justify-center">
        <Link to="/"><img src="\logoTitle.png" alt="Test Logo" className="bg-primary h-14 w-14" /></Link>
      </div>

      <div className="flex flex-row justify-center text-lg bg-primary mt-6 gap-10 min-[375px]:gap-4">
          <Link to="#section2"><p className="hover:text-violet-300">Nosotros</p></Link>
          <Link to="#section1"><p className="hover:text-violet-300">Productos & Servicios</p></Link>
          <Link to="#section3"><p className="hover:text-violet-300">Contacto</p></Link>
      </div>

    <div className="mt-4">
      <hr />
    </div>

      <div>
        <p className='flex gap-2 mt-5 justify-center bg-primary'>
          @{new Date().getFullYear()} Hecho con <img src={heart} alt="love" className='h-5 w-5'/>  por el Equipo 1. Todos los derechos reservados
        </p>
    </div>
  </div>
    </>

  )
}

export default Footer