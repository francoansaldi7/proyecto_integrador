package com.booking.backend.controllers;


import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.booking.backend.models.Review;
import com.booking.backend.services.impl.ReviewService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    /**
     * Retrieves all reviews.
     *
     * @return List of reviews.
     */
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    /**
     * Retrieves a review by its ID.
     *
     * @param reviewId The ID of the review to retrieve.
     * @return The review with the specified ID.
     */
    @GetMapping("/{reviewId}")
    public Review getReviewById(@PathVariable UUID reviewId) {
        return reviewService.getReview(reviewId);
    }

    /**
     * Creates a new review.
     *
     * @param review The review to be created.
     * @return The created review.
     */
    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    /**
     * Updates an existing review.
     *
     * @param reviewId      The ID of the review to update.
     * @param updatedReview The review object with the updated information.
     * @return The updated review.
     */
    @PutMapping("/{reviewId}")
    public Review updateReview(@PathVariable UUID reviewId, @RequestBody Review updatedReview) {
        return reviewService.updateReview(reviewId, updatedReview);
    }

    /**
     * Deletes a review by its ID.
     *
     * @param reviewId The ID of the review to delete.
     */
    @DeleteMapping("/{reviewId}")
    public void deleteReview(@PathVariable UUID reviewId) {
        reviewService.deleteReview(reviewId);
    }
}
