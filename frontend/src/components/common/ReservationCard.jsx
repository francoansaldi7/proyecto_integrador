import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ShareButton from "./ShareButton";
import Favorite from "./Favorite";

/* eslint-disable react/prop-types */
function ReservationCard({
  id,
  img,
  title,
  description,
  price,
  moreBig = false,
  disccount = false,
  rating = 1,
  startingDatetime,
  endingDatetime
}) {

  return (
    <div
      className={` w-full relative flex flex-col justify-evenly max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-primary-dark dark:border-purple-700 ${
        moreBig ? "scale-125" : ""
      } transition duration-500`}
    >
      <div className="h-[200px] overflow-hidden">
        {disccount && (
          <div className="absolute top-0 right-[-10px] h-20 w-20 rotate-12">
            <img src="/disscount.svg" alt="" />
          </div>
        )}
        {id ? (
          <Link
            to={`/details/${id}`}
            state={{ img, title, description, price, rating, id }}
          >
            <img
              className="rounded-t-lg h-full w-full"
              src={img}
              alt="product image"
            />
          </Link>
        ) : (
          <img
            className="rounded-t-lg h-full w-full"
            src={img}
            alt="product image"
          />
        )}
      </div>
      <div className="px-5 py-5 mt-[-10px]">
        <Link
          to={`/details/${id}`}
          state={{ img, title, description, price, rating, id }}
        >
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <div className="flex items-center mt-2 mb-5 ml-0 mr-0 w-70">
          <AiFillStar className="w-4 h-4 text-yellow-300"></AiFillStar>
          <AiFillStar className="w-4 h-4 text-yellow-300"></AiFillStar>
          <AiFillStar className="w-4 h-4 text-yellow-300"></AiFillStar>
          <AiFillStar className="w-4 h-4 text-yellow-300"></AiFillStar>
          <AiOutlineStar className="w-4 h-4 text-gray-200 dark:text-gray-600"></AiOutlineStar>
          <span className="w-30 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            {rating}
          </span>
        </div>
        <div className="flex px-5 absolute top-2 right-0">
          <ShareButton
            id={id}
            name={title}
            description={description}
            image={img}
          />
        </div>
        <div className="flex flex-row mb-2">
          <p className="relative text-gray-500 dark:text-gray-400 text-sm pb-5 max-h-[40px] overflow-hidden w-[80%]">
            {description}
          </p>

          <Link
            to={`/details/${id}`}
            state={{ img, title, description, price }}
          >
            <p className="mt-5 text-primary dark:text-purple-700 pointer hover:underline hover:text-secondary mt-4">
              ... mas
            </p>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-[4px]">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${price}/
            <span className="text-gray-400 text-xs font-semibold">
              por hora
            </span>
          </span>          
        </div>
      </div>
      <div className="flex justify-end m-5 dark:text-green-500 font-bold">
        Desde {startingDatetime} hasta {endingDatetime}
      </div>
    </div>
 

  );

}

export default ReservationCard;
