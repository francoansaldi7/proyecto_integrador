import { DayPicker } from "react-day-picker";
import { addMonths } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { useContext, useEffect, useState } from "react";
import {GlobalContext} from "../../contexts/globalContext";
import { useParams } from "react-router-dom";

const ShowServiceAvailability = () => {
  const { getUnavailableDatesOfService } = useContext(GlobalContext);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [errors, setErrors] = useState([]);
  const serviceId= useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const unavailableDates = await getUnavailableDatesOfService(serviceId["*"]);
  setUnavailableDates(transfomDatesFromStringToDate(unavailableDates));
        
      } catch (error) {
        console.log(error);
        setErrors('Error al cargar las fechas intentalo mas tarde');
      }
    }
    fetchData();
    }, []);
  const transfomDatesFromStringToDate = (dateRangeObject) => {
    if (dateRangeObject == {}) {
      return [];
    }
    let dates = [];
    Object.keys(dateRangeObject).map((dateString) => {
      dates.push({from: new Date(dateString), to: new Date(dateRangeObject[dateString])});
    });

    return dates;
  };


  return (
    <div className="flex flex-col gap-4 w-full md:max-w-[70%]">
      <div className="p-2 flex w-full gap-2 justify-between">
        <DayPicker
          className=" w-full p-2 bg-secondary-dark dark:bg-slate-500 rounded-lg  z-10 m-0 outline outline-1 outline-purple-900 text-white"
          mode="range"
          locale={es}
          disabled={unavailableDates}
          fromDate={new Date()}
          toDate={new Date().setFullYear(new Date().getFullYear() + 1)}
        />
        
        <DayPicker
          className="w-full p-2 bg-secondary-dark dark:bg-slate-500 rounded-lg  z-10 m-0 outline outline-1 outline-purple-900 text-white hidden md:block"
          mode="range"
          locale={es}
          disabled={unavailableDates}
          defaultMonth={addMonths(new Date(), 1)}
          fromDate={new Date()}
          toDate={new Date().setFullYear(new Date().getFullYear() + 1)}
        />
        
      </div>
      {errors.map((error, index) => (
        <p key={index} className="text-red-700 text-sm" >{error}</p>
      ))}
    </div>
  );
};

ShowServiceAvailability.propTypes = {
}

export default ShowServiceAvailability;
