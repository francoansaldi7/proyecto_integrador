import  { useState, useContext, useEffect } from "react";
import CreateForm from "../components/common/CreateForm";
import ListOfServices from "../components/common/ListOfServices";
import { LoadingOutlined } from '@ant-design/icons';
import { GlobalContext } from "../contexts/globalContext";

import ListOfUsers from "../components/common/ListOfUsers";
import BlockedDashboard from "../components/common/BlockedDashboard";

const Dashboard = () => {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(window.innerWidth <= 768);
  const [showUsers, setShowUsers] = useState(false);

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
              className={`text-white px-4 py-2 mx-2 rounded-lg ${!showUsers ? 'bg-slate-500 shadow' : 'bg-blue-500'}`}
              onClick={() => setShowUsers(false)}
            >
              Servicios
            </button>
            <button
              className={`text-white px-4 py-2 mx-2 rounded-lg ${showUsers ? 'bg-slate-500 shadow' : 'bg-blue-500'}`}
              onClick={() => setShowUsers(true)}
            >
              Usuarios
            </button>
            {showUsers ? <ListOfUsers /> : <ListOfServices activeCreateForm={handleActiveCreateForm} />}
            {activeCreateForm && <CreateForm closeForm={handleActiveCreateForm} />}
          </div>
        </div>
      )
    )}
  </>

  );
};

export default Dashboard;

