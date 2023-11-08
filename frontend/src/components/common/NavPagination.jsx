import React, { useState, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { GlobalContext } from "../../contexts/globalContext";

const NavPagination = () => {
  
  const {changeServicesPage, sevicesTotalPages} = useContext(GlobalContext);
  const handlePageClick = (event) => {
    
    console.log(`Changing page to ${event.selected}`);
    changeServicesPage(event.selected);
  };

  return (
    <>     
      <nav
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">

          Mostrando
          <span className="ml-1 mr-1 font-semibold text-white dark:text-white md:text-slate-600">
            1-10
          </span>
          de
          <span className="ml-1 mr-1 font-semibold text-white dark:text-white md:text-slate-600">
            1000
          </span>
        </span>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={sevicesTotalPages}
        previousLabel="< previous"
        pageClassName="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        pageLinkClassName=""
        previousClassName="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        previousLinkClassName=""
        nextClassName="flex items-center justify-center h-full py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        nextLinkClassName=""
        breakLabel="..."
        breakClassName="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        breakLinkClassName=""
        containerClassName="inline-flex items-stretch -space-x-px"
        activeClassName="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary bg-primary/30 border border-primary hover:bg-primary/50 hover:text-primary dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        renderOnZeroPageCount={null}
      />
      </nav>
    </>
  );
}

export default NavPagination;