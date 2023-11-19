import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const BotonesDesplegables = () => {
  const [mostrarBotones, setMostrarBotones] = useState(false);


  const toggleBotones = () => {
    setMostrarBotones(!mostrarBotones);
  };
  const shareUrlF = "https://www.facebook.com/?locale=es_LA";
  const shareUrlW = "https://www.whatsapp.com/?lang=es_LA";
  const shareUrlT = "https://www.facebook.com/?locale=es_LA";
  return (
    <div>
      <button onClick={toggleBotones}>
        {mostrarBotones ? <p className="text-red-700 mr-3 mt-2 text-xl">x</p> : <FontAwesomeIcon icon="fa-solid fa-share-nodes" size='xl'/>}
      </button>

      {mostrarBotones && (
        <div>
          <FacebookShareButton url = {shareUrlF}>
              <FacebookIcon size={30} round = {true}/>
          </FacebookShareButton>

          <WhatsappShareButton url={shareUrlW}  >
            <WhatsappIcon size={30} round = {true}/>
          </WhatsappShareButton>

          <TwitterShareButton  url={shareUrlT}>
            <TwitterIcon size={30} round = {true}/>
          </TwitterShareButton> 
        </div>
      )}
    </div>
  );
};

export default BotonesDesplegables;