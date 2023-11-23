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
  const [serviceIdsAndTitlesOnly, setServiceIdsAndTitlesOnly] = useState([]);
  const [searchedServices, setSearchedServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [unorganizedServices, setUnorganizedServices] = useState([]);
  const [sevicesTotalPages, setSevicesTotalPages] = useState(0);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    //let servicesIterable = services.content ? services.content : [];
    const shuffledServices = shuffleArray([...services]);
    setUnorganizedServices(shuffledServices);
  }, [services]);

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
  };

  const handleShuffle = () => {
    //let servicesIterable = services.content ? services.content : [];
    setUnorganizedServices(shuffleArray([...services]));
  };




  
  // ------------------------ SERVICES FETCHS ------------------------
  
  
  
  
  /**
   * Asynchronous function that fetches a list of services based on the provided page number and admin status.
   *
   * @param {number} [pageNumber=0] - The page number of the services to fetch.
   * @param {boolean} [isAdmin=false] - A boolean indicating whether the user is an admin.
   * @returns {Promise} - A promise that resolves to the response data from the API call.
   */
  const getAllServices = useCallback(
    async (pageNumber = 0, isAdmin = false) => {
      setLoadingServices(true);
      let headers;
      const url = window.location.href;
      isAdmin = url.includes("/dashboard");
      isAdmin
        ? (headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "registrationToken"
            )}`,
          })
        : (headers = {
            "Content-Type": "application/json",
          });
      console.log(headers);
      let response;
      try {
        response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/services${
            isAdmin ? "/admin" : ""
          }?size=${SERVICE_PAGE_SIZE}&page=${pageNumber}`,
          {
            method: "GET",
            headers: headers,
          }
        );
      } catch (error) {
        throw new Error(error);
      }
      if (!response.ok) {
        console.log(response);
        if (response.status === 401 || response.status === 403) {
          console.log(response.status);
          return (window.location.href = "/login");
        }
        throw new Error("Error obtaining services");
      }
      const data = await response.json();
      setLoadingServices(false);
      setSevicesTotalPages(data.totalPages);
      return data;
    },
    []
  );

  const findServiceById = useCallback(
    async (idService) => {
      let res;
      try {
        res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/services/${idService}`);
      } catch (error) {
      throw new Error("Error finding service by id: ", error);
      }
      if (!res.ok) {
        throw new Error("Error finding service by id");
      }
      const data = await res.json();
      return data;
    })

  const changeServicesPage = useCallback(
    async (pageNumber) => {
      console.log(pageNumber);
      const data = await getAllServices(pageNumber);
      setServices(data.content);
    },
    [getAllServices]
  );

  /**
   * Saves a service and its associated images to the server.
   * 
   * @param {Object} service - The service object to be saved.
   * @param {Array} images - An array of image objects associated with the service. Default is an empty array.
   * @returns {Object} - The saved service object.
   * @throws {Error} - If there is an error during the saving process.
   */
  const saveService = useCallback(
    async (service, images = []) => {
      let serviceSaved;
      let response;
      try {
        try {
          response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/services`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(
                "registrationToken"
              )}`,
            },
            body: JSON.stringify(service),
          });
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }

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
                  `${import.meta.env.VITE_BACKEND_URL}/api/v1/services/${serviceSaved.id}/${
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
                      Authorization: `Bearer ${localStorage.getItem(
                        "registrationToken"
                      )}`,
                    },
                  }
                );

                serviceSaved = await response.json();
                console.log(serviceSaved);

                processNextImage();
              };

              reader.readAsDataURL(image.file);
            } else if (response.status === 401 || response.status === 403) {
              console.log(response.status);
              return (window.location.href = "/login");
            } else {
              getAllServices(); // Llamada después de procesar todas las imágenes
            }
          };

          processNextImage();
        }
        return serviceSaved;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    [getAllServices]
  );

  /**
   * Sends a PUT request to update a specific service by its ID.
   * 
   * @param {string} idService - The ID of the service to be updated.
   * @param {object} service - The updated service data to be sent in the request body.
   * @returns {object} - The updated service data returned from the API response.
   * @throws {Error} - If there is an error editing the service.
   */
  const updateService = useCallback(
    async (idService, service) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/services/${idService}`,
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
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/services/${idService}`,
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

  const getAllIdsAndTitlesOfEachService = useCallback(async (query = "") => {
    let res;
    try {
      res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/services/search?query=${query}`,
      )
    
    } catch (error) {
      console.error("Error obtaining services: "+ error);
      throw new Error("Error obtaining services");
    }
    if (!res.ok) {
      console.error("Error obtaining services: "+ res.status);
      throw new Error("Error obtaining services");
    }
    const data = await res.json();
    return data;  
    
  })

  const getAllServicesReduced = useCallback(async (query = "",  typeOfServiceId = null, startDate = null, endDate = null, pageNumber = 0) => {
    let res;
    try {
      res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/services/search-all?query=${query}&size=${SERVICE_PAGE_SIZE}&page=${pageNumber}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}${typeOfServiceId ? `&typeOfService=${typeOfServiceId}` : ""}`,
      )
    
    } catch (error) {
      console.error("Error obtaining services: "+ error);
      throw new Error("Error obtaining services");
    }
    if (!res.ok) {
      console.error("Error obtaining services: "+ res.status);
      throw new Error("Error obtaining services");
    }
    const data = await res.json();
    return data;  
    
  })

    const changeSearchedServicesPage = useCallback(
    async (pageNumber) => {
      console.log(pageNumber);
      const data = await getAllServicesReduced(pageNumber);
      setSearchedServices(data.content);
    },
    [getAllServicesReduced]
  );

  const getUnavailableDatesOfService = useCallback(
    async (serviceId) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/services/${serviceId}/unavailable-dates`
        );
        if (!response.ok) {
          throw new Error("Error obtaining unavailable dates");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    }
  )


  // ------------------------ END SERVICES FETCHS ------------------------




  // ------------------------ CATEGORIES FETCHS ------------------------

  const getAllCategories = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`);
      if (!response.ok) {
        throw new Error("Error obtaining categories");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  });

  const saveCategory = useCallback(async (category) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const base64Image = e.target.result;
      try {
        console.log(category);
        const categoryParsed = JSON.stringify(category);
      console.log(categoryParsed);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: category.category,
            fileName: category.fileName,
            imageFile: base64Image,
          }),
        });
        if (!response.ok) {
          throw new Error("Error saving category");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    };

    reader.readAsDataURL(category.imageFile);

  });

  const deleteCategory = useCallback(async (idCategory) => {
    console.log(idCategory);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/${idCategory}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting category");
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  const updateCategory = useCallback(async (idCategory, category) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/${idCategory}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating category");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  });

  const findCategory = useCallback(async (idCategory) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/${idCategory}`
      );
      if (!response.ok) {
        throw new Error("Error finding category");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  });



// ------------------------ END CATEGORIES FETCHS ------------------------



// ------------------------ CHARACTERISTICS FETCHS -------------------

 const getAllCharacteristics = useCallback(async () => {
   try {
     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/characteristic`);
     if (!response.ok) {
       throw new Error("Error obtaining characteristics");
     }
     const data = await response.json();
     return data;
   } catch (error) {
     console.error(error);
     throw new Error(error);
   }
 })

 const findCharacteristic = useCallback(async (idCharacteristic) => {
   try {
     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/characteristic/${idCharacteristic}`);
     if (!response.ok) {
       throw new Error("Error finding characteristic");
     }
     const data = await response.json();
     return data;
   } catch (error) {
     console.error(error);
     throw new Error(error);
   }
 })

 const saveCharacteristic = useCallback(async (characteristic) => {
   try {
     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/characteristic`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(characteristic),
     });
     if (!response.ok) {
       throw new Error("Error saving characteristic");
     }
     const data = await response.json();
     return data;
   } catch (error) {
     console.error(error);
     throw new Error(error);
   }
 })

 const deleteCharacteristic = useCallback(async (idCharacteristic) => {
   try {
     const response = await fetch(
       `${import.meta.env.VITE_BACKEND_URL}/api/v1/characteristic/${idCharacteristic}`,
       {
         method: "DELETE",
       }
     );
     if (!response.ok) {
       throw new Error("Error deleting characteristic");
     }
     const data = await response.text();
     if(data !== true){
       throw new Error(data);
     }
     return true;
   } catch (error) {
     console.error(error);
     return false;
   }
 })

 const updateCharacteristic = useCallback(async (idCharacteristic, characteristic) => {
   try {
     const response = await fetch(
       `${import.meta.env.VITE_BACKEND_URL}/api/v1/characteristic/${idCharacteristic}`,
       {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(characteristic),
       }
     );
     if (!response.ok) {
       throw new Error("Error updating characteristic");
     }
     const data = await response.json();
     return data;
   } catch (error) {
     console.error(error);
     throw new Error(error);
   }
 })

