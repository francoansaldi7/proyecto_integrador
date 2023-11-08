import React, { useState, useContext, useEffect } from "react";
import CreateForm from "../components/common/CreateForm";
import ListOfServices from "../components/common/ListOfServices";
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
  const handleActiveCreateForm = () => {
    setActiveCreateForm(!activeCreateForm);
  };

  return (
    <>
      {isTabletOrSmaller ? (
        <BlockedDashboard />
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
          </div>
          {showUsers ? <ListOfUsers /> : <ListOfServices activeCreateForm={handleActiveCreateForm} />}
          {activeCreateForm && <CreateForm closeForm={handleActiveCreateForm} />}
        </div>
      )}
    </>
  );
};

export default Dashboard;

