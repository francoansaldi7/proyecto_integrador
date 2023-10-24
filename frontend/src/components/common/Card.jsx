//import { useState } from "react";

/* eslint-disable react/prop-types */
function Card({img, title, description}) {

  //const [message, setMessage] = useState("");

  function x (){
    //desarrollar función del modal que muestra la imagen principal en grande, 4 imagenes mas pequeñas a la derecha
    // un boton de "mostrar más" el cual abra un carousel con todas las imagenes. 

  }

  function y (){
    // desarrollar función para mostrar la descripción entera del servicio
  }

  return (
    <div onClick={x} className="flex h-[370px] w-[450px] flex-col gap-5 bg-secondary rounded-md shadow-lg shadow-secondary">
      <img src={img} alt="" className="service-profile h-[230px] rounded" />
      <h4 className="text-white font font-semibold ml-2 mt-[-15px]">{title}</h4>
      <p className='ml-2 mt-[-15px]'>{description} ... <button onClick={y} className='text-sm italic'>show more</button></p>
    </div>
  )
}

export default Card