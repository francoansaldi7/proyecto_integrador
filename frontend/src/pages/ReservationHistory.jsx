import { useContext, useEffect } from 'react'
import Card from "../components/common/Card";
import { GlobalContext } from '../contexts/globalContext';
import ReservationCard from '../components/common/ReservationCard';



function ReservationHistory() {
    const { getUserReservationHistory, userReservationHistory } = useContext(GlobalContext);

    useEffect(() => {        
        const fetchData = async () => {
            const data = await getUserReservationHistory();  
        }
        fetchData();
    }, []);
    

        
    return (
        <div className="flex flex-col justify-around gap-5 min-h-[130vh] bg-white md:max-lg:flex">
            <div className="card-container flex justify-around gap-4 flex-col items-center overflow-auto">
                {userReservationHistory.map((reservation) => (
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
                ))}
            </div>
        </div>
    );

}

export default ReservationHistory;