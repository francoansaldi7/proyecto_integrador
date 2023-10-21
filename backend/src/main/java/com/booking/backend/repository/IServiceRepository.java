package com.booking.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.backend.models.Services;

public interface IServiceRepository extends JpaRepository<Services, UUID> {
  
}
