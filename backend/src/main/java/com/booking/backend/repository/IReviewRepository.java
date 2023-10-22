package com.booking.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.backend.models.Review;

public interface IReviewRepository extends JpaRepository<Review, UUID> {
  
}
