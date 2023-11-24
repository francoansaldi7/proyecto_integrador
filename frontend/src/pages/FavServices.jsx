import { useContext, useEffect } from 'react'
import Card from "../components/common/Card";
import { GlobalContext } from '../contexts/globalContext';



function FavServices() {
    const { userFavorites, getAllServices } = useContext(GlobalContext);

    useEffect(() => {        
        const fetchData = async () => {
            const data = await getAllServices();  
        }
        fetchData();
      }, [])
    

        
    return (
        <div className="flex flex-col justify-around gap-5 min-h-[130vh] bg-white md:max-lg:flex">
            <div className="card-container flex justify-around gap-4 flex-col items-center overflow-auto">
                {userFavorites.map((service) => (
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
        </div>
    );

}

export default FavServices;