package com.booking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.backend.models.Status;
import com.booking.backend.services.IBaseCrudService;

public interface IStatusRepository extends JpaRepository<Status, Long> {
  
}
