import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/globalContext";
const CategorysSection = () => {
  const [categories, setCategories] = useState([])
  const {services, setUnorganizedServices}= useContext(GlobalContext);

  useEffect(() => {
    let categories = [{id: 0, name: 'All'}]
    let names = []
    services.map((service, index) => {
      if(!names.includes(service.typeOfService.name)){
        categories.push({id: index + 1, name: service.typeOfService.name})
        names.push(service.typeOfService.name)

      }
    })
    setCategories(categories)

  }, [services])
//  const categories = [
//     { id: 1, name: 'Destacado' },
//     { id: 2, name: 'Estudio de Animacion' },
//     { id: 3, name: 'Estudio de Filmacion' },
//     { id: 4, name: 'Fotografia' },
//     { id: 5, name: 'Videografia' },
//   ];



  const [activeCategory, setActiveCategory] = useState(0);


  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    let filteredServices = services.filter((service) => {
      if (categoryId === 0) {
        return service
      } else if (service.typeOfService.name === categories[categoryId].name) {
        return service
      }
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