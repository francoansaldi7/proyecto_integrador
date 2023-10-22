package com.booking.backend.models;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class Reservation {
  @Id
  private UUID id;
  @ManyToOne
  private Services service;
  
  @ManyToOne
  private User user;
  private LocalDate startingDatetime;
  private LocalDate endingDatetime;
  private float totalPrice;

  @Enumerated(EnumType.STRING)
  private Status status;
  
  public Reservation(UUID id) {
    this.id = id;
  }
}
