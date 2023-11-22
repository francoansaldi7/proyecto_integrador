import React from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { GlobalContext } from '../../contexts/globalContext';


const Favorite = ({serviceId, favorites}) => {
    //Contextos
    const { isLoggedIn } = useContext(AuthContext);
    const { addFavorite, deleteFavorite } = useContext(GlobalContext);

    //States
    const [favorite, setFavorite] = useState(false);
    const userInfo = isLoggedIn();

    useEffect(() => {
        if(favorites){
            setFavorite(favorites.some((user) => user.id === userInfo.userId));
        }
      }, [favorites]);

    //Funciones
    const showFavorite = () => {      
        return userInfo.isUser && userInfo.isLoggedIn;
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
            <></>
        }
        </>
    )
}

export default Favorite