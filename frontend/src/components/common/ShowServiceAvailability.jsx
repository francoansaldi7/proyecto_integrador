import { DayPicker } from "react-day-picker";
import { addMonths } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { useContext, useEffect, useState } from "react";
import {GlobalContext} from "../../contexts/globalContext";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const ShowServiceAvailability = () => {
  const { getUnavailableDatesOfService } = useContext(GlobalContext);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const serviceId= useParams();
  useEffect(() => {
    async function fetchData() {
      const unavailableDates = await getUnavailableDatesOfService(serviceId["*"]);
setUnavailableDates(transfomDatesFromStringToDate(unavailableDates));
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
    <div className="p-2 flex w-full gap-2 justify-between">
      <DayPicker
        className=" w-full p-2 bg-secondary-dark dark:bg-slate-500 rounded-lg  z-10 m-0 outline outline-1 outline-purple-900 text-white"
        mode="range"
        locale={es}
        disabled={unavailableDates}
        fromDate={new Date()}
        toDate={new Date().setFullYear(new Date().getFullYear() + 1)}
      />
      )
      <DayPicker
        className="w-full p-2 bg-secondary-dark dark:bg-slate-500 rounded-lg  z-10 m-0 outline outline-1 outline-purple-900 text-white"
        mode="range"
        locale={es}
        disabled={unavailableDates}
        defaultMonth={addMonths(new Date(), 1)}
        fromDate={new Date()}
        toDate={new Date().setFullYear(new Date().getFullYear() + 1)}
      />
      )
    </div>
  );
};

ShowServiceAvailability.propTypes = {
}

export default ShowServiceAvailability;
