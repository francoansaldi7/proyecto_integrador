/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// eslint-disable-next-line react/prop-types
const Carrousel = ({img, gallery}) => {

  const navigate = useNavigate();

  return (
    <>
    <div className="bg-black/80 min-h-screen min-w-screen z-20 fixed top-0">
  
    </div>
    <div className="fixed container bg-secondary z-10 p-4  rounded-lg w-[70vw] mx-[15vw] my-[10vh] top-0 left-0">
          
    <Swiper
            spaceBetween={10}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            <SwiperSlide><img src={img} alt="test image" className="rounded-md w-full h-[70vh] object-cover" /><button onClick={()=>navigate(-1)} className="absolute right-[10px] top-[-5px]">
            <p className="text-red-700 mr-3 mt-2 text-2xl">x</p>
          </button></SwiperSlide>
            {gallery.map((img, index) => (
              <SwiperSlide key={index}><img src={img.imageUrl} alt="test image" className="rounded-md w-full h-[70vh] object-cover" /><button onClick={()=>navigate(-1)} className="absolute right-[10px] top-[-5px]">
              <p className="text-red-700 mr-3 mt-2 text-2xl">x</p>
            </button></SwiperSlide>
            ))}
            
            
    </Swiper>
          
  </div>
      </>

  )
}

export default Carrousel