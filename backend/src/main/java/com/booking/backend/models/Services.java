package com.booking.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Services {
    @Id
    private UUID id = UUID.randomUUID();
    private String title;
    private String description;
    private float rating;
    private float pricePerHour;

    @ElementCollection
    @CollectionTable(name = "service_availability")
    @MapKeyColumn(name = "starting_date")
    @Column(name = "ending_date")
    private Map<LocalDate, LocalDate> availability = new TreeMap<>();


    private String imgProfileUrl;

    @ManyToMany
    @JoinColumn(name = "characteristic_id", referencedColumnName = "id")
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

    @ManyToMany(mappedBy = "favoriteServices")
    @JsonBackReference
    private List<User> favorites;

}
