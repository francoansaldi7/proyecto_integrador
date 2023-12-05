package com.booking.backend.models;

import com.booking.backend.views.Views;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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
    @OrderBy("date DESC")
    //@Limit(limit = 10)
    @Fetch(FetchMode.SUBSELECT)
    @BatchSize(size = 10) // Esto limita la cantidad de reviews cargadas

    private List<Review> reviews;



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
