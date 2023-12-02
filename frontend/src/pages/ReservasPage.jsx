import React, { useState, useContext, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { GlobalContext } from "../contexts/globalContext";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ReservarPage = () => {
  const { getUser } = useContext(GlobalContext);
  const { isLoggedIn } = useContext(AuthContext);
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const description = params.get("description");
  const pricePerHour = params.get("pricePerHour");
  const imgProfileUrl = params.get("imgProfileUrl");
  const from = params.get("from");
  const to = params.get("to");
  const dayQuantity = params.get("dayQuantity");

  const user = isLoggedIn();

  const [userCompleted, setUserCompleted] = useState();

  const fetchData = async () => {
    console.log(user);
    const data = await getUser(user.userId);
    setUserCompleted(data);
    console.log(data);
    return data;
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[1fr_3fr_3fr] w-full min-h-screen bg-gray-950 pt-[200px] text-white">
      <div className="date-info bg-gray-800 w-full h-[100px] p-5 rounded-md grid grid-cols-[2fr_2fr_2fr_2fr] items-center justify-items-center">
        <div className="service-info flex flex-row basis-1/2 col-span-[1/2] gap-4">
          <img
            className="rounded-full max-h-full max-w-[25%] object-cover"
            src={imgProfileUrl}
            alt="img"
          />
          <h4 className="font-bold text-xl">{title}</h4>
        </div>
        <div className="">
          <p className="font-bold text-lg">FECHA DE INICIO</p>

          <div className="grid justify-items-center">{from}</div>
        </div>
        <div className="">
          <p className="font-bold text-lg">FECHA DE FINALIZACION</p>
          <div className="grid justify-items-center">{to}</div>
        </div>
        <div className="">
          <p className="font-bold text-lg">TOTAL DE DIAS</p>
          <div className="grid justify-items-center">{dayQuantity}</div>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-10 w-full h-full p-5">
        <div className="service-info w-full h-full bg-gray-800 rounded-md">
          <div className="m-8">INFORMACION DEL SERVICIO</div>
          <div className="m-8">{description}</div>
        </div>

        <div className=" gap-10 w-full h-full">
          <div className="service-info w-full h-full bg-gray-800 rounded-md p-8">
            DATOS DEL USUARIO
            <br />
            <br />
            <div>Nombre: {userCompleted ? userCompleted.name : "nombre"}</div>
            <div>
              Nombre de usuario:{" "}
              {userCompleted ? userCompleted.username : "nombre"}
            </div>
            <div>Email: {userCompleted ? userCompleted.email : "email"}</div>
          </div>
        </div>
      </div>
      <div className="payment-info w-[70vh] justify-self-center h-full bg-gray-800 rounded-md">
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
            <FormControlLabel control={<Checkbox />} label="Mercado Pago" />
          </FormGroup>
          <h3 className="text-3xl font-extrabold self-center">
            TOTAL A PAGAR:
          </h3>
          <h4 className="text-4xl font-extrabold text-green-300 self-center">
            {" "}
            ${pricePerHour * 8 * dayQuantity}
          </h4>
          <button className="bg-secondary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Reservar Ahora!
          </button>
          
          <Link to="/#section2"className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 flex justify-center" >
            <button>
              Cancelar Reserva!
            </button>
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservarPage;
