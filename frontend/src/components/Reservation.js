/**
 * @typedef {Object} Service
 * @property {string} id - ID del servicio.
 */

/**
 * @typedef {Object} User
 * @property {string} id - ID del usuario.
 */

/**
 * @typedef {Object} Status
 * @property {string} id - ID del estado.
 */

/**
 * Clase para representar una reserva.
 */
export class Reservation {
  /**
   * Constructor de la clase Reservation.
   * @param {string} serviceId - ID del servicio.
   * @param {string} userId - ID del usuario.
   * @param {string} statusId - ID del estado.
   * @param {string} startingDatetime - Fecha de inicio. YYYY-MM-DD
   * @param {string} endingDatetime - Fecha de finalización. YYYY-MM-DD
   */
  constructor(serviceId, userId, statusId, startingDatetime, endingDatetime) {
    this.setService({ id: serviceId });
    this.setUser({ id: userId });
    this.setStatus({ id: statusId }); 
    this.startingDatetime = startingDatetime;
    this.endingDatetime = endingDatetime;
  }

  /**
   * Establece el servicio de la reserva.
   * @param {Service} service - Objeto que representa el servicio.
   */
  setService(service) {
    this.service = service;
  }

  /**
   * Establece el usuario de la reserva.
   * @param {User} user - Objeto que representa el usuario.
   */
  setUser(user) {
    this.user = user;
  }

  /**
   * Establece el estado de la reserva.
   * @param {Status} status - Objeto que representa el estado.
   */
  setStatus(status) {
    this.status = status;
  }
}

// Uso de la clase Reservation
new Reservation("servicio123", "usuario456", 789, 1);

/** endingDatetime*/

