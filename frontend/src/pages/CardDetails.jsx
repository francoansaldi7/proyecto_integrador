import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function CardDetails() {

    const {state} = useLocation();
    console.log("State:" + state);

 return (
    <>
    <div className="fixed bg-black opacity-25 h-screen w-screen right-0 top-0 z-10"></div>

    <div className="fixed top-0 bg-secondary bg-gradient-to-b from-secondary to-primary w-[90vw] h-[85vh] flex justify-between flex-col rounded-lg gap-10 z-10 ml-[5vw] mt-[9vh] overflow-y-auto">
      <div className="w-full bg-white flex justify-between rounded-mg">
        <div className="flex items-center">
          <h1 className="text-3xl text-primary font-bold p-10">{state.title}</h1>
          <AiOutlineHeart className="text-3xl text-primary pointer" />
        </div>
        <Link to="/" className="absolute right-[10px] top-[-5px]">
          <p className="text-red-700 ml-14 text-2xl">x</p>
          </Link>
        <div className="flex items-center gap-2 p-2">
          <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiOutlineStar className="w-5 h-5 text-gray-200 dark:text-gray-600"></AiOutlineStar>
            <span className="text-gray-700 dark:text-gray-600 font-semibold mr-20">4.0</span>
        </div>
      </div>
  <div className="fixed container bg-white z-10 p-10 top-0 left-0 rounded-lg">
    <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            
          >
            <SwiperSlide><img src={state.img} alt="test image" /></SwiperSlide>
            <SwiperSlide><img src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            </SwiperSlide>
            <SwiperSlide><img src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            </SwiperSlide>
            <SwiperSlide><img src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            </SwiperSlide>
            <SwiperSlide><img src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            </SwiperSlide>
          </Swiper>
          <div>
            <h1>sdsfd</h1>
            <h1>sdsfd</h1>
          </div>
  </div>
    <div className="flex flex-row p-10">
    <div className="flex gap-3 h-[570px] mt-[10px]">
      <div className="relative">
            <img src={state.img} alt="main image" className="h-full w-[1400px] rounded-md object-cover cursor-pointer" />
            <div className="absolute  top-[10px] right-[10px] z-20 bg-red-300">
              <div>
              
              </div>
              

            </div>
      </div>

        <div className="flex flex-row flex-wrap justify-between gap-2 w-full h-full mt-[2px] rounded-md relative cursor-pointer">
            <img className="w-[48.9%] h-[48.9%] rounded-md object-cover" src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            <img className="w-[48.9%] h-[48.9%] rounded-md object-cover" src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            <img className="w-[48.9%] h-[48.9%] rounded-md object-cover" src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            <img className="w-[48.9%] h-[48.9%] rounded-md object-cover" src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
        </div>
    </div>
    </div>
    <div className="p-5 flex flex-col">
      <h3 className="text-5xl font-bold">{state.title}</h3>
      <h4 className="">${state.price}/per hour</h4>
    </div>
    <div className="p-10 m-10 rounded-md bg-secondary shadow-md shadow-black/30">
      <p className="description text-gray-700">{state.description}</p>
    </div>
    
    <div className="flex justify-end mr-20 mb-10">
    <Link to="" className="w-[200px] text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800">Book Now!</Link>
    </div>

    </div>
    </>
    
  )
}

export default CardDetails