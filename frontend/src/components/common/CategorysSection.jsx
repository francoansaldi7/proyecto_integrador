import { useState } from "react";
const CategorysSection = () => {
 const categories = [
    { id: 1, name: 'Featured' },
    { id: 2, name: 'Animation Studio' },
    { id: 3, name: 'Filming Studio' },
    { id: 4, name: 'Photography' },
    { id: 5, name: 'Videography' },
  ];

  const [activeCategory, setActiveCategory] = useState(1);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="flex self-center rounded-xl bg-gray-200 p-[1px]">
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