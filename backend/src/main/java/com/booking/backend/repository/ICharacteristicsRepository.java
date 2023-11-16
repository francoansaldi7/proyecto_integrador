package com.booking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.backend.models.Characteristic;

@Repository
public interface ICharacteristicsRepository extends JpaRepository<Characteristic, Long> {

  
}
