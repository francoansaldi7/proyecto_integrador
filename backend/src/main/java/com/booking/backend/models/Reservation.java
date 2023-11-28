package com.booking.backend.models;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Services service;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User user;

    private LocalDate startingDatetime;
    private LocalDate endingDatetime;
    private float totalPrice;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Status status;

}
