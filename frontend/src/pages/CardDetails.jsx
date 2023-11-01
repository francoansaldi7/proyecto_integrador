import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import Carrousel from "../components/common/Carrousel";
import { GlobalContext } from "../contexts/globalContext";

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
    let serviceFinded = services.find((service) => service.id === id);
    console.log(serviceFinded);
    if (serviceFinded) {
      console.log("serviceFinded: " + serviceFinded);
      setService(serviceFinded);
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

      <div className="fixed top-0 bg-secondary bg-gradient-to-b from-secondary to-primary w-[90vw] h-[85vh] flex justify-between flex-col rounded-lg gap-10 z-50 ml-[5vw] mt-[9vh] overflow-y-auto">
        <div className="w-full bg-white flex justify-between rounded-mg">
          <div className="flex items-center">
            <h1 className="text-3xl text-primary font-bold p-10">
              {service?.title}
            </h1>
            <AiOutlineHeart className="text-3xl text-primary pointer" />
          </div>
          <Link to="/" className="absolute right-[10px] top-[-5px]">
            <p className="text-red-700 mr-3 mt-2 text-2xl">x</p>
          </Link>
          <div className="flex items-center gap-2 p-2">
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiFillStar className="w-5 h-5 text-yellow-300"></AiFillStar>
            <AiOutlineStar className="w-5 h-5 text-gray-200 dark:text-gray-600"></AiOutlineStar>
            <span className="text-gray-700 dark:text-gray-600 font-semibold mr-20">
              {service?.rating}
            </span>
          </div>
        </div>
        {showCarousel ? <Carrousel img={service?.imgProfileUrl} gallery={service?.gallery} /> : null}
        <div className="flex flex-row p-10">
          <div className="grid lg:grid-cols-2 lg:grid-rows-1 md:grid-cols-1 md:grid-rows-2 gap-3 h-[570px] mt-[10px] sm:grid-cols-1">
            <div className="">
              <img
                src={service?.imgProfileUrl}
                alt="main image"
                className="rounded-md h-full w-full object-cover cursor-pointer"
                onClick={() => handleCarrousel()}
              />
            </div>

            <div
              className="lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:flex-wrap  justify-between gap-2 w-full lg:h-full  mt-[2px] rounded-md relative cursor-pointer md:h-52 md:grid md:grid-cols-4 sm:hidden "
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
            className="hover:text-violet-600"
            onClick={() => handleCarrousel()}
          >
            view more...
          </button>
        </div>
        <div className="p-5 ml-7 flex flex-col">
          <h3 className="text-5xl font-bold">{service?.title}</h3>
          <h4 className="">${service?.price}/per hour</h4>
        </div>
        <div className="p-10 m-10 rounded-md bg-secondary shadow-md shadow-black/30">
          <p className="description text-white">{service?.description}</p>
        </div>

        <div className="flex justify-end mr-20 mb-10">
          <Link
            to=""
            className="w-[120px] text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800"
          >
            Book Now!
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardDetails;
