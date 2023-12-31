/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import Carrousel from "../components/common/Carrousel";
import { GlobalContext } from "../contexts/globalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardDetails() {
  let [showCarousel, setShowCarrousel] = useState(false);
  const { services } = useContext(GlobalContext);
  const [service, setService] = useState(null);
  const navigate = useNavigate();
  //extraer id de la url
  const id = useLocation().pathname.split("/").pop();
  console.log(id);

  useEffect(() => {
    console.log(services);
    let serviceFound = services.find((service) => service.id === id);
    console.log(serviceFound);
    if (serviceFound) {
      console.log("serviceFound: " + serviceFound);
      setService(serviceFound);
    } else {
      console.log("service not found");
      return navigate("/");
    }
  }, [services]);
  const { state } = useLocation();
  console.log("State:" + state);

  const handleCarrousel = () => {
    setShowCarrousel(!showCarousel);
    console.log("handleCarrousel");
  };

  return (
    <>
      <div className="fixed bg-black opacity-25 h-screen w-screen right-0 top-0 z-10"></div>

      <div className="xl:ml-2 fixed top-0 bg-secondary bg-gradient-to-b from-secondary to-primary w-[97vw] h-[85vh] flex justify-between flex-col rounded-lg gap-10 z-50 ml-[1vw] mt-[9vh] overflow-y-auto min-[375px]:w-[366px] min-[414px]:w-[405px] min-[414px]:ml-1 min-[390px]:ml-3 min-[393px]:ml-[13px] min-[412px]:ml-5 md:w-[750px] md:ml-2 min-[820px]:w-[800px] min-[912px]:w-[890px] min-[540px]:w-[530px] lg:w-[1010px] xl:w-[1260px] 2xl:ml-[300px]">
        <div className="w-full bg-white flex justify-between rounded-mg md:w-[100%] min-[375px]:justify-center md:justify-start">
          <div className="flex items-center">
            <h1 className="text-3xl text-primary font-bold p-10 ml-[-30px] min-[375px]:text-sm md:text-2xl min-[412px]:text-xl min-[280px]:text-sm">
              {service?.title}
            </h1>
            <AiOutlineHeart className="text-3xl text-primary pointer ml-[-35px] min-[412px]:ml-[-15px]" />
          </div>
          <Link to="/" className="absolute right-[10px] top-[-5px]">
            <p className="text-red-700 mr-3 mt-2 text-2xl">x</p>
          </Link>
          
        </div>
        {showCarousel ? <Carrousel img={service?.imgProfileUrl} gallery={service?.gallery} /> : null}
        <div className="flex flex-row p-2">
          <div className="grid h-[300px] lg:grid-cols-2 lg:grid-rows-1 md:grid-cols-1 md:grid-rows-2 gap-3 md:h-[570px] mt-[10px] sm:grid-cols-1">
            <div className="">
              <img
                src={service?.imgProfileUrl}
                alt="main image"
                className="rounded-md h-full w-full object-cover cursor-pointer"
                onClick={() => handleCarrousel()}
              />
            </div>

            <div
              className="lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:flex-wrap  justify-between gap-2 w-full lg:h-full  mt-[2px] rounded-md relative cursor-pointer md:h-52 md:grid md:grid-cols-4 sm:hidden hidden "
              onClick={() => handleCarrousel()}
            >
              {service?.gallery.map((image) => (
                <img
                  key={image.id}
                  className=" rounded-md object-cover w-full md:h-52 lg:h-full"
                  src={image.imageUrl}
                  alt="test image"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-14 mt-[-60px] text-[130%]">
          <button
            className="hover:text-pink-200 text-slate-200 mt-6 md:mt-0 lg:mt-5"
            onClick={() => handleCarrousel()}>
            ver mas...
          </button>
        </div>

        
        <div className="p-5 ml-6 mt-[-5px] flex flex-col">
          <h3 className="text-5xl font-bold text-pink-200">{service?.title}</h3>
          <h4 className="text-pink-200 mt-2">${service?.pricePerHour}/por hora</h4>
        </div>

        <div className="flex items-center gap-2 p-2 min-[375px]:gap-0 min-[375px]:p-0 min-[375px]:ml-10 md:ml-10 min-[280px]:text-white min-[280px]:ml-10 min-[540px]:ml-10 min-[412px]:ml-10 min-[393px]:ml-10">
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiOutlineStar className="w-5 h-5 text-gray-200 dark:text-gray-600"></AiOutlineStar>
            <span className="text-gray-700 dark:text-gray-600 font-semibold mr-20 md:ml-2 md:text-white md:text-lg min-[412px]:text-white min-[412px]:ml-2 min-[280px]:text-white min-[280px]:ml-1">
              {service?.rating}
            </span>
          </div>

        <div className="p-10 m-10 mt-[-10px] rounded-md bg-secondary shadow-md shadow-black/30">
          <p className="description text-white text-lg">{service?.description}</p>
        </div>
        <div className="p-10 m-10 rounded-md bg-secondary shadow-md shadow-black/30">
          <h1 className="font-bold text-white text-2xl pb-2">Caracteristicas</h1>
          <hr className="pb-4"></hr>
          <div className="grid gap-4 grid-cols-3">
          
          {service?.characteristics.map((characteristic) => 
            <div className="flex justify-start space-x-2 hover:space-x-8" key={characteristic.id}>
              <FontAwesomeIcon icon={characteristic.iconName} />
              <p className="description text-white flex-col">{characteristic.name}</p>
            </div>
          )}

          </div>
        </div>

        <div className="flex justify-end mr-20 mb-10">
          <Link
            to=""

            className="w-[120px] text-white bg-secondary hover:bg-pink-200 hover:text-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800">
            Reservar ahora!
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardDetails;
