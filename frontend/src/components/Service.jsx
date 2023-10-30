class Service {
  constructor(serviceName, category, pricePerHour, rating, description) {
    this.setServiceName(serviceName);
    this.setCategory(category);
    this.setPricePerHour(pricePerHour);
    this.setRating(rating);
    this.setDescription(description);
  }

  setServiceName(serviceName) {
    if (!serviceName || serviceName.length > 50) {
      throw new Error('El nombre del servicio debe tener entre 1 y 50 caracteres.');
    }
    this.title = serviceName;
  }

  setCategory(category) {
    category = parseInt(category);
    if (!category || category < 1 || category > 9) {
      throw new Error('La categoría debe ser un número entre 1 y 9.');
    }
    this.typeOfService = {
      id: category
    };
  }

  setPricePerHour(pricePerHour) {
    if (!pricePerHour || pricePerHour < 0 || pricePerHour > 100000000) {
      throw new Error('El precio por hora debe estar entre 0 y 100,000,000.');
    }
    this.pricePerHour = pricePerHour;
  }

  setRating(rating) {
    if (rating < 1 || rating > 5) {
      throw new Error('La calificación debe estar entre 1 y 5.');
    }
    this.rating = rating;
  }

  setDescription(description) {
    if (!description || description.length > 1000) {
      throw new Error('La descripción no puede estar vacía y debe tener menos de 1000 caracteres.');
    }
    this.description = description;
  }
}


export default Service;