import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// eslint-disable-next-line react/prop-types
const Carrousel = ({img}) => {
  return (
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
            <SwiperSlide><img src={img} alt="test image" className=" w-full h-[70vh] object-cover" /></SwiperSlide>
            <SwiperSlide><img src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" className="w-full h-[70vh] object-cover" />
            </SwiperSlide>
            <SwiperSlide><img src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" className="w-full h-[70vh] object-cover" />
            </SwiperSlide>
            <SwiperSlide><img src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" className="w-full h-[70vh] object-cover" />
            </SwiperSlide>
            <SwiperSlide><img src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" className="w-full h-[70vh] object-cover" />
            </SwiperSlide>
          </Swiper>
          
  </div>
  )
}

export default Carrousel