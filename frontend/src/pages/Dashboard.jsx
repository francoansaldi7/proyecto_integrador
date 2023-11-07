import CreateForm from "../components/common/CreateForm";
import { useState, useContext, useEffect } from "react";
import ListOfServices from "../components/common/ListOfServices";
import { GlobalContext } from "../contexts/globalContext";
import ListOfUsers from "../components/common/ListOfUsers";
import BlockedDashboard from "../components/common/BlockedDashboard";

const Dashboard = () => {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrSmaller(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const {services} = useContext(GlobalContext);
  console.log(services);

  const [activeCreateForm, setActiveCreateForm] = useState(false);
  const handleActiveCreateForm = () => {
    setActiveCreateForm(!activeCreateForm);
  };


  return (
    <>
      {isTabletOrSmaller ? <BlockedDashboard/>
          :
          <div className="dark flex flex-col min-h-screen bg-gray-950 relative pt-24 items-center ">
              {/*<ListOfUsers></ListOfUsers>
               <button
                className="bg-primary text-white px-4 z-10 py-2 h-10 rounded-lg"
                onClick={handleActiveCreateForm}
                type="button"
              >
                Add Service
              </button> */}
              <ListOfServices activeCreateForm={handleActiveCreateForm} />
              {activeCreateForm && <CreateForm closeForm={handleActiveCreateForm} />}
          </div>}
    </>
      
  );
};

export default Dashboard;
