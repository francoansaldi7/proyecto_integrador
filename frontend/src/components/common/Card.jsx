import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Card({id, img, title, description, price, moreBig = false, disccount = false, rating = 1}) {
  return (
    
<div className={`w-full relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${moreBig ? 'scale-125' : ''} transition duration-500`}>
  <div className="h-[200px] overflow-hidden">
    {disccount && (
      <div className="absolute top-0 right-[-10px] h-20 w-20 rotate-12">
      <img src="/disscount.svg" alt="" />
    </div>
    )}
    {id ? (
      <Link to={`/details/${id}`} state={{img, title, description, price, rating, id}}>
          <img className="rounded-t-lg" src={img} alt="product image" />
      </Link>
    ) : <img className="rounded-t-lg" src={img} alt="product image" />}
  </div>
    <div className="px-5 py-5">
        <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
            <AiFillStar className="w-4 h-4 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-4 h-4 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-4 h-4 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-4 h-4 text-yellow-300"></AiFillStar>
            <AiOutlineStar className="w-4 h-4 text-gray-200 dark:text-gray-600"></AiOutlineStar>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{rating}</span>
        </div>

        <div className="flex flex-row mb-2">
          <p className="relative text-gray-500 text-sm pb-5 max-h-[40px] overflow-hidden w-[80%]">{description}</p>
          <Link to="/details" state={{img, title, description, price}}><p className=" text-primary pointer hover:underline hover:text-secondary mt-4">... more</p></Link>
        </div>
            
        <div className="flex items-center justify-between gap-[4px]">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}/<span className="text-gray-400 text-xs font-semibold">per hour</span></span>
            <Link to="" className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm sm:px-5 px-2 py-2.5 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800">Book Now!</Link>
        </div>
    </div>
</div>

  )
}

export default Card