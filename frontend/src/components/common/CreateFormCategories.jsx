import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "../../contexts/globalContext";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const CreateFormCategories = ({ closeForm }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { saveCategory } = useContext(GlobalContext);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage( {
          file,
          imageUrl,
          fileName: file.name
        });
      }
    }


  const handleImageRemove = () => {

    setSelectedImage(null);
  };

  const handleDescription = (event) => {
    const description = event.target.value;
    setDescription(description);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    let savedCategory;
    setIsLoading(true);
    try {
      savedCategory = await saveCategory({
        category: {name: categoryName, description: description},
        imageFile: selectedImage?.file,
        fileName: selectedImage?.fileName
      });
      setIsLoading(false);
      closeForm();
      toast.success("¡Categoría creada exitosamente!");
    } catch (error) {
      setIsLoading(false);
      toast.error("Se produjo un error al crear la categoría.");
    }
    console.log(savedCategory);
  };



  const handleCategoryName = (event) => {
    const categoryName = event.target.value;
    setCategoryName(categoryName);
  };


  return (
    <div
      id="createCategoryModal"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-[calc(100vh-1rem)] md:h-full flex"
      aria-modal="true"
      role="dialog"
    >
      {isLoading && (
        <div className="fixed flex z-10 w-full h-full bg-[rgba(0,0,0,0.4)] justify-center items-center">
          <svg
            className="w-20 h-20"
            version="1.1"
            id="L6"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
          >
            <rect
              fill="none"
              stroke="#fff"
              x="25"
              y="25"
              width="50"
              height="50"
            >
              <animateTransform
                attributeName="transform"
                dur="0.5s"
                from="0 50 50"
                to="180 50 50"
                type="rotate"
                id="strokeBox"
                attributeType="XML"
                begin="rectBox.end"
              />
            </rect>
            <rect x="27" y="27" fill="#fff" width="46" height="50">
              <animate
                attributeName="height"
                dur="1.3s"
                attributeType="XML"
                from="50"
                to="0"
                id="rectBox"
                fill="freeze"
                begin="0s;strokeBox.end"
              />
            </rect>
          </svg>
        </div>
      )}
      <div className="relative p-4 w-full max-w-3xl h-full ">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Añadir Categoría
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="createProductModal"
              onClick={closeForm}
            >
              <AiOutlineClose />

              <span className="sr-only">Cerrar Modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Escriba el nombre de la categoría"
                  required=""
                  onChange={handleCategoryName}
                  value={categoryName}
                />
              </div>
              
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descripcion
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write service description here"
                  required=""
                  onChange={handleDescription}
                  value={description}
                ></textarea>
              </div>
            </div>

            <div className="mb-4">
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Imágene de la categoría
              </span>
              <div className="flex justify-center items-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Haga clic para cargar</span>
                      o arrastrar y soltar
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple={false}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
               
                  <div  className="col-span-1 relative">
                    <img
                      src={selectedImage?.imageUrl}
                      className="cursor-pointer hover:shadow-md hover:shadow-slate-700 h-32 w-full object-cover rounded-md border-8 border-primary/30"
                    />
                    <AiOutlineClose
                      onClick={() => handleImageRemove()}
                      className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700 "
                    />
                  </div>
              </div>
              <div className="errors flex col">
                {errors.map((error, index) => (
                  <div key={index} className="error text-red-700">
                    {error}
                  </div>
                ))}
              </div>
            </div>
            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                className="w-full sm:w-auto justify-center text-white inline-flex bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-secondary-dark dark:focus:ring-primary-dark relative"
              >
                Agregar categoría
              </button>
              {/* <button className="w-full sm:w-auto text-white justify-center inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <svg
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path>
                </svg>
                Schedule
              </button> */}
              <button
                type="button"
                className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                <AiOutlineClose className="mr-1 -ml-1 w-5 h-5" />
                Desechar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateFormCategories.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

export default CreateFormCategories;
