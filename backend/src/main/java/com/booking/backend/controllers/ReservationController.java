package com.booking.backend.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.backend.models.Reservation;
import com.booking.backend.services.ReservationService;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {
  @Autowired
  private ReservationService reservationService;

  /**
   * Retrieves all reservations.
   */
  @GetMapping
  public List<Reservation> getAllReservations() {
    // Call the getAllReservation method from the reservationService to retrieve all
    // reservations
    return reservationService.getAllReservations();
  }

  /**
   * Retrieves a reservation by their ID.
   *
   * @param reservationId The ID of the reservation to retrieve.
   */
  @GetMapping("/{reservationId}")
  public Reservation getReservationById(@PathVariable UUID reservationId) {
    // Call the reservationService to get the reservation by ID
    return reservationService.getReservation(reservationId);
  }

  /**
   * Creates a new reservation.
   *
   * @param reservation The reservation to be created.
   */
  @PostMapping
  public Reservation createReservation(@RequestBody Reservation reservation) {
    return reservationService.saveReservation(reservation);
  }

  /**
   * Updates an existing reservation.
   *
   * @param reservation The reservation object containing the updated information.
   * @return The updated reservation.
   */
  @PutMapping("/{reservationId}")
  public Reservation updateReservation(@PathVariable UUID reservationId ,@RequestBody Reservation reservation) {
    return reservationService.updateReservation(reservationId ,reservation);
  }

  /**
   * Deletes a reservation for the given ID.
   *
   * @param reservationId The ID of the reservation to delete.
   */
  @DeleteMapping("/{reservationId}")
  public void deleteReservation(@PathVariable UUID reservationId) {
    reservationService.deleteReservation(reservationId);
  }
}
