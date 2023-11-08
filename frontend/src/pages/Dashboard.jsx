import CreateForm from "../components/common/CreateForm";
import { useState, useEffect, useContext } from "react";
import ListOfServices from "../components/common/ListOfServices";
import { LoadingOutlined } from '@ant-design/icons';
import { GlobalContext } from "../contexts/globalContext";

const Dashboard = () => {
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
       setServices(data);
        
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
      {isLoading ? (
        <div className="dark flex flex-col min-h-screen bg-gray-950 relative pt-24 items-center justify-center">
            <LoadingOutlined
              className="text-6xl text-primary"
              spin
            />

          </div>
      ): (
      <div className="dark flex flex-col min-h-screen bg-gray-950 relative pt-24 items-center ">
        {/* <button
          className="bg-primary text-white px-4 z-10 py-2 h-10 rounded-lg"
          onClick={handleActiveCreateForm}
          type="button"
        >
          Add Service
        </button> */}
        <ListOfServices activeCreateForm={handleActiveCreateForm} />
        {activeCreateForm && <CreateForm closeForm={handleActiveCreateForm} />}
      </div>

      )}
    </>
  );
};

export default Dashboard;
