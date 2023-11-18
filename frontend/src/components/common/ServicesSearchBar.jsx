import { useState, useContext } from "react";
import { FaMagnifyingGlassArrowRight, FaCalendar, FaMagnifyingGlass } from "react-icons/fa6";
import { GlobalContext } from "../../contexts/globalContext";
import { Link } from "react-router-dom";

const ServicesSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {categories, getAllIdsAndTitlesOfEachService, serviceIdsAndTitlesOnly, setServiceIdsAndTitlesOnly} = useContext(GlobalContext);

  const handleSearch = async (query) => {
    console.log(query);
    setSearchTerm(query);
    try {
      const data = await getAllIdsAndTitlesOfEachService(query);
      setServiceIdsAndTitlesOnly(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white dark:text-white dark:bg-gray-800 p-5 rounded-md flex flex-col  gap-4 outline-1 outline-gray-300 outline xl:grid xl:grid-cols-9 xl:gap-4">
      <div className="search p-3 bg-gray-100 dark:bg-slate-500 rounded-md flex gap-2 outline outline-1 outline-gray-200  xl:col-start-1 xl:col-end-4 relative text-gray-500">
        <div className="p-2 text-gray-500 text-2xl">
          <FaMagnifyingGlassArrowRight />
        </div>
        <input
          type="text"
          placeholder="Buscar servicio..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-gray-100 dark:bg-slate-500 p-2 w-full outline-none"
        />
        {searchTerm !== '' && (
          <div className="absolute top-full left-0 bg-gray-100 w-full rounded-lg flex flex-col z-10">
            {serviceIdsAndTitlesOnly.map((service) => (
               <Link key={service.id} className="p-2 hover:text-gray-700" to={`/details/${service.id}`}>{service.title}</Link>
              
            ))}
          </div>
        )}
      </div>
      <div className="pick-rate-days xl:col-start-4 xl:col-end-7 grid grid-cols-2  gap-4">

      <div className="search p-3 bg-gray-100 dark:bg-slate-500 rounded-md flex gap-2 outline outline-1 outline-gray-200  ">
          <div className="p-2 text-gray-500 text-2xl">
            <FaCalendar />
          </div>
          <input
            type="text"
            disabled
            placeholder="Inicio de reserva..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 dark:bg-slate-500 p-2 w-full outline-none"
          />
        </div>
        <div className="search p-3 bg-gray-100 dark:bg-slate-500 rounded-md flex gap-2 outline outline-1 outline-gray-200  ">
          <div className="p-2 text-gray-500 text-2xl">
            <FaCalendar />
          </div>
          <input
            type="text"
            disabled
            placeholder="Fin de reserva..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 dark:bg-slate-500 p-2 w-full outline-none"
          />
        </div>
      </div>

        <select className="search p-3 bg-gray-100 dark:bg-slate-500 rounded-md flex gap-2 outline outline-1 outline-gray-200  xl:col-start-7 xl:col-end-8 text-gray-500" name="category-select" id="category-select">
          <option value="" disabled selected>Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          
        </select>
      <button className="search p-3 bg-primary dark:bg-primary-dark rounded-md flex gap-4 outline outline-1 outline-gray-200  xl:col-start-8 xl:col-end-10 text-white text-xl items-center justify-center hover:bg-primary/80">
        <FaMagnifyingGlass />
        <span>Buscar</span>
      </button>
    </div>
  )
}

export default ServicesSearchBar;