package com.booking.backend.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
  @Id
  private UUID id;
  private String name;
  private String email;
  private String password;
  private String phoneNumber;
  private String imgProfileUrl;

}
