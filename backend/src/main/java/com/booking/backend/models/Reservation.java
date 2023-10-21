package com.booking.backend.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Reservation {
  @Id
  private UUID id;
  // private Service service;
  // private User user;

  public Reservation(UUID id) {
    this.id = id;
  }
  
  
}
