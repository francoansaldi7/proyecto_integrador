/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Card from "../components/common/Card";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import PrincipalBanner from "../components/common/PrincipalBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { GlobalContext } from "../contexts/globalContext";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CategorysSection from "../components/common/CategorysSection";
import ProductsAndServices from "./ProductsAndServices";


function Home() {
  const {services} = useContext(GlobalContext);
  console.log(services);
  return (
    <>
      <PrincipalBanner />
      <div className="flex flex-col gap-7 md:p-10 bg-background md:max-lg:flex">
        <CategorysSection />
        
        <span className="h-[1px] w-full bg-secondary opacity-25"></span>
        <div className="featured-services flex flex-wrap mt-5 gap-[-20px]">
        
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper py-[90px] self-center"
        
      >
        <SwiperSlide className="z-auto flex">
              {({ isNext }) => (
                <Card
                  img="https://crehana-blog.imgix.net/media/filer_public/78/d5/78d5f21a-c41b-4bac-9a03-7279a1120436/estudios-de-animacion.jpg"
                  title={"Edit with pros"}
                  description={"Elevate your editing skills with GloCast's Editing Course. Whether you're a novice looking to dive into the world of post-production or a seasoned pro aiming to refine your craft, our comprehensive course has you covered. Explore the art of video and photo editing in a hands-on, interactive learning environment. Our expert instructors will guide you through the latest industry-standard software and techniques, empowering you to bring your creative vision to life. Join us at GloCast and unlock your potential in the world of editing, turning your projects into visual masterpieces."}
                  moreBig={isNext}
                  price={1990}
                  disccount={true}
                />
      
    )}
            </SwiperSlide>
            <SwiperSlide className="z-auto flex">
              {({ isNext }) => (
      
              <Card
                img="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg"
                title={"Photo Studio"}
                description={"Discover the perfect space to bring your creative vision to life at GloCast Photo Studio. Our state-of-the-art studios provide photographers, filmmakers, and artists with a versatile and well-equipped environment to capture stunning visuals. With top-notch lighting, props, and backdrops, GloCast is your go-to destination for professional photography and videography needs. Whether you're a seasoned pro or just starting out, our studios are designed to inspire and elevate your projects. Make your next shoot exceptional at GloCast Photo Studio Rentals."}      moreBig={isNext}
                price={999}
                disccount={true}
              />
    )}
            </SwiperSlide>
            <SwiperSlide className="z-auto flex">
              {({ isNext }) => (
      
              <Card
                img="testPhoto.jpg"
                title={"Animation Studio"}
                description={"Step into the captivating world of animation with GloCast Animation Studio. Our studio is a hub for creativity, where artists and animators come together to craft imaginative, compelling, and visually stunning animated content. From 2D to 3D animation, we offer a cutting-edge, fully-equipped environment to bring your ideas to life. Whether you're a seasoned animator or just starting your journey, GloCast is the canvas for your dreams. Our team of experienced animators and state-of-the-art technology ensures that your projects soar to new heights. Join us at GloCast Animation Studio and embark on a mesmerizing animation adventure."}      moreBig={isNext}
                price={789}
                disccount={true}
              />

    )}
            </SwiperSlide>
            <SwiperSlide className="z-auto flex">
              {({ isNext }) => (
      
              <Card
                img="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg"
                title={"Photo Studio"}
                description={"Discover the perfect space to bring your creative vision to life at GloCast Photo Studio. Our state-of-the-art studios provide photographers, filmmakers, and artists with a versatile and well-equipped environment to capture stunning visuals. With top-notch lighting, props, and backdrops, GloCast is your go-to destination for professional photography and videography needs. Whether you're a seasoned pro or just starting out, our studios are designed to inspire and elevate your projects. Make your next shoot exceptional at GloCast Photo Studio Rentals."}      moreBig={isNext}
                price={999}
                disccount={true}
              />
    )}
            </SwiperSlide>
      </Swiper>

        </div>
      </div>

      <div className={`grid grid-cols-${Math.ceil(services.length / 3)} grid-flow-row md:gr gap-5 justify-items-center  bg-white md:max-lg:fle`}>
        {services.length < 1 ? (
          <div>
            <h1>No services</h1>
            <p>Para traer las cards desde el backend, parate en el directorio raiz (proyecto-integrador) y ejecuta el comando `docker-compose up` Esto levantara el backend, y luego recarga las página</p>
          </div>
        ) : ''}
          {services.map((service) => (
            <Card
              key={service.id}
              img={service.imgProfileUrl}
              title={service.title}
              description={service.description}
              price={service.pricePerHour}
            />
          ))}
        
      
      </div>
    
    <section id="section1">
    <hr className="h-[1px] w-full bg-secondary opacity-50"></hr>
      <ProductsAndServices />
    </section>
    
    <section id="section2">
    <hr className="h-[1px] w-full bg-secondary opacity-50"></hr>

      <AboutUs />
    </section>
    
    <section id="section3">
    <hr className="h-[1px] w-full bg-secondary opacity-50"></hr>
      <Contact />
    </section>

      <Outlet />
    </>
  );
}

export default Home;