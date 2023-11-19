import React, { useState } from 'react';
import Service from '../Service';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";

const BotonesDesplegables = () => {
  const [mostrarBotones, setMostrarBotones] = useState(false);


  const toggleBotones = () => {
    setMostrarBotones(!mostrarBotones);
  };
  const shareUrlF = "https://www.facebook.com/?locale=es_LA";
  const shareUrlW = "https://www.whatsapp.com/?lang=es_LA"
  const shareUrlT = "/details/25d67998-7025-4d2c-9076-a6fb8325dab0"
  return (
    <div>
      <button onClick={toggleBotones}>
        {mostrarBotones ? 'Cerrar' : 'Compartir'}
      </button>

      {mostrarBotones && (
        <div>
          <FacebookShareButton url = {shareUrlF}>
              <FacebookIcon size={40} round = {true}/>
          </FacebookShareButton>

          <WhatsappShareButton url={shareUrlW}  >
            <WhatsappIcon size={40} round = {true}/>
          </WhatsappShareButton>

          <TwitterShareButton url={shareUrlT}>
            <TwitterIcon size={40} round = {true}/>
          </TwitterShareButton> 
        </div>
      )}
    </div>
  );
};

export default BotonesDesplegables;