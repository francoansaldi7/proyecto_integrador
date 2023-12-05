export class Review {

  /**
   * Creates a new instance of the Review class.
   *
   * @param {type} serviceId - the ID of the service
   * @param {type} userId - the ID of the user
   * @param {type} rating - the rating for the service
   * @param {type} comment - the comment for the service
   * @param {type} commentTitle - the title of the comment
   * @return {type} - returns nothing
   */
  constructor(serviceId, userId, rating, comment, commentTitle) {
    this.validate(serviceId, userId, rating, comment, commentTitle);
    this.service = {
      id: serviceId
    };
    this.user = {
      id: userId
    };
    this.rating = rating;
    this.comment = comment;
    this.commentTitle = commentTitle;
  }

  /**
   * Validates the input parameters for the function.
   *
   * @param {string} serviceId - The ID of the service.
   * @param {string} userId - The ID of the user.
   * @param {number} rating - The rating for the service.
   * @param {string} comment - The comment for the service.
   * @param {string} commentTitle - The title of the comment.
   * @throws {Error} If any of the input parameters are missing or have invalid types.
   */
  validate(serviceId, userId, rating, comment, commentTitle) {
    if (!serviceId || typeof serviceId !== 'string') {
      throw new Error('El ID del servicio es requerido.');
    }
    if (!userId || typeof userId !== 'string') {
      throw new Error('El ID del usuario es requerido.');
    }

    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      throw new Error('La calificación es requerida, y debe estar entre 1 y 5.');
    }

    if (!comment || typeof comment !== 'string' || comment.length > 1000) {
      throw new Error('El comentario es requerido, y debe tener menos de 1000 caracteres.');
    }
    
    if (!commentTitle || typeof commentTitle !== 'string' || commentTitle.length > 50) {
      throw new Error('El comentario es requerido, y debe tener menos de 50 caracteres.');
    }
  }

/**{
  "service": {
    "id": "0343a426-e6c5-4492-8464-350d89e119f3"
  },
  "user": {
    "id": "8ae038db-9285-4626-8629-f171153b90e2"
  },
  "rating": 4.5,
  "comment": "Servicio muy bueno y recomendado",
  "commentTitle": "Muy Bueno"
} */
}