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
  const SERVICE_PAGE_SIZE = 8;

  const [services, setServices] = useState([]);
  const [unorganizedServices, setUnorganizedServices] = useState([]);
  const [sevicesTotalPages, setSevicesTotalPages] = useState(0);
  const [loadingServices, setLoadingServices] = useState(true);
  
  useEffect(() => {
    
    const shuffledServices = shuffleArray([...services]);
    setUnorganizedServices(shuffledServices);
  
  }, [services])

  /**
   * Shuffles the elements of the given array randomly.
   *
   * @param {Array} array - The array to be shuffled.
   * @return {Array} - The shuffled array.
   */
  const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleShuffle = ()=> setUnorganizedServices(shuffleArray([...services]))
  
  const getAllServices = useCallback(async (pageNumber=0) => {
    try {
      setLoadingServices(true);
      const response = await fetch(`http://localhost:8080/api/v1/services?size=${SERVICE_PAGE_SIZE}&page=${pageNumber}`);
      const data = await response.json();
      setLoadingServices(false);
      setSevicesTotalPages(data.totalPages);
      setServices(data.content);
    } catch (error) {
      console.error("Error obtaining services", error);
    }
  }, []);

  const changeServicesPage = useCallback(
    async (pageNumber)=> {
      getAllServices(pageNumber); 
    },[getAllServices] 
  );


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
        setServices((prevServices) => [...prevServices, serviceSaved]);
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
        const serviceEdited = await response.json();
        if (response.ok) {
          setServices((prevServices) => [
            ...prevServices.filter((service) => service.id !== idService),
            serviceEdited,
          ]);
          getAllServices();
        }
        return serviceEdited;
      } catch (error) {
        console.error("Error editing the service", error);
      }
    },
    [getAllServices]
  );

  const deleteService = useCallback(
    async (idService) => {
      //typeof UUID
      if (typeof idService !== "string") {
        throw new Error("idService must be a string");
      }
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/services/${idService}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setServices((prevServices) =>
            prevServices.filter((service) => service.id !== idService)
          );
          return true;
        }
      } catch (error) {
        console.error("Error deleting the service", error);
        return false;
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
      unorganizedServices,
      handleShuffle,
      changeServicesPage,
      sevicesTotalPages,
      loadingServices
    }),
    [services, getAllServices, saveService, updateService, deleteService, unorganizedServices, handleShuffle, changeServicesPage, sevicesTotalPages,loadingServices]
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
