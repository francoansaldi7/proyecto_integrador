package com.booking.backend.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.booking.backend.models.Reservation;

@Service
public class ReservationService {
  
  public ReservationService() {
    
  }
  /**
 * Saves the reservation.
 */
public Reservation saveReservation(Reservation reservation) {
  // TODO: Implement saving logic here
  return reservation;
  //El siguiente código es solo de muestra 
}

/**
 * Deletes a reservation with the given ID.
 *
 * @param id The ID of the reservation to delete.
 */
public void deleteReservation(UUID id) {
  // TODO: Implementation code here
}

/**
 * Updates a reservation with the specified ID.
 *
 * @param id The ID of the reservation to update.
 * @return The updated reservation.
 */
public Reservation updateReservation(UUID id, Reservation reservation) {
  // TODO: Implement reservation update logic here
  return reservation;
}

/**
 * Retrieves a reservation by its ID.
 * 
 * @param id the ID of the reservation to retrieve
 * @return the reservation with the specified ID, or null if not found
 */
public Reservation getReservation(UUID id) {
  return new Reservation(id);
}

/**
 * Retrieves all reservations from the database.
 */
public List<Reservation> getAllReservations() {
    // TODO: Implement method logic
    return null;
}
}
