import { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../contexts/globalContext";
import { AuthContext } from "../contexts/AuthContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { Reservation } from "../components/Reservation";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


const ReservarPage = () => {

const {getUser, saveReservation}= useContext(GlobalContext)
const {isLoggedIn}= useContext(AuthContext)

const [isLoading, setIsLoading]= useState(false)

const params = new URLSearchParams(window.location.search);
const title = params.get("title");
const description = params.get("description");
const pricePerHour = params.get("pricePerHour");
const imgProfileUrl = params.get("imgProfileUrl");
const from = params.get("from");
const to = params.get("to");
const dayQuantity = params.get("dayQuantity");
const id = params.get("id");

  const user = isLoggedIn();
  
  const [userCompleted, setUserCompleted]= useState()

  const fetchData= async()=>{
  console.log(user)
    const data= await getUser(user.userId)
    setUserCompleted(data)
    console.log(data)
    return data

  }

  const handleSubmit = async() =>{
    setIsLoading(true)
    const reservation = new Reservation(id, user.userId, null, from, to)
    try {
      await saveReservation(reservation);
      setIsLoading(false);
      toast.success("¡Reserva realizada exitosamente!");
      toast.success("¡Se envío un correo con los datos de tu reserva!");
      // redirigir a la página con las reservas del usuario

    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Se produjo un error al realizar la reserva.");
      return;
    }
  }
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="grid grid-rows-[1fr_3fr_3fr] w-full min-h-screen bg-gray-950 pt-[200px] text-white">
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
      {isLoading && (
        <div className="fixed flex z-10 w-full h-full bg-[rgba(0,0,0,0.4)] justify-center items-center">
          <svg
            className="w-20 h-20"
            version="1.1"
            id="L6"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
          >
            <rect
              fill="none"
              stroke="#fff"
              x="25"
              y="25"
              width="50"
              height="50"
            >
              <animateTransform
                attributeName="transform"
                dur="0.5s"
                from="0 50 50"
                to="180 50 50"
                type="rotate"
                id="strokeBox"
                attributeType="XML"
                begin="rectBox.end"
              />
            </rect>
            <rect x="27" y="27" fill="#fff" width="46" height="50">
              <animate
                attributeName="height"
                dur="1.3s"
                attributeType="XML"
                from="50"
                to="0"
                id="rectBox"
                fill="freeze"
                begin="0s;strokeBox.end"
              />
            </rect>
          </svg>
        </div>
      )}
      <div className="date-info bg-gray-900 w-full h-[100px] p-5 rounded-md grid grid-cols-[1fr_2fr_2fr_2fr] items-center justify-items-center">
        <div className="service-info flex items-center  col-span-[1/2] gap-2">
          <img className="rounded-full max-h-full max-w-[50%] object-cover" src={imgProfileUrl} alt="img"  />
          <h4 className="font-bold text-xl">{title}</h4>
        </div>
        <div className="">
          <p className="font-bold text-lg">FECHA DE INICIO</p>
        
          <div className="">{from}</div>
        </div>
        <div className="">
          <p className="font-bold text-lg">FECHA DE FINALIZACION</p>
          <div className="">{to}</div>
        
        </div>
        <div className="">
          <p className="font-bold text-lg">TOTAL DE DIAS</p>
          <div className="">{dayQuantity}</div>
        
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-10 w-full h-full p-5">
        <div className="service-info w-full h-full bg-gray-900 rounded-md">
          <div className="m-8">INFORMACION DEL SERVICIO</div>
          <div className="m-8">{description}
          </div>
        </div>

    


      <div className=" gap-10 w-full h-full">
        <div className="service-info w-full h-full bg-gray-900 rounded-md">
          {userCompleted? userCompleted.name: "nombre"}
          {userCompleted? userCompleted.username: "nombre"}
          {userCompleted? userCompleted.email: "email"}

          
        </div>
      </div>



      </div>
    <div className="payment-info w-[70vh] justify-self-center h-full bg-gray-900 rounded-md">
          <div className="p-8 flex flex-col gap-4">
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
          <h3 className="text-4xl font-extrabold self-center">TOTAL A PAGAR:</h3>
          <h4 className="text-3xl font-extrabold text-green-600 self-center"> ${(pricePerHour * 8) * dayQuantity}</h4>
         
         <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Reservar Ahora!</button>
          </div>
        </div>
      
    </div>
  );
};

export default ReservarPage;
