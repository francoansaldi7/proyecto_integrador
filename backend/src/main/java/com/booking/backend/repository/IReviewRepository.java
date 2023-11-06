package com.booking.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.backend.models.Review;

@Repository
public interface IReviewRepository extends JpaRepository<Review, UUID> {

}
