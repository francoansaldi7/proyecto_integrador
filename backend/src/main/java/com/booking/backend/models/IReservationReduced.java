package com.booking.backend.models;

import java.time.LocalDate;
import java.util.UUID;

import com.booking.backend.repository.IServiceReduced;

public interface IReservationReduced {
  UUID getId();

  IUserReduced getUser();

  IServiceReduced getService();

  Status getStatus();

  LocalDate getStartingDatetime();

  LocalDate getEndingDatetime();

  float getTotalPrice();
}
