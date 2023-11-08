/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import aboutUsAnimation from "../aboutUsAnimation.json";

function AboutUs() {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-40 hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Lottie animationData={aboutUsAnimation} />
        </div>    

        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="text-primary max-w-2xl mb-4 mt-16 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Nuestra historia</h1>
            <p className="max-w-2xl mb-6 mt-10 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Bienvenido a GloCast, su único destino para desbloquear su potencial de creación de contenido. Existimos para hacer realidad sus sueños visuales, ya sea que esté buscando fotógrafos profesionales, alquiler de estudios o equipos fotográficos de primer nivel.
             En GloCast creemos en el poder de la narración visual. Somos un equipo apasionado de fotógrafos y camarógrafos dedicados a capturar momentos, emociones y recuerdos en su forma más auténtica y hermosa. Nuestra misión es convertir sus ocasiones especiales en historias inolvidables que serán atesoradas por generaciones.
             Te invitamos a unirte a nosotros en un viaje visual a través de los momentos más bellos de la vida. Estamos comprometidos a convertir sus preciados recuerdos en obras de arte que serán atesoradas toda la vida. Capturemos la magia; Tu historia no merece menos.</p>

            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"><Link to="#section3"><button className="hover:text-primary underline">Contacto</button></Link> Contáctenos hoy para discutir cómo podemos ser parte de su próximo evento o proyecto.</p>

        </div>            
    </div>
</section>
  )
}

export default AboutUs