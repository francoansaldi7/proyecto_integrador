package com.booking.backend.models;

import jakarta.persistence.Id;

import java.util.List;
import java.util.UUID;

public class ServiceProvider extends Service{
    @Id
    private UUID id;

    private List<String> facilitiesAvailable;

    private List<String> availableEquipment;
    private List<String> team;
    //va service?
    private Service service;

}
