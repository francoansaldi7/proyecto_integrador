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
import NavPagination from "../components/common/NavPagination";


function Home() {
  const {unorganizedServices} = useContext(GlobalContext);
  console.log(unorganizedServices);
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
          '@1.00': {
            slidesPerView: 1,
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
                  title={"Editar con profesionales"}
                  description={"Mejore sus habilidades de edición con el curso de edición de GloCast. Ya sea que sea un novato que busca sumergirse en el mundo de la posproducción o un profesional experimentado que desea perfeccionar su oficio, nuestro curso integral lo tiene cubierto. Explore el arte de la edición de videos y fotografías en un entorno de aprendizaje interactivo y práctico. Nuestros instructores expertos lo guiarán a través de las últimas técnicas y software estándar de la industria, permitiéndole hacer realidad su visión creativa. Únase a nosotros en GloCast y libere su potencial en el mundo de la edición, convirtiendo sus proyectos en obras maestras visuales."}
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
                title={"Estudio fotográfico"}
                description={"Descubra el espacio perfecto para dar vida a su visión creativa en GloCast Photo Studio. Nuestros estudios de última generación brindan a fotógrafos, cineastas y artistas un entorno versátil y bien equipado para capturar imágenes impresionantes. Con iluminación, accesorios y fondos de primer nivel, GloCast es su destino ideal para las necesidades de fotografía y videografía profesional. Ya sea que sea un profesional experimentado o esté comenzando, nuestros estudios están diseñados para inspirar y mejorar sus proyectos. Haga que su próxima sesión sea excepcional en GloCast Photo Studio Rentals."}      moreBig={isNext}
                price={999}
                disccount={true}
              />
    )}
            </SwiperSlide>
            <SwiperSlide className="z-auto flex">
              {({ isNext }) => (
      
              <Card
                img="/testPhoto.jpg"
                title={"Estudio de animación"}
                description={"Adéntrate en el cautivador mundo de la animación con GloCast Animation Studio. Nuestro estudio es un centro para la creatividad, donde artistas y animadores se reúnen para crear contenido animado imaginativo, atractivo y visualmente impresionante. Desde animación 2D hasta animación 3D, ofrecemos un entorno de vanguardia y totalmente equipado para hacer realidad sus ideas. Si eres un animador experimentado o recién estás comenzando tu viaje, GloCast es el lienzo para tus sueños. Nuestro equipo de animadores experimentados y tecnología de última generación garantiza que sus proyectos alcancen nuevas alturas. Únase a nosotros en GloCast Animation Studio y embárquese en una fascinante aventura de animación."}      moreBig={isNext}
                price={789}
                disccount={true}
              />

    )}
            </SwiperSlide>
            <SwiperSlide className="z-auto flex">
              {({ isNext }) => (
      
              <Card
                img="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg"
                title={"Estudio fotográfico"}
                description={"Descubra el espacio perfecto para dar vida a su visión creativa en GloCast Photo Studio. Nuestros estudios de última generación brindan a fotógrafos, cineastas y artistas un entorno versátil y bien equipado para capturar imágenes impresionantes. Con iluminación, accesorios y fondos de primer nivel, GloCast es su destino ideal para las necesidades de fotografía y videografía profesional. Ya sea que sea un profesional experimentado o esté comenzando, nuestros estudios están diseñados para inspirar y mejorar sus proyectos. Haga que su próxima sesión sea excepcional en GloCast Photo Studio Rentals."}      moreBig={isNext}
                price={999}
                disccount={true}
              />
    )}
            </SwiperSlide>
      </Swiper>

        </div>
      </div>

      <div className={`p-5 grid xl:grid-cols-4 grid-flow-row md:grid-cols-3 gap-5 justify-items-center sm:grid-cols-1  bg-white md:max-lg:fle`}>
       
        {unorganizedServices.length < 1 ? (
          <div>
            <h1>No services</h1>
            <p>Para traer las cards desde el backend, parate en el directorio del backend backend/ y ejecuta: mvn clean install, y luego java -jar target/backend-0.0.1-SNAPSHOT.jar

              NOTA: Asegurate de tener java 17 o superior
            </p>
          </div>
        ) : ''}
          {unorganizedServices.map((service) => (
            <Card
              key={service.id}
              id={service.id}
              img={service.imgProfileUrl}
              title={service.title}
              description={service.description}
              price={service.pricePerHour}
              rating={service.rating}
            />
          ))}
        
      
      </div>
      <div className="m-5 overflow-hidden">
        <NavPagination />

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