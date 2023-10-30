/* eslint-disable react/no-unescaped-entities */
import { HashLink as Link } from "react-router-hash-link";
import heart from '../../assets/heart.png';

function Footer() {
  
  return (
    <>
    <div className="bg-primary text-white h-60">
      <p className="flex flex-row justify-center text-xl bg-primary p-5">Thank's for visiting GloCast!</p>

      <div className="flex justify-center">
        <Link to="/"><img src="\logoTitle.png" alt="Test Logo" className="bg-primary h-14 w-14" /></Link>
      </div>

      <div className="flex flex-row justify-center text-lg bg-primary mt-6 gap-7">
          <Link to="#section2"><p className="hover:text-violet-300">About Us</p></Link>
          <Link to="#section1"><p className="hover:text-violet-300">Products & Services</p></Link>
          <Link to="#section3"><p className="hover:text-violet-300">Contact</p></Link>
      </div>

    <div className="mt-4">
      <hr />
    </div>

      <div>
        <p className='flex gap-2 mt-5 justify-center bg-primary'>
          @{new Date().getFullYear()} Made with  <img src={heart} alt="love" className='h-5 w-5'/>  by Team 1. All rights reserved
        </p>
    </div>
  </div>
    </>

  )
}

export default Footer