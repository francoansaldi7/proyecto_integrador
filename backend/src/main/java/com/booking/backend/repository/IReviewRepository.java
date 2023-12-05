package com.booking.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.booking.backend.models.Review;

@Repository
public interface IReviewRepository extends JpaRepository<Review, UUID> {
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.service.id = :serviceId")
Optional<Float> findAvgRatingByServiceId(@Param("serviceId") UUID serviceId);

}

