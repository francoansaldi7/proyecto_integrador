import { useState, useContext, useEffect, useRef } from "react";
import {
  FaMagnifyingGlassArrowRight,
  FaCalendar,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { GlobalContext } from "../../contexts/globalContext";
import { Link } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { addMonths} from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { toast } from "react-toastify";

const ServicesSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySelected, setCategorySelected] = useState(0);
  const [initDatePicker, setInitDatePicker] = useState(false);
  const [endDatePicker, setEndDatePicker] = useState(false);
  const [initDate, setInitDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selected, setSelected] = useState();
  const [searchResultsPopupisOpen, setSearchResultsPopupisOpen] = useState(false);

  const nextMonth = addMonths(new Date(), 1);
  const [month] = useState(nextMonth);

  const resultsOfSearchPopup = useRef(null);

  const {
    categories,
    getAllIdsAndTitlesOfEachService,
    serviceIdsAndTitlesOnly,
    setServiceIdsAndTitlesOnly,
    getAllServicesReduced,
    setServices,
  } = useContext(GlobalContext);

  useEffect(() => {
        const handleOutsideClick = (event) => {
      if (resultsOfSearchPopup.current && !resultsOfSearchPopup.current.contains(event.target)) {
        handleOpenOrCloseSearchResultsPopup(false);
      } 
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [])

  useEffect(() => {
    handleOpenOrCloseSearchResultsPopup(true);
  }, [searchTerm])

  useEffect(() => {
    if(!selected) {
      return;
    }
    if(selected.from){
      setInitDate(`${selected.from.getFullYear()}-${selected.from.getMonth() < 10 ? `0${selected.from.getMonth() + 1}` : selected.from.getMonth() + 1 }-${selected.from.getDate() < 10 ? `0${selected.from.getDate()}` : selected.from.getDate()}`);
    }
    if(selected.to){
      setEndDate(`${selected.to.getFullYear()}-${selected.to.getMonth() < 10 ? `0${selected.to.getMonth() + 1}` : selected.to.getMonth() + 1 }-${selected.to.getDate() < 10 ? `0${selected.to.getDate()}` : selected.to.getDate()}`);
    }
    console.log(selected.from.getDate());
    console.log(selected.from.getMonth());
    console.log(selected.from.getFullYear());

  }, [selected])
  const handleSearch = async (query) => {
    console.log(query);
    setSearchTerm(query);
    try {
      const data = await getAllIdsAndTitlesOfEachService(query);
      setServiceIdsAndTitlesOnly(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenOrCloseDatePicker = (type) => {
    if(type === "init") {
      setInitDatePicker(!initDatePicker);
    } else {
      setEndDatePicker(!endDatePicker);
    }
  }
  const handleOpenOrCloseSearchResultsPopup = (isOpen = null) => {
    if(searchTerm === "") {
      setSearchResultsPopupisOpen(false);
      return;
    }
    if(isOpen === false) {
      setSearchResultsPopupisOpen(false);
      return;
    } else if(isOpen) {
      setSearchResultsPopupisOpen(true);
      return;
    }
    setSearchResultsPopupisOpen(!searchResultsPopupisOpen);
  }

  const handleSearchServices = async () => {
    let res;
  
    try {
      res = await getAllServicesReduced(
        searchTerm,
        categorySelected == 0 ? null : categorySelected,
        initDate,
        endDate
      )
    } catch (error) {
      console.log(error);
      toast.error("Se produjo un error al buscar los servicios.");
    }
    if(res) {
      setServices(res.content);
    }
  }

  const handleCategoryChange = (value) => {
    setCategorySelected(value);
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
        {searchResultsPopupisOpen && (
          <div ref={resultsOfSearchPopup} className="absolute top-full left-0 bg-gray-100 w-full rounded-lg flex flex-col z-10">
            {serviceIdsAndTitlesOnly.map((service) => (
              <Link
                key={service.id}
                className="p-2 hover:text-gray-700"
                to={`/details/${service.id}`}
              >
                {service.title}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="pick-rate-days xl:col-start-4 xl:col-end-7 grid grid-cols-2  gap-4 relative m-0">

        <div className="search p-3 bg-gray-100 dark:bg-slate-500 rounded-md flex gap-2 outline outline-1 outline-gray-200  relative">
        {initDatePicker && (<DayPicker
          className="absolute top-full left-0 w-full p-2 bg-gray-100 dark:bg-slate-500 rounded-lg  z-10 m-0 outline outline-1 outline-gray-200"
          mode="range"
          selected={selected}
          onSelect={setSelected}
          locale={es}
          fromDate={new Date()}
          toDate={new Date().setFullYear(new Date().getFullYear() + 1)}
        />)}
          <div className="p-2 text-gray-500 text-2xl">
            <FaCalendar />
          </div>
          <input
            type="text"
            value={initDate}
            placeholder="Inicio de reserva..."
            className="bg-gray-100 dark:bg-slate-500 p-2 w-full outline-none"
            onClick={() => handleOpenOrCloseDatePicker("init")}
          />
        </div>
        <div className="search p-3 bg-gray-100 dark:bg-slate-500 rounded-md flex gap-2 outline outline-1 outline-gray-200 relative ">
         {endDatePicker && (<DayPicker
          className="absolute top-full right-0 w-full p-2 bg-gray-100 dark:bg-slate-500 rounded-lg  z-10 m-0 outline outline-1 outline-gray-200"
          mode="range"
          locale={es}
          selected={selected}
          onSelect={setSelected}
          defaultMonth={month}
          fromDate={new Date()}
          toDate={new Date().setFullYear(new Date().getFullYear() + 1)}
        />)}
          <div className="p-2 text-gray-500 text-2xl">
            <FaCalendar />
          </div>
          <input
            type="text"
            value={endDate}
            placeholder="Fin de reserva..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 dark:bg-slate-500 p-2 w-full outline-none"
            onClick={() => handleOpenOrCloseDatePicker("end")}
          />
        </div>
      </div>

      <select
        className="search p-3 bg-gray-100 dark:bg-slate-500 rounded-md flex gap-2 outline outline-1 outline-gray-200  xl:col-start-7 xl:col-end-8 text-gray-500"
        name="category-select"
        id="category-select"
        onChange={(e) => handleCategoryChange(e.target.value)}
        defaultValue="0"
        value={categorySelected}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id} >
            {category.name}
          </option>
        ))}
      </select>
      <button className="search p-3 bg-primary dark:bg-primary-dark rounded-md flex gap-4 outline outline-1 outline-gray-200  xl:col-start-8 xl:col-end-10 text-white text-xl items-center justify-center hover:bg-primary/80"
      onClick={async () => {
        await handleSearchServices();
      }}
      >
        <FaMagnifyingGlass />
        <span>Buscar</span>
      </button>
    </div>
  );
};

export default ServicesSearchBar;
