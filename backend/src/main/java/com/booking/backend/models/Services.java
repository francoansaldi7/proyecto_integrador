package com.booking.backend.models;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.Type;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;

@Entity
@Getter
public class Services {
  @Id
  private UUID id;
  private String name;
  private String title;
  private String description;
  private float rating;
  private float pricePerHour;
  private List<List<LocalDate>> availability;
  private String imgProfileUrl;
  @OneToMany(mappedBy = "service")
  private List<Work> works;

  @Enumerated(EnumType.STRING)
  private TypesOfServices typeOfService;

  @ManyToOne
  @JoinColumn(name = "service_provider_id")
  private ServiceProvider serviceProvider;

  @OneToMany(mappedBy = "service")
  private List<Review> reservations;


  public Services(UUID id, String name) {
    this.id = id;
    this.name = name;
  }
}
