import  { useState, useContext, useEffect } from "react";
import CreateForm from "../components/common/CreateForm";
import ListOfServices from "../components/common/ListOfServices";
import { LoadingOutlined } from '@ant-design/icons';
import { GlobalContext } from "../contexts/globalContext";

import ListOfUsers from "../components/common/ListOfUsers";
import BlockedDashboard from "../components/common/BlockedDashboard";
import ListOfCategories from "../components/common/ListOfCategories";
import ListOfCharacteristics from "../components/common/ListOfCharacteristics";

const Dashboard = () => {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(window.innerWidth <= 768);
  const [showServices, setShowServices] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCharacteristics, setShowCharacteristics] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrSmaller(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { services } = useContext(GlobalContext);
  console.log(services);

  const [activeCreateForm, setActiveCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { getAllServices, setServices} = useContext(GlobalContext);

  const handleActiveCreateForm = () => {
    setActiveCreateForm(!activeCreateForm);
  };
  

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data...");
      try {
      const data = await getAllServices();
       setIsLoading(false);
       setServices(data.content);
        
      } catch (error) {
        // Get the previous page of the browser history and redirect it
          if (window.history.length > 1) {
            window.history.go(-1);
          } else {
            window.location.href = "/";
          }
      }
    }
    fetchData();

  }, []);

    return (
  <>
    {isTabletOrSmaller ? (
      <BlockedDashboard />
    ) : (
      isLoading ? (
        <div className="dark flex flex-col min-h-screen bg-gray-950 relative pt-24 items-center justify-center">
          <LoadingOutlined className="text-6xl text-primary" spin />
        </div>
      ) : (
        <div className="dark flex flex-col min-h-screen bg-gray-950 relative pt-24 items-center">
          <div className="my-8">
            <button
              className={`text-white px-4 py-2 mx-2 rounded-lg ${showServices ? 'bg-slate-500 shadow' : 'bg-blue-500'}`}
              onClick={() => {
                setShowCategories(false)
                setShowUsers(false);
                setShowCharacteristics(false)
                setShowServices(true); 
              }}
            >
              Servicios
            </button>
            <button
              className={`text-white px-4 py-2 mx-2 rounded-lg ${showUsers ? 'bg-slate-500 shadow' : 'bg-blue-500'}`}
              onClick={() => {
                setShowServices(false); 
                setShowCategories(false)
                setShowCharacteristics(false)
                setShowUsers(true)
              }}
            >
              Usuarios
            </button>
            <button
<<<<<<< HEAD
              className={`text-white px-4 py-2 mx-2 rounded-lg ${!showUsers ? 'bg-slate-500 shadow' : 'bg-blue-500'}`}
              onClick={() => setShowUsers(false)}
            >
              Categorias
            </button>
            {showUsers ? <ListOfUsers /> : <ListOfServices activeCreateForm={handleActiveCreateForm} />}
=======
              className={`text-white px-4 py-2 mx-2 rounded-lg ${showCategories ? 'bg-slate-500 shadow' : 'bg-blue-500'}`}
              onClick={() => {
                setShowUsers(false)
                setShowServices(false)
                setShowCharacteristics(false)
                setShowCategories(true)
              }}
            >
              Categorías
            </button>
            <button
              className={`text-white px-4 py-2 mx-2 rounded-lg ${showCategories ? 'bg-slate-500 shadow' : 'bg-blue-500'}`}
              onClick={() => {
                setShowUsers(false)
                setShowServices(false)
                setShowCategories(false)
                setShowCharacteristics(true)
              }}
            >
              Características
            </button>
            {showCharacteristics && <ListOfCharacteristics />}
             {showServices && <ListOfServices activeCreateForm={handleActiveCreateForm} />}
            {showUsers && <ListOfUsers />}
>>>>>>> fdd1c0374ec3e78726c602c38ac73e7839895bc2
            {activeCreateForm && <CreateForm closeForm={handleActiveCreateForm} />}

            {showCategories && <ListOfCategories />}
          </div>
        </div>
      )
    )}
  </>

  );
};

export default Dashboard;

