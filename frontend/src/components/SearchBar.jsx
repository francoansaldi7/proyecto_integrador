function SearchBar() {
    return (
      <>
      <div className="flex flex-row gap-3">
        <div className="mt-1 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15"><path fill="none" stroke="currentColor" d="m14.5 14.5l-4-4m-4 2a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z"/></svg>
        </div>   
        <input type="text" placeholder="¿Cómo podemos ayudarle hoy?" className="p-2 w-[400px] h-[30px] rounded-lg focus:outline-none focus:ring focus:ring-primary align-center  placeholder:text-slate-400 placeholder:p-2 md:w-[280px]" />
      </div>
      </>
    )
  }
  
  export default SearchBar