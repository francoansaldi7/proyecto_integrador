package com.booking.backend.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Review {
  @Id
  private UUID id;
  public Review(UUID id) {
    this.id = id;
  }
  private String comment;
}