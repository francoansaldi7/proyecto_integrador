import  { useEffect, useState } from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconsList = ({setIconName}) => {
  const [iconsList, setIconsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Filtrar iconos según el término de búsqueda
     let icons=[];
    for(const iconName in fas){
      icons.push(fas[iconName]);
    }
    const filteredIcons = icons
      .filter(icon => {
        return icon.iconName.toLowerCase().includes(searchTerm.toLowerCase())
      
      })
    setIconsList(filteredIcons);
  }, [searchTerm]);

  return (
    <div className='dark:text-white dark:bg-slate-600 p-5 rounded-md h-[300px] overflow-y-auto flex flex-col gap-1'>
      <input
        type="text"
        placeholder="Buscar icono..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 bg-slate-500 rounded-full "
      />
      {iconsList.map((icon, index) => (
        <div key={index} className="flex items-center gap-2 p-2 bg-slate-400 rounded-sm cursor-pointer hover:bg-slate-500" onClick={() => setIconName(`fa fa-${icon.iconName}`)}>
          <h4>{icon.iconName}</h4>
          <FontAwesomeIcon className='text-2xl' icon={`fa fa-${icon.iconName}`} />
        </div>
      ))}
    </div>
  );
};

IconsList.propTypes = {
  setIconName: () => {},
}

export default IconsList;
