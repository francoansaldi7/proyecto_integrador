package com.booking.backend.models;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="users")
@Getter
@Setter
public class User implements Serializable {
  @Id
  private UUID id;
  private String name;

  @Column(unique=true, length = 30)
  private String email;

  @Column(length=60)
  private String password;

  private String phoneNumber;
  private String imgProfileUrl;

  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(mappedBy = "user")
  private List<Review> reviews;

  @Column(name = "last_password_reset_date")
  private Timestamp lastPasswordResetDate;

  public User(UUID id) {
    this.id = id;
  }
}
