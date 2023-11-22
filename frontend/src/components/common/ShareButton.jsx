import React, { useState } from 'react';
import '../../styles/ProductShare.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons'

const ShareButton = ({ name, description, image, id }) => {
    const [modal, setModal] = useState(false);
    const [desc, setDesc] = useState('');
    const acortarDescripcion = (descripcion, limitePalabras) => {
        if (descripcion) {
            const palabras = descripcion.split(' ');
            const descripcionAcortada = palabras.slice(0, limitePalabras).join(' ');
            return `${descripcionAcortada}...`;
        }
        return '';
    };
    
    const URL = window.location.href; 
    
    const descripcionAcortada = acortarDescripcion(description, 24);

    const state = {
        value: `${URL}/details/${id}`,
        desc: desc,
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const descCreate = event => {
        setDesc(event.target.value);
    };

    const handleWhatsAppShare = () => {
        const url = state.value;
        const message = `${state.desc} ${url}`;
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleInstagramShare = () => {
        const caption = encodeURIComponent(`${state.desc} ${state.value}`);
        const instagramUrl = 'https://www.instagram.com/';
        
            /* CUANDO PODAMOS USAR LA APP DESDE UN CELULAR, PODREMOS PROBAR ESTO
            if (window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && window.navigator.userAgent.match(/Instagram/g)) {
                window.location.href = `instagram://library?LocalIdentifier=${encodeURIComponent(state.value)}`;
            } else {
                alert('No se puede compartir en Instagram desde un navegador web. Intenta desde la aplicación móvil.');
                window.open(instagramUrl, '_blank', 'width=600,height=400,scrollbars=yes' );
            }*/
        
        alert('No se puede compartir en Instagram desde un navegador web. Intenta desde la aplicación móvil.');
        window.open(instagramUrl, '_blank', 'width=600,height=400,scrollbars=yes' );
    };

    const handleTelegramShare = () => {
        const message = encodeURIComponent(`${state.desc}`);
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(state.value)}&text=${message}`;
        window.open(telegramUrl, '_blank','width=600,height=400,scrollbars=yes');
    };

    const handleFacebookShare = () => {
        const message = state.desc ? `&quote=${encodeURIComponent(state.desc)}` : '';
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(state.value)}${message}`;
        window.open(facebookUrl, '_blank','width=600,height=400,scrollbars=yes');
    };

    const handleTwitterShare = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${state.desc} ${state.value}`)}`;
        window.open(twitterUrl, '_blank','width=600,height=400,scrollbars=yes');
    };

    return (
        <section>
            <button onClick={toggleModal}>
                <FontAwesomeIcon icon="fa-solid fa-share-nodes" size='2xl'/>
            </button>
            {modal && (
                <div>
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <h1>{name}</h1>
                        <p>{descripcionAcortada}</p>
                        <img src={image} alt="" />
                        <div className='display-copies'>
                            <input value={state.value} className='input-disabled' readOnly />
                            <CopyToClipboard text={state.value}>
                                <button className='btn-copy-to-clipboard'>
                                <FontAwesomeIcon className="mx-3 mt-1" icon="fa-regular fa-copy" style={{color: "#ffffff",}} size='2xl'/>
                                </button>
                            </CopyToClipboard>
                        </div>
                        <input value={state.desc} className='input-desc' onChange={descCreate} placeholder='Inserte mensaje adicional' />
                        <div className='buttons-social-networks'>
                            <button onClick={handleWhatsAppShare}>
                                <img src="../../public/whatsapp.png" alt="" className="social-network-img" />
                            </button>
                            <button onClick={handleFacebookShare}>
                                <img src="../../public/facebook.png" alt="" className="social-network-img" />
                            </button>
                            <button onClick={handleTwitterShare}>
                                <img src="../../public/redes-twitter.svg" alt="" className="social-network-img" />
                            </button>
                            <button onClick={handleInstagramShare}>
                                <img src="../../public/redes-instagram.svg" alt="" className="social-network-img" />
                            </button>
                            <button onClick={handleTelegramShare}>
                                <img src="../../public/redes-telegram.svg" alt="" className="social-network-img" />
                            </button>
                        </div>
                        <button className='close-modal' onClick={toggleModal}>
                            <svg className="custom-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M14.5 9.5L9.5 14.5M9.5 9.5L14.5 14.5" strokeLinecap="round" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
};

export default ShareButton;