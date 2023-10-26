
import { Link } from 'react-router-dom';

function Carousel() {
  return (
    <>
    <div className="fixed bg-black opacity-25 h-screen w-screen right-0 top-0 z-10"></div>

    <div className="fixed top-0 bg-secondary bg-gradient-to-b from-secondary to-primary w-[90vw] h-[85vh] flex justify-between flex-col rounded-lg gap-10 z-10 ml-[5vw] mt-[9vh] overflow-y-auto">
    
    <Link to="/" className="absolute right-[10px] top-[-5px]">
        <p className="text-red-700 mr-3 mt-2 text-2xl">x</p>
    </Link>
    </div>
    </>
  )
}

export default Carousel