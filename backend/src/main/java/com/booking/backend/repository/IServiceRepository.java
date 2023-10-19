package com.booking.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.backend.models.Service;

public interface IServiceRepository extends JpaRepository<Service, UUID> {
  
}
