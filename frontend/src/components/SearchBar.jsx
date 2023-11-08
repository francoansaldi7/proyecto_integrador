function SearchBar() {
    return (
      <>
      <div className="md:flex md:flex-row md:gap-3 hidden">
        <div className="mt-1 text-primary min-[820px]:mt-3 min-[820px]:mr-2 md:mt-5] lg:mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15"><path fill="none" stroke="currentColor" d="m14.5 14.5l-4-4m-4 2a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z"/></svg>
        </div>
        

        <input type="text" placeholder="Como podemos ayudarte hoy?" className="md:hidden lg:mt-1 lg:flex xl:flex p-2 w-[400px] h-[30px] rounded-lg focus:outline-none focus:ring focus:ring-primary align-center  placeholder:text-slate-400 placeholder:p-2 md:w-[280px] lg:mr-[-30px]" />
      </div>
      </>
    )
  }
  
  export default SearchBar