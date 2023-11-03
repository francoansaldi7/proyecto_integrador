/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// eslint-disable-next-line react/prop-types
const Carrousel = ({img, gallery}) => {
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
            <SwiperSlide><img src={img} alt="test image" className="rounded-md w-full h-[70vh] object-cover" /></SwiperSlide>
            {gallery.map((img, index) => (
              <SwiperSlide key={index}><img src={img.imageUrl} alt="test image" className="rounded-md w-full h-[70vh] object-cover" /></SwiperSlide>
            ))}
            
          </Swiper>
          
  </div>
      </>

  )
}

export default Carrousel