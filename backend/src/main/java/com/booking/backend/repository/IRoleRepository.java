package com.booking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.backend.models.Role;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Integer> {

  
} 
