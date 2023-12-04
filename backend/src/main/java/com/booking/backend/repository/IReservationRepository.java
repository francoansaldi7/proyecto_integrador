package com.booking.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.backend.models.IReservationReduced;
import com.booking.backend.models.Reservation;
import com.booking.backend.models.User;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, UUID> {

  List<IReservationReduced> findAllByUserId(UUID userId);


}
