package com.booking.backend.models;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Review {
  @Id
  private UUID id;
  private String comment;
  private String description;
  private float rating;
  private LocalDate date;

}
