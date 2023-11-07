package com.booking.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

import java.util.UUID;

@Entity
@Getter
public class Work {

    @Id
    private UUID id;
    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Services service;

}
