import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/globalContext';
import ReservationCard from '../components/common/ReservationCard';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


function ReservationHistory() {
    const { getUserReservationHistory } = useContext(GlobalContext);
    const [userReservationHistory, setUserReservationHistory] = useState([]);
    const {isLoggedIn} = useContext(AuthContext);
    const user = isLoggedIn();

    useEffect(() => {        
        const fetchData = async () => {
            const data = await getUserReservationHistory(user.userId);  
            setUserReservationHistory(data);

        }
        fetchData();
    }, []);
    
    return (
        <>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        <div className="background-shape absolute  h-96 w-96 rounded-full bg-primary-dark blur-3xl right-[50%] animate-slowFadeAndPosition "></div>
        <div className="flex flex-col justify-around gap-5 min-h-[130vh] e md:max-lg:flex bg-gray-950 p-5 ">
            <h1 className='text-white text-8xl z-10 font-extrabold text-center'>Mis Reservas</h1>
            <div className="status-section w-full ">
                <div className="container relative inline">
                    <h4 className='text-white text-2xl font-bold inline'>Confirmadas</h4>
                <div className='bg-green-500 h-2 w-2 rounded-full absolute top-[-10px] right-[-10px] z-10 animate-ping'></div>
                

                </div>
                <div className='bg-gray-900 h-[.5px] w-full mb-5'></div>
            <div className="card-container flex justify-around gap-4 flex-col items-center overflow-auto dark">
                {userReservationHistory.map((reservation) => {
                    
                    return reservation.status.id == 1 && (
                        <ReservationCard
                            key={reservation.id}
                            id={reservation.id}
                            serviceId={reservation.service.id}
                            img={reservation.service.imgProfileUrl}
                            title={reservation.service.title}
                            description={reservation.service.description}
                            price={reservation.service.pricePerHour}
                            rating={reservation.service.rating}
                            startingDatetime={reservation.startingDatetime}
                            endingDatetime={reservation.endingDatetime}                                  
                        />
                    )
                    })}
            </div>
            </div>

            <div className="status-section w-full ">
                <div className="container relative inline">
                    <h4 className='text-white text-2xl font-bold inline'>Pendientes</h4>
                <div className='bg-orange-500 h-2 w-2 rounded-full absolute top-[-10px] right-[-10px] z-10 animate-ping'></div>
                

                </div>
                <div className='bg-gray-900 h-[.5px] w-full mb-5'></div>
            <div className="card-container flex justify-around gap-4 flex-col items-center overflow-auto dark">
                {userReservationHistory.map((reservation) => {
                    
                    return reservation.status.id === 2 && (
                        <ReservationCard
                            key={reservation.id}
                            id={reservation.id}
                            img={reservation.service.imgProfileUrl}
                            title={reservation.service.title}
                            description={reservation.service.description}
                            price={reservation.service.pricePerHour}
                            rating={reservation.service.rating}
                            startingDatetime={reservation.startingDatetime}
                            endingDatetime={reservation.endingDatetime}                                  
                        />
                    )
                    })}
            </div>
            </div>
        </div>
        </>
    );

}

export default ReservationHistory;