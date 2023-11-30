package com.booking.backend.services.impl;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

import com.booking.backend.repository.IReservationRepository;
import com.booking.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.models.Reservation;

@Service
public class ReservationService {
    @Autowired
    IReservationRepository repository;
    @Autowired
    UserService userService;

    @Autowired
    //ServiceService serviceService;

    public ReservationService() {

    }

    public Reservation saveReservation(Reservation reservation) {
        if (!isValidReservation(reservation)) {
            return null;
        }
        return repository.save(reservation);
    }


    public void deleteReservation(UUID id) {
        Optional<Reservation> existingReservation = repository.findById(id);

        if (existingReservation.isPresent()) {
            repository.deleteById(id);
        }
    }

    public Reservation updateReservation(UUID id, Reservation reservation) {
        Optional<Reservation> existingReservation = repository.findById(id);

        if (existingReservation.isPresent()) {
            Reservation reservationUp = existingReservation.get();

            reservationUp.setUser(reservation.getUser());
            reservationUp.setTotalPrice(reservation.getTotalPrice());
            reservationUp.setStartingDatetime(reservation.getStartingDatetime());
            reservationUp.setEndingDatetime(reservation.getEndingDatetime());
            return repository.save(reservationUp);
        } else {
            return null;
        }
    }


    public Reservation getReservation(UUID id) {
        Optional<Reservation> optionalReservation = repository.findById(id);
        if (optionalReservation.isPresent()) {
            return optionalReservation.get();
        } else {
            return null;
        }
    }


    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    private boolean isValidReservation(Reservation reservation) {
        if (reservation.getService() == null || reservation.getUser() == null) {
            return false;
        }

        if (reservation.getStartingDatetime() == null || reservation.getEndingDatetime() == null) {
            return false;
        }

        if (reservation.getStartingDatetime().isAfter(reservation.getEndingDatetime())) {
            return false;
        }

        if (reservation.getTotalPrice() <= 0) {
            return false;
        }

        if (reservation.getStatus() == null) {
            return false;
        }
        //Ver cuál de los status permitiría la reserva (no tengo claro eso)
//    else {
//      if (reservation.getStatus() != Status.PENDING && reservation.getStatus() != Status.CONFIRMED
//              && reservation.getStatus() != Status.COMPLETED && reservation.getStatus() != Status.CANCELLED) {
//        return false;
//      }
//    }
        return true;
    }

    public List<Reservation> getUserReservations(UUID userId) {
        return null;
    }
}
