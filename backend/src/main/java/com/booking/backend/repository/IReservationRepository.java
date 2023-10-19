package com.booking.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.backend.models.Reservation;

public interface IReservationRepository extends JpaRepository<Reservation, UUID> {


}
