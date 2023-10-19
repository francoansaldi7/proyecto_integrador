package com.booking.backend.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity

public class Reservation {
  public Reservation(Reservation user2, String string) {
  }
  @Id
  private UUID id;
  private Service service;
  private User user;
}
