import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/globalContext";
const CategorysSection = () => {
  const [categories, setCategories] = useState([])
  const {services, setUnorganizedServices, getAllCategories}= useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      
      let categories = [{id: 0, name: 'All'}]
      try {
        const result = await getAllCategories();
        if(result){
          categories = categories.concat(result)
        }
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [services])

  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    let filteredServices = services.filter((service) => {
      if (categoryId === 0) {
        return service
      }
      let serviceFound; 
      service.typeOfService.map((category) => {
        if (category.id === categoryId) {
          console.log(service);
          serviceFound = service;
        }
      })
      return serviceFound;
    })
    setUnorganizedServices(filteredServices);
  };

  return (
    <div className="flex sm:self-center rounded-xl bg-gray-200 p-[1px] flex-col sm:flex-row self-start w-full sm:w-[unset] mx-0">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`category hover:bg-white p-2 rounded-xl cursor-pointer hover:shadow-sm hover:shadow-slate-700/30 transition-colors ${
            activeCategory === category.id ? 'bg-white shadow-sm shadow-slate-700/30' : ''
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <h2 className="text-gray-700 font-semibold">{category.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default CategorysSection