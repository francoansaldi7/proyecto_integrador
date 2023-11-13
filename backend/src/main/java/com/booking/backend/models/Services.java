package com.booking.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

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

    @OneToMany(mappedBy = "service")
    @JsonManagedReference
    private List<Characteristic> characteristics;
    
    @OneToMany
    private List<ServiceImage> gallery;

    @OneToMany(mappedBy = "service")
    private List<Work> works;

    @ManyToMany
    @JoinColumn(name = "type_of_service_id", referencedColumnName = "id")
    private List<TypesOfServices> typeOfService;

    @ManyToOne
    @JoinColumn(name = "service_provider_id")
    private ServiceProvider serviceProvider;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<Review> reservations;


    public Services(UUID id, String name) {
        if (id == null) {
            id = UUID.randomUUID();
        } else {
            this.id = id;
        }
        this.name = name;
    }


}
