package com.booking.backend.models;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Reservation {
  @Id
  private UUID id;
  private Service service;
  private User user;
  private LocalDate startingDatetime;
  private LocalDate endingDatetime;
  private float totalPrice;
}
