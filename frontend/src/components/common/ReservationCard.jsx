import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ShareButton from "./ShareButton";
import { useState } from "react";
import ReviewPopup from "./ReviewPopUp";
import { Rating } from "@mui/material";
/* eslint-disable react/prop-types */
function ReservationCard({
  id,
  serviceId,
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
  const [showReviewPopUp, setShowReviewPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowReviewPopup = () => {
    setShowReviewPopUp(!showReviewPopUp);
  }
  return (
    <>
             {isLoading && (
        <div className="fixed flex z-[100000000] w-full h-full bg-[rgba(0,0,0,0.4)] justify-center items-center">
          <svg
            className="w-20 h-20"
            version="1.1"
            id="L6"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
          >
            <rect
              fill="none"
              stroke="#fff"
              x="25"
              y="25"
              width="50"
              height="50"
            >
              <animateTransform
                attributeName="transform"
                dur="0.5s"
                from="0 50 50"
                to="180 50 50"
                type="rotate"
                id="strokeBox"
                attributeType="XML"
                begin="rectBox.end"
              />
            </rect>
            <rect x="27" y="27" fill="#fff" width="46" height="50">
              <animate
                attributeName="height"
                dur="1.3s"
                attributeType="XML"
                from="50"
                to="0"
                id="rectBox"
                fill="freeze"
                begin="0s;strokeBox.end"
              />
            </rect>
          </svg>
        </div>
      )}
    
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
          <Rating name="rating" precision={0.1} readOnly value={rating}/>
          <span className="w-30 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            {Math.round(rating *100)/100}
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
      <div className="flex flex-col gap-2 p-5 items-center dark:text-purple-400 font-bold">
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleShowReviewPopup}>Comentar</button>
        Desde {startingDatetime} hasta {endingDatetime}
      </div>
      {showReviewPopUp && <ReviewPopup onClose={handleShowReviewPopup} serviceId={serviceId} setIsLoading={setIsLoading}/>}
    </div>
 
</>
  );

}

export default ReservationCard;
