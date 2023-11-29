import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const ReservarPage = () => {

  return (
    <div className='grid grid-rows-3 w-full min-h-screen bg-gray-950 pt-[200px] text-white'>
      <div className="date-info bg-gray-900 w-full h-[100px] p-5 rounded-md">INFORMACION TIPO FECHAS, CANTIDAD DE DIAS, ETC</div>
      <div className=" grid grid-cols-2 gap-10 w-full h-full p-5">
        <div className='service-info w-full h-full bg-gray-900 rounded-md'>SERVICE INFO</div>
        <div className='payment-info w-full h-full bg-gray-900 rounded-md'>PAYMENT INFO</div>
      </div>
      <div className=" grid grid-cols-2 gap-10 w-full h-full p-5">
        <div className='service-info w-full h-full bg-gray-900 rounded-md'>USER INFO</div>
      </div>
    </div>
  );
};

export default ReservarPage;