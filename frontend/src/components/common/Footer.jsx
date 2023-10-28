/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import heart from '../../assets/heart.png';

function Footer() {
  
  return (
    <>
    <div className="bg-primary h-60">
      <p className="flex flex-row justify-center bg-primary p-5">Thank's for visiting GloCast!</p>

      <div className="flex justify-center">
        <Link to="/"><img src="\logoTitle.png" alt="Test Logo" className="bg-primary h-14 w-14" /></Link>
      </div>

      <div className="flex flex-row justify-center bg-primary mt-10 gap-7">
          <Link to="/aboutUs"><p className="hover:text-violet-400">About Us</p></Link>
          <Link to="/products&services"><p className="hover:text-violet-400">Products & Services</p></Link>
          <Link to="/contact"><p className="hover:text-violet-400">Contact</p></Link>
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