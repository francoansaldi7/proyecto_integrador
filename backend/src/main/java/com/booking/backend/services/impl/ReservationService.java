package com.booking.backend.services.impl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Optional;

import com.booking.backend.repository.IReservationRepository;
import com.booking.backend.repository.IServiceImageRepository;
import com.booking.backend.repository.IServiceRepository;
import com.booking.backend.repository.IStatusRepository;
import com.booking.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.models.IReservationReduced;
import com.booking.backend.models.Reservation;
import com.booking.backend.models.Services;
import com.booking.backend.models.Status;
import com.booking.backend.models.User;

@Service
public class ReservationService {

    @Autowired
    IReservationRepository repository;

    @Autowired
    UserService userService;

    @Autowired
    IServiceRepository serviceRepository;

    @Autowired
    ServiceService serviceService;

    @Autowired
    IStatusRepository statusRepository;

    public ReservationService() {

    }

    /**
     * Saves a reservation in the system.
     *
     * @param reservation The reservation object to be saved.
     * @return The saved reservation object. Returns null if the reservation is not valid or if any exception occurs during the saving process.
     */
    public Reservation saveReservation(Reservation reservation) {
        if (!isValidReservation(reservation)) {
            throw new RuntimeException("Reservation is not valid");
        }

        Services service = serviceService.findById(reservation.getService().getId()).orElseThrow(
            () -> new RuntimeException("Service not found")
         );

         User user = userService.findById(reservation.getUser().getId()).orElseThrow(
            () -> new RuntimeException("User not found")
         );


         Status status = statusRepository.findById(reservation.getStatus().getId()).orElseThrow(
            () -> new RuntimeException("Status not found")
         );

         reservation.setTotalPrice(calcTotalPrice(service.getPricePerHour(), reservation.getStartingDatetime(), reservation.getEndingDatetime()));
        service.getAvailability().put(reservation.getStartingDatetime(), reservation.getEndingDatetime());
        try {
            Services res = serviceRepository.save(service);
            reservation.setService(res);
            reservation.setUser(user);
            reservation.setStatus(status);
            return repository.save(reservation);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private float calcTotalPrice(float price, LocalDate startingDate, LocalDate endingDate) {
       
        float totalPriceDay = price * 8;
        Long differenceOfDays = endingDate.toEpochDay() - startingDate.toEpochDay();

        return totalPriceDay * differenceOfDays;
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

    public List<IReservationReduced> getAllUserReservations(UUID userId) {
        return repository.findAllByUserId(userId);
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

        if(reservation.getStatus() == null) {
            return false;
        }

        // Ver cuál de los status permitiría la reserva (no tengo claro eso)
        // else {
        // if (reservation.getStatus() != Status.PENDING && reservation.getStatus() !=
        // Status.CONFIRMED
        // && reservation.getStatus() != Status.COMPLETED && reservation.getStatus() !=
        // Status.CANCELLED) {
        // return false;
        // }
        // }
        return true;
    }

    public List<Reservation> getUserReservations(UUID userId) {
        return null;
    }
}
