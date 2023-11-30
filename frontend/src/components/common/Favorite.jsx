import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { GlobalContext } from '../../contexts/globalContext';
import PropTypes from 'prop-types';


const Favorite = ({serviceId}) => {
    //Contextos
    const { isLoggedIn } = useContext(AuthContext);
    const { addFavorite, deleteFavorite, userFavorites } = useContext(GlobalContext);

    //States
    const [favorite, setFavorite] = useState(false);
    const userInfo = isLoggedIn();

    useEffect(() => {
        if(userFavorites){
            setFavorite(userFavorites.some((service) => service.id === serviceId));
        }
      }, [userFavorites]);

    //Funciones
    const showFavorite = () => {      
        return userInfo.isUser || userInfo.isAdmin && userInfo.isLoggedIn;
    }

    const toggleFavorite = () => {
        if (favorite){
            deleteFavorite(userInfo.userId, serviceId);
            setFavorite(false);
        }else{
            addFavorite(userInfo.userId, serviceId);
            setFavorite(true);
        }
    }

    return (
        <>
        { showFavorite() ?
        
            <div onClick={() => toggleFavorite()}>
                { favorite ?  
                    <AiFillHeart className="text-3xl text-primary hover:cursor-pointer ml-[-35px] min-[412px]:ml-[-15px]" /> :
                    <AiOutlineHeart className="text-3xl text-primary hover:cursor-pointer ml-[-35px] min-[412px]:ml-[-15px]" />
                }
            </div>:
            <div onClick={()=> window.location.href = `${window.location.origin}/login`}>
                <AiOutlineHeart className="text-3xl text-primary hover:cursor-pointer ml-[-35px] min-[412px]:ml-[-15px]" />
                
            </div>
        }
        </>
    )
}

export default Favorite