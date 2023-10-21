package com.booking.backend.models;

import java.util.UUID;

import org.hibernate.annotations.Type;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Services {
  @Id
  private UUID id;

  private String name;
  public Services(UUID id, String name) {
    this.id = id;
    this.name = name;
  }
}
