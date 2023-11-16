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
  const [categories, setCategories] = useState([]);
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
          `http://localhost:8080/api/v1/services${
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
          window.location.href = "/login";
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

  const changeServicesPage = useCallback(
    async (pageNumber) => {
      console.log(pageNumber);
      const data = await getAllServices(pageNumber);
      setServices(data.content);
    },
    [getAllServices]
  );

  const saveService = useCallback(
    async (service, images = []) => {
      let serviceSaved;
      let response;
      try {
        try {
          response = await fetch(`http://localhost:8080/api/v1/services`, {
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

  // ------------------------ CATEGORIES FETCHS ------------------------

  const getAllCategories = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/categories");
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
        const response = await fetch("http://localhost:8080/api/v1/categories", {
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
        `http://localhost:8080/api/v1/categories/${idCategory}`,
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
        `http://localhost:8080/api/v1/categories/${idCategory}`,
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
        `http://localhost:8080/api/v1/categories/${idCategory}`
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

  useEffect(() => {
    //getAllServices();
  }, []);

  const globalValue = useMemo(
    () => ({
      services,
      setServices,
      getAllServices,
      saveService,
      updateService,
      deleteService,
      categories,
      setCategories,
      getAllCategories,
      saveCategory,
      deleteCategory,
      updateCategory,
      findCategory,
      unorganizedServices,
      setUnorganizedServices,
      handleShuffle,
      changeServicesPage,
      sevicesTotalPages,
      loadingServices,
    }),
    [
      services,
      getAllServices,
      saveService,
      updateService,
      deleteService,
      unorganizedServices,
      handleShuffle,
      changeServicesPage,
      sevicesTotalPages,
      loadingServices,
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
