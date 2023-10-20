package com.booking.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.backend.models.Service;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IServiceRepository extends JpaRepository<Service, UUID> {
    @Query("Select s from Service s WHERE s.Name LIKE %:Name%")
    public List<Service> findByName(@Param("Name") String Name);

}