// ------------------------ END CHARACTERISTICS FETCHS -------------------


// ------------------------ FAVORITES FETCHS ------------------------

const addFavorite = useCallback(
  async (userId, serviceId) => {
    try {
      const response = await fetch(
  `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${userId}/favorites/${serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );     
      if (response.ok) {
        console.log("Favorito agregado correctamente");
      }      
    } catch (error) {
      console.error("Error al agregar el favorito", error);
    }
  },
  [getAllServices]
);

const deleteFavorite = useCallback(
  async (userId, serviceId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${userId}/favorites/${serviceId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Favorito eliminado correctamente");
      }
    } catch (error) {
      console.error("Error al intentar eliminar el favorito", error);
    }
  },
  [getAllServices]
);

// ------------------------ END FAVORITES FETCHS -------------------



  useEffect(() => {
    //getAllServices();
  }, []);

  const globalValue = useMemo(
    () => ({
      services,
      setServices,
      serviceIdsAndTitlesOnly,
      setServiceIdsAndTitlesOnly,
      getAllServices,
      findServiceById,
      saveService,
      updateService,
      deleteService,
      getAllIdsAndTitlesOfEachService,
      getAllServicesReduced,
      searchedServices,
      setSearchedServices,
      getUnavailableDatesOfService,
      changeSearchedServicesPage,
      categories,
      setCategories,
      getAllCategories,
      saveCategory,
      deleteCategory,
      updateCategory,
      findCategory,
      characteristics,
      setCharacteristics,
      getAllCharacteristics,
      findCharacteristic,
      saveCharacteristic,
      deleteCharacteristic,
      updateCharacteristic,
      unorganizedServices,
      setUnorganizedServices,
      handleShuffle,
      changeServicesPage,
      sevicesTotalPages,
      loadingServices,
      addFavorite,
      deleteFavorite
    }),
    [
      services,
      getAllServices,
      saveService,
      updateService,
      deleteService,
      unorganizedServices,
      getUnavailableDatesOfService,
      handleShuffle,
      changeServicesPage,
      sevicesTotalPages,
      loadingServices,
      categories,
      setCategories,
      getAllCategories,
      saveCategory,
      deleteCategory,
      updateCategory,
      findCategory,
      getAllCharacteristics,
      findCharacteristic,
      saveCharacteristic,
      deleteCharacteristic,
      updateCharacteristic,
      characteristics,
      setCharacteristics,
      getAllIdsAndTitlesOfEachService,
      serviceIdsAndTitlesOnly,
      setServiceIdsAndTitlesOnly,
      findServiceById,
      getAllServicesReduced,
      searchedServices,
      setSearchedServices,
      changeSearchedServicesPage,
      addFavorite,
      deleteFavorite
    ]
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
