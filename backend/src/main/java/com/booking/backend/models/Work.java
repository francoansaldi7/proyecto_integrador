package com.booking.backend.models;

import jakarta.persistence.Id;

import java.util.UUID;

public class Work {

    @Id
    private UUID id;
    private String title;
    private String Description;

    //va service?
    private Service service;

}
