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
            <SwiperSlide><img src="https://img.freepik.com/free-photo/female-editor-using-stylus-graphic-tablet-retouch-photo-creating-professional-photography-content-production-freelancer-editing-picture-with-creative-retouching-software-close-up_482257-48037.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698019200&semt=ais" alt="test image" className="w-full h-[70vh] object-cover" />
            </SwiperSlide>
            <SwiperSlide><img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D" alt="test image" className="w-full h-[70vh] object-cover" />
            </SwiperSlide>
            <SwiperSlide><img src="https://www.iim.fr/ecole-web/wp-content/uploads/2018/10/illu-studio-.jpg" alt="test image" className="w-full h-[70vh] object-cover" />
            </SwiperSlide>
            <SwiperSlide><img src="https://music.utexas.edu/sites/bsom/files/styles/utexas_image_style_2000w/public/2022-11/EMSFacilities005.jpg?itok=hYmAjl6q" alt="test image" className="w-full h-[70vh] object-cover" />
            </SwiperSlide>
          </Swiper>
          
  </div>
  )
}

export default Carrousel