import { createContext, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const AuthContex = createContext()



const AuthContexProvider = ({children}) => {

  const navigator = useNavigate();  
    

  const [userData, setUserData] = useState({name:"",lastName:"",email:""})
  const [isLogged, setIsLogged] = useState(false)

  const loginFunction = (email, password, isInBooking , prevPath ) =>{

    axios.post('', {
      username: email,
      password: password
    })
    .then(function (response) {
      if(response.status === 200){
           setIsLogged(true)
          localStorage.setItem("JWT", JSON.stringify(response.data.token));         
          setUserData({name:response.data.user?.firstName, lastName:response.data.user?.lastName, email:response.data.user?.email }) 
          
          navigator(isInBooking ? prevPath : "/Home")
                   
      }
    })
    .catch(function (error) {
      console.log(error);
    });


  }



const data = {
    userData,
    setUserData,
    isLogged,
    setIsLogged,
    loginFunction
}



  return (
      <AuthContex.Provider value={data}>
        {children}
      </AuthContex.Provider>
  )
}

export default AuthContexProvider
