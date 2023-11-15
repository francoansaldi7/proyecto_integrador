package com.booking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.backend.models.TypesOfServices;

@Repository
public interface ICategoryRepository extends JpaRepository<TypesOfServices, Long> {
  
}
