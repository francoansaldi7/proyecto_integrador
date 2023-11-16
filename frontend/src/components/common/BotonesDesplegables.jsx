import React, { useState } from 'react';
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
  const shareUrlF = "https://www.facebook.com/"
  const shareUrlW = "https://www.whatsapp.com/?lang=es_LA"
  const shareUrlT = "https://twitter.com/"
  return (
    <div>
      <button onClick={toggleBotones}>
        {mostrarBotones ? 'Cerrar' : 'Compartir'}
      </button>

      {mostrarBotones && (
        <div>
          <FacebookShareButton url={shareUrlF} >
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