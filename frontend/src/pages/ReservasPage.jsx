import React, { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../contexts/globalContext";
import { AuthContext } from "../contexts/AuthContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";


const ReservarPage = () => {

const {getUser}= useContext(GlobalContext)
const {isLoggedIn}= useContext(AuthContext)

  const[description, setDescription]= useState("");
  const [user, setUser] = useState(isLoggedIn());
  
  const [userCompleted, setUserCompleted]= useState()

  const getData=()=>{
   return localStorage.getItem("description");
  }

  const fetchData= async()=>{
  console.log(user)
    const data= await getUser(user.userId)
    setUserCompleted(data)
    console.log(data)
    return data

  }
  useEffect(()=>{
    setDescription(getData());
    fetchData();
  },[])

  return (
    <div className="grid grid-rows-3 w-full min-h-screen bg-gray-950 pt-[200px] text-white">
      <div className="date-info bg-gray-900 w-full h-[100px] p-5 rounded-md">
        INFORMACION TIPO FECHAS, CANTIDAD DE DIAS, ETC
      </div>
      <div className=" grid grid-cols-2 gap-10 w-full h-full p-5">
        <div className="service-info w-full h-full bg-gray-900 rounded-md">
          <div className="m-8">INFORMACION DEL SERVICIO</div>
          <div className="m-8">{description}
          </div>
        </div>

        <div className="payment-info w-full h-full bg-gray-900 rounded-md">
          <div className="m-8">
          SELECCIONE UNA FORMA DE PAGO
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Tarjeta de Débito"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tarjeta de Crédito"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Mercado Pago"
            />
          </FormGroup>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-10 w-full h-full p-5">
        <div className="service-info w-full h-full bg-gray-900 rounded-md">
          Nombre: {userCompleted? userCompleted.name: "nombre"}
          <br></br>
          User Name: {userCompleted? userCompleted.username: "nombre"}
          <br />
          Email: {userCompleted? userCompleted.email: "email"}

          <div></div>
        </div>
      </div>

      
    </div>
  );
};

export default ReservarPage;
