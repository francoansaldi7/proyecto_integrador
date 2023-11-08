import { useState } from "react";
const CategorysSection = () => {
 const categories = [
    { id: 1, name: 'Destacado' },
    { id: 2, name: 'Estudio de Animacion' },
    { id: 3, name: 'Estudio de Filmacion' },
    { id: 4, name: 'Fotografia' },
    { id: 5, name: 'Videografia' },
  ];

  const [activeCategory, setActiveCategory] = useState(1);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
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