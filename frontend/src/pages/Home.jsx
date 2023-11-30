/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Card from "../components/common/Card";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import PrincipalBanner from "../components/common/PrincipalBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { GlobalContext } from "../contexts/globalContext";
import { LoadingOutlined } from '@ant-design/icons';


// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CategorysSection from "../components/common/CategorysSection";
import ProductsAndServices from "./ProductsAndServices";
import NavPagination from "../components/common/NavPagination";
import { useState } from "react";
import ServicesSearchBar from "../components/common/ServicesSearchBar";
import AddButtonWhatApp from "../components/common/AddButtonWhatApp";

function Home() {
  const {unorganizedServices, getAllServices ,setServices, loadingServices} = useContext(GlobalContext);
  const [thereAreFewCards, setThereAreFewCards] = useState(true);
  // Map service to bring 4 or 5 random cards to slider + remove harcoded cards

  useEffect(() => {
    if (unorganizedServices.length < 3) {
      setThereAreFewCards(true);
    } else {
      setThereAreFewCards(false);
    }
  }, [unorganizedServices]);

  useEffect(() => {
    const fetchData = async () => {
      if(unorganizedServices.length < 1){
        const data = await getAllServices();
        setServices(data.content);
      }   
    }
    fetchData()
  }, [])
  console.log(unorganizedServices);
  return (
    <>
      <PrincipalBanner />
      <div className="p-10 bg-white">
        <ServicesSearchBar />
      </div>
      <div className="flex flex-col gap-7 md:p-10 bg-background md:max-lg:flex">
        <CategorysSection />
        
        <span className="h-[1px] w-full bg-secondary opacity-25"></span>
        <div className="featured-services flex flex-wrap mt-5 gap-[-20px]">
        {thereAreFewCards && (
           <Swiper
          id="mySwiperWhenThereAreFewCards"
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
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiperWhenThereAreFewCards py-[90px] self-center"
          
        >
        {unorganizedServices.map((service) => (
          <SwiperSlide key={service.id} className="z-auto flex">
          {({ isNext }) => (
            <Card
              key={service.id}
              id={service.id}
              img={service.imgProfileUrl}
              title={service.title}
              description={service.description}
              moreBig={isNext}
              price={service.pricePerHour}
              rating={service.rating}
              disccount={true}

            />
              )}
        </SwiperSlide>
        ))}
        
      </Swiper>
        )} 
        
        {!thereAreFewCards && (
          <Swiper
          id="mySwiperWhenThereAreSeveralCards"
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
          className="mySwiperWhenThereAreSeveralCards py-[90px] self-center"
          
        >
        {unorganizedServices.slice(0, 4).map((service) => (
          <SwiperSlide key={service.id} className="z-auto flex">
          {({ isNext }) => (
            <Card
              key={service.id}
              id={service.id}
              img={service.imgProfileUrl}
              title={service.title}
              description={service.description}
              moreBig={isNext}
              price={service.pricePerHour}
              rating={service.rating}
              disccount={true}

            />
              )}
        </SwiperSlide>
        ))}
        
      </Swiper>
        )}
        

        </div>
      </div>

      <div id="section1" className={"p-5 grid xl:grid-cols-4 grid-flow-row md:grid-cols-3 gap-5 justify-items-center sm:grid-cols-1 bg-white md:max-lg:fle"}>

        {loadingServices? (
          <div id="section1">
            <LoadingOutlined
              className="text-4xl text-primary ml-[73vw]"
              spin
            />

            {/* <h1>No services</h1>
            <p>Para traer las cards desde el backend, parate en el directorio del backend backend/ y ejecuta: mvn clean install, y luego java -jar target/backend-0.0.1-SNAPSHOT.jar

              NOTA: Asegurate de tener java 17 o superior
            </p> */}

          </div>
        ) : unorganizedServices.map((service) => (
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

      <div className="overflow-hidden bg-white">
        <NavPagination />
      </div>
    
    {/* <section id="section1">
    <hr className="h-[1px] w-full bg-secondary opacity-50"></hr>

      <ProductsAndServices />

    </section> */}
    
    <section id="section2">
    <hr className="h-[1px] w-full bg-secondary opacity-50"></hr>

      <AboutUs />
    </section>
  
    <section id="section3">
    <hr className="h-[1px] w-full bg-secondary opacity-50"></hr>
      <Contact />
    </section>
    <div className="fixed bottom-8 right-5">
    <AddButtonWhatApp/>
    </div>
      <Outlet />
      
    </>
  );
}

export default Home;