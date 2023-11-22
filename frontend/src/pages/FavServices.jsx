import { useState, useEffect } from 'react'
import Card from "../components/common/Card";

const Cards = [
    {
        id:1,
        img:"testPhoto.jpg", 
        title:"Estudio de animación", 
        description:"Adéntrate en el cautivador mundo de la animación con GloCast Animation Studio. Nuestro estudio es un centro para la creatividad, donde artistas y animadores se reúnen para crear contenido animado imaginativo, atractivo y visualmente impresionante. Desde animación 2D hasta animación 3D, ofrecemos un entorno de vanguardia y totalmente equipado para hacer realidad sus ideas. Si eres un animador experimentado o recién estás comenzando tu viaje, GloCast es el lienzo para tus sueños. Nuestro equipo de animadores experimentados y tecnología de última generación garantiza que sus proyectos alcancen nuevas alturas. Únase a nosotros en GloCast Animation Studio y embárquese en una fascinante aventura de animación.",
        price:789,
        fav:true,
        handleToggleFavourite: function(){}
    },
    {
        id: 2,
        img:"https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg",
        title:"Estudio fotográfico",
        description:"Descubra el espacio perfecto para dar vida a su visión creativa en GloCast Photo Studio. Nuestros estudios de última generación brindan a fotógrafos, cineastas y artistas un entorno versátil y bien equipado para capturar imágenes impresionantes. Con iluminación, accesorios y fondos de primer nivel, GloCast es su destino ideal para las necesidades de fotografía y videografía profesional. Ya sea que sea un profesional experimentado o esté comenzando, nuestros estudios están diseñados para inspirar y mejorar sus proyectos. Haga que su próxima sesión sea excepcional en GloCast Photo Studio Rentals.",
        price:999,
        fav:true
    },
    {
        id: 3,
        img:"https://crehana-blog.imgix.net/media/filer_public/78/d5/78d5f21a-c41b-4bac-9a03-7279a1120436/estudios-de-animacion.jpg",
        title:"Editar con profesionales",
        description:"Mejore sus habilidades de edición con el curso de edición de GloCast. Ya sea que sea un novato que busca sumergirse en el mundo de la posproducción o un profesional experimentado que desea perfeccionar su oficio, nuestro curso integral lo tiene cubierto. Explore el arte de la edición de videos y fotografías en un entorno de aprendizaje interactivo y práctico. Nuestros instructores expertos lo guiarán a través de las últimas técnicas y software estándar de la industria, permitiéndole hacer realidad su visión creativa. Únase a nosotros en GloCast y libere su potencial en el mundo de la edición, convirtiendo sus proyectos en obras maestras visuales.",
        price:1990,
        fav:true,
    },
    {
        id: 4,
        img:"testPhoto.jpg",
        title:"Estudio de animación",
        description:"Adéntrate en el cautivador mundo de la animación con GloCast Animation Studio. Nuestro estudio es un centro para la creatividad, donde artistas y animadores se reúnen para crear contenido animado imaginativo, atractivo y visualmente impresionante. Desde animación 2D hasta animación 3D, ofrecemos un entorno de vanguardia y totalmente equipado para hacer realidad sus ideas. Si eres un animador experimentado o recién estás comenzando tu viaje, GloCast es el lienzo para tus sueños. Nuestro equipo de animadores experimentados y tecnología de última generación garantiza que sus proyectos alcancen nuevas alturas. Únase a nosotros en GloCast Animation Studio y embárquese en una fascinante aventura de animación.",
        price:789,
        fav:true,
    }
]

function FavServices() {
    const [favoritesServices, setFavoritesServices] = useState(Cards)

    function handleToggleFavourite(id) {
        setFavoritesServices(prevState => {
            const updatedServices = prevState.map(service =>
                service.id === id ? { ...service, fav: !service.fav } : service
            );
                
            const filteredServices = updatedServices.filter(service => service.id !== id);
                
            return filteredServices;
        });
    }

    useEffect(() => {
    }, [favoritesServices])
    
    return (
        <div className="flex flex-col justify-around gap-5 min-h-[130vh] bg-white md:max-lg:flex">
            <div className="card-container flex justify-around gap-4 flex-col items-center overflow-auto">
                {favoritesServices.map((service) => (
                    <Card
                        key={service.id}
                        img={service.img}
                        title={service.title}
                        description={service.description}
                        price={service.price}
                        fav={service.fav}
                        handleToggleFavourite={() => handleToggleFavourite(service.id)}                    
                    />
                ))}
            </div>
        </div>
    );

}

export default FavServices;