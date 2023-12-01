import { DayPicker } from "react-day-picker";
import { addMonths } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { useContext, useEffect, useState } from "react";
import {GlobalContext} from "../../contexts/globalContext";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

const ShowServiceAvailability = ({selected, setSelected}) => {
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
      const [year, month, day] = dateString.split('-').map(Number);
      const [toYear, toMonth, toDay] = dateRangeObject[dateString].split('-').map(Number);

       const fromDate = new Date(year, month - 1, day);
      const toDate = new Date(toYear, toMonth - 1, toDay);

      dates.push({from: fromDate, to: toDate});
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
          selected={selected}
          onSelect={setSelected}
          disabled={unavailableDates}
          fromDate={new Date()}
          toDate={new Date().setFullYear(new Date().getFullYear() + 1)}
        />
        
        <DayPicker
          className="w-full p-2 bg-secondary-dark dark:bg-slate-500 rounded-lg  z-10 m-0 outline outline-1 outline-purple-900 text-white hidden md:block"
          mode="range"
          locale={es}
          selected={selected}
          onSelect={setSelected}
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
  selected: PropTypes.object,
  setSelected: PropTypes.func,
}

export default ShowServiceAvailability;
