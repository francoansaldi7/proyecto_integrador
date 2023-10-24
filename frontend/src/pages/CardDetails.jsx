import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';


function CardDetails() {

    const {state} = useLocation();
    console.log("State:" + state);

  return (
    <>
    <div className="fixed bg-black opacity-25 h-screen w-screen right-0 top-0"></div>

    <div className="fixed top-64 bg-secondary w-[1200px] h-[500px] flex justify-between flex-row p-10 rounded-md ml-[200px] gap-10">

        <div className="mt-[70px]">
            <img src={state.img} alt="main image" className="h-[250px] w-[500px]" />
            <h1>{state.title}</h1>
        </div>

        <div className="flex flex-row flex-wrap gap-3 w-full">
            <img className="w-[40%]" src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            <img className="w-[40%]" src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            <img className="w-[40%]" src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
            <img className="w-[40%]" src="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" alt="test image" />
        </div>

        <div className=""><Link to="/">x</Link></div>
    
    </div>
    </>
    
  )
}

export default CardDetails