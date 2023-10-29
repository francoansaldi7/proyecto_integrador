package com.booking.backend.models;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.Type;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Services {
  @Id
  private UUID id = UUID.randomUUID();
  private String name;
  private String title;
  private String description;
  private float rating;
  private float pricePerHour;
  private List<List<LocalDate>> availability;
  private String imgProfileUrl;
 

  @OneToMany
  private List<ServiceImage> gallery;

  @OneToMany(mappedBy = "service")
  private List<Work> works;

  @ManyToOne
  @JoinColumn(name = "type_of_service_id", referencedColumnName = "id")
  private TypesOfServices typeOfService;

  @ManyToOne
  @JoinColumn(name = "service_provider_id")
  private ServiceProvider serviceProvider;

  @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
  private List<Review> reservations;


  public Services(UUID id , String name) {
    if (id == null) {
      id = UUID.randomUUID();
    } else{
      this.id = id;
    }
    this.name = name;
  }

 
}
