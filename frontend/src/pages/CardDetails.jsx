import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import Carrousel from "../components/common/Carrousel";


function CardDetails() {
  let [showCarousel, setShowCarrousel] = useState(false);
    const {state} = useLocation();
    console.log("State:" + state);

    const handleCarrousel = () => {
      setShowCarrousel(!showCarousel);
      console.log("handleCarrousel");
    }

 return (
    <>
    <div className="fixed bg-black opacity-25 h-screen w-screen right-0 top-0 z-10"></div>

    <div className="fixed top-0 bg-secondary bg-gradient-to-b from-secondary to-primary w-[90vw] h-[85vh] flex justify-between flex-col rounded-lg gap-10 z-10 ml-[5vw] mt-[80px] overflow-y-auto">
      <div className="w-full bg-white flex flex-wrap justify-around rounded-mg">
        <div className="flex items-center">
          <h1 className="text-3xl text-primary font-bold p-10">{state.title}</h1>
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
            <span className="text-gray-700 dark:text-gray-600 font-semibold mr-20">4.0</span>
        </div>
      </div>
  {showCarousel ? <Carrousel img={state.img} /> : null}
    <div className="flex flex-row p-10">
    <div className="detail-img-container flex gap-3 h-[570px] mt-[10px]">
        <div className="firat-detail-img" >
              <img src={state.img} alt="main image" className="h-full w-[1400px] rounded-md object-cover cursor-pointer" onClick={()=> handleCarrousel()} />
        </div>  

        <div className="detail-imgs flex flex-wrap gap-2 w-full h-full mt-[2px] rounded-md relative cursor-pointer" onClick={()=> handleCarrousel()}>
            <img className="rounded-md object-cover detail-img" src="https://img.freepik.com/free-photo/female-editor-using-stylus-graphic-tablet-retouch-photo-creating-professional-photography-content-production-freelancer-editing-picture-with-creative-retouching-software-close-up_482257-48037.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698019200&semt=ais" alt="test image" />
            <img className="rounded-md object-cover detail-img" src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D" alt="test image" />
            <img className="rounded-md object-cover detail-img" src="https://www.iim.fr/ecole-web/wp-content/uploads/2018/10/illu-studio-.jpg" alt="test image" />
            <img className="rounded-md object-cover detail-img" src="https://music.utexas.edu/sites/bsom/files/styles/utexas_image_style_2000w/public/2022-11/EMSFacilities005.jpg?itok=hYmAjl6q" alt="test image" />
        </div>
    </div>
    </div>
    <div className="flex justify-end mr-14 mt-[-60px] text-[130%]">
        <button  className="hover:text-violet-600" onClick={()=> handleCarrousel()}>view more...</button>
    </div>
    <div className="p-5 ml-7 flex flex-col">
      <h3 className="detail-title text-5xl font-bold">{state.title}</h3>
      <h4 className="">${state.price}/per hour</h4>
    </div>
    <div className="p-10 mx-10 rounded-md bg-secondary shadow-md shadow-black/30">
      <p className="detail-description text-white">{state.description}</p>
    </div>
    
    <div className="flex justify-end mr-20 mb-10">
    <Link to="" className="w-[120px] text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-dark dark:hover:bg-secondary-dark dark:focus:ring-violet-800">Book Now!</Link>
    </div>

    </div>
    </> 
  )
}

export default CardDetails