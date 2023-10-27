import { createContext, useEffect, useState, useMemo, useCallback } from "react";
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
      console.error('Error obtaining services', error);
    }
  }, []);
  const saveService = useCallback(async (service) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      }); 
      if(response.ok) {
        getAllServices();
      }
      const serviceSaved = await response.json();
      return serviceSaved;
    } catch (error) {
      console.error('Error saving the service', error);
    }
  }, [getAllServices]);

  const updateService = useCallback(async (idService, service) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/services/${idService}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      }); 
      if(response.ok) {
        getAllServices();
      }
      const serviceEdited = await response.json();
      return serviceEdited;
    } catch (error) {
      console.error('Error editing the service', error);
    }
  }, [getAllServices]);

 
  const deleteService = useCallback(async (idService) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/services/${idService}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        getAllServices();
      }
    } catch (error) {
      console.error('Error deleting the service', error);
    }
  }, [getAllServices]);

  useEffect(() => {
    getAllServices();
  }, [])

 const globalValue = useMemo(() => ({
    services,
    getAllServices,
    saveService,
    updateService,
    deleteService
  }), [services, getAllServices, saveService, updateService, deleteService]);

  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export { GlobalContext, GlobalContextProvider };
