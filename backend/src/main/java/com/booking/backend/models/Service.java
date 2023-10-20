package com.booking.backend.models;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Service {
  @Id
  private UUID id;
  private String name;
  private String title;
  private String description;
  private float rating;
  private float pricePerHour;
  private List<List<LocalDate>> availability;

}
