package com.booking.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.backend.models.TypesOfServices;

public interface ITypeOfServiceRepository extends JpaRepository<TypesOfServices, Long> {

}
