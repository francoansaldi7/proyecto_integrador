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
        <>
        <div className="background-shape absolute h-96 w-96 rounded-full bg-primary-dark blur-3xl right-[50%] animate-slowFadeAndPosition"></div>
        <div className="flex flex-col justify-around min-h-[130vh] bg-gray-950 md:max-lg:flex">
        <h1 className='text-purple-500 underline underline-offset-8 text-6xl z-10 font-bold text-center mt-10'>Mis Favoritos</h1>
            <div className="card-container flex flex-wrap justify-around gap-4 flex-col items-center overflow-auto mb-60">            
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
        </>
    );

}

export default FavServices;