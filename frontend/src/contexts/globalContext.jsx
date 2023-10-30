import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const getAllServices = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/services`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error obtaining services", error);
    }
  }, []);

  const saveService = useCallback(
  async (service, images = []) => {
    let serviceSaved;
    try {
      const response = await fetch(`http://localhost:8080/api/v1/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      serviceSaved = await response.json();
      if (response.ok) {
        let currentIndex = 0;

        const processNextImage = async () => {

          if (currentIndex < images.length) {
            let storeCurrentIndex = currentIndex;
            currentIndex++;
            const image = images[storeCurrentIndex];
            const reader = new FileReader();

            reader.onload = async (e) => {
              const base64Image = e.target.result;

              // Envía la imagen en Base64 al servidor
              const response = await fetch(
                `http://localhost:8080/api/v1/services/${serviceSaved.id}/${
                  storeCurrentIndex === 0 ? "image-profile" : "images"
                }`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    base64Image,
                    fileName: image.file.name,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              serviceSaved = await response.json();
              console.log(serviceSaved);

              processNextImage();
            };

            reader.readAsDataURL(image.file);
          } else {
            getAllServices(); // Llamada después de procesar todas las imágenes
          }
        };
   
        processNextImage();
      }
      return serviceSaved;
    } catch (error) {
      console.error("Error saving the service", error);
    }
  },
  [getAllServices]
);

  // const saveService = useCallback(
  //   async (service, images = []) => {
  //     let serviceSaved;
  //     try {
  //       const response = await fetch(`http://localhost:8080/api/v1/services`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(service),
  //       });
  //       serviceSaved = await response.json();
  //       if (response.ok) {
  //         await Promise.all(
  //           images.map(async (image, index) => {
  //             // Función para procesar una imagen
  //             const processImage = async () => {
  //               return new Promise( (resolve) => {
  //                 const reader = new FileReader();

  //                 reader.onload = async (e) => {
  //                   const base64Image = e.target.result;

  //                   // Envía la imagen en Base64 al servidor
  //                   const response = await fetch(
  //                     `http://localhost:8080/api/v1/services/${
  //                       serviceSaved.id
  //                     }/${index === 0 ? "image-profile" : "images"}`,
  //                     {
  //                       method: "POST",
  //                       body: JSON.stringify({
  //                         base64Image,
  //                         fileName: image.file.name,
  //                       }),
  //                       headers: {
  //                         "Content-Type": "application/json",
  //                       },
  //                     }
  //                   );

  //                   serviceSaved = await response.json();
  //                   console.log(serviceSaved);

  //                   // Espera medio segundo antes de continuar con el siguiente elemento
  //                   setTimeout(() => {
  //                     resolve();
  //                   }, 500); // 500 milisegundos = 0.5 segundos
  //                 };

  //                 reader.readAsDataURL(image.file);
  //               });
  //             };

  //             await processImage();
  //           })
  //         );

  //         getAllServices();
  //       }
  //       return serviceSaved;
  //     } catch (error) {
  //       console.error("Error saving the service", error);
  //     }
  //     // await Promise.all(
  //     //   images.map(async (image) => {
  //     //     // Lee el archivo de la imagen en Base64
  //     //     const reader = new FileReader();

  //     //     reader.onload = async (e) => {
  //     //       const base64Image = e.target.result;

  //     //       // Envía la imagen en Base64 al servidor
  //     //       const response = await fetch(
  //     //         `http://localhost:8080/api/v1/services/b246f153-a083-47d2-9cf8-f4f9df6ac90a/image-profile`,
  //     //         {
  //     //           method: "POST",
  //     //           body: JSON.stringify({ base64Image, fileName: image.file.name }), // Envia la imagen codificada en Base64
  //     //           headers: {
  //     //             "Content-Type": "application/json",
  //     //           },
  //     //         }
  //     //       );

  //     //       const serviceSaved = await response.json();
  //     //       console.log(serviceSaved);
  //     //     };

  //     //     reader.readAsDataURL(image.file);
  //     //   })
  //     // );
  //     return serviceSaved;
  //   },
  //   [getAllServices]
  // );

  const updateService = useCallback(
    async (idService, service) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/services/${idService}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(service),
          }
        );
        if (response.ok) {
          getAllServices();
        }
        const serviceEdited = await response.json();
        return serviceEdited;
      } catch (error) {
        console.error("Error editing the service", error);
      }
    },
    [getAllServices]
  );

  const deleteService = useCallback(
    async (idService) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/services/${idService}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          getAllServices();
        }
      } catch (error) {
        console.error("Error deleting the service", error);
      }
    },
    [getAllServices]
  );

  useEffect(() => {
    getAllServices();
  }, []);

  const globalValue = useMemo(
    () => ({
      services,
      getAllServices,
      saveService,
      updateService,
      deleteService,
    }),
    [services, getAllServices, saveService, updateService, deleteService]
  );

  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { GlobalContext, GlobalContextProvider };
