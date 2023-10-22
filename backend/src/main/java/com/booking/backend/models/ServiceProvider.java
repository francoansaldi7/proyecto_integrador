package com.booking.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
public class ServiceProvider extends User{
    @Id
    private UUID id;
    
    private List<String> facilitiesAvailable;
    
    private List<String> availableEquipment;
    private List<String> team;
    @OneToMany(mappedBy = "serviceProvider")
    private List<Services> service;
    
    public ServiceProvider(UUID id, String name) {
        super(id);
    }
}
