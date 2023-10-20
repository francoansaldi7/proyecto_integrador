import { Link, Outlet } from 'react-router-dom';

function Header() {
  return (
    <>
    <div className= 'flex flex-row justify-center mt-10 bg-red-600 m-11'>

    <div className='bg-red-400'>
      <Link to="/"><img src="../assets/LogoTest.svg" alt="Test Logo" /></Link>
    </div>

    <div>
      <nav className=''>
        <ul className='flex flex-row'>
        <li><Link to="/aboutUs">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/products&services">Products & Services</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
    </div>

    <Outlet />
    </>
  )
}

export default Header