package com.booking.backend.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.booking.backend.models.Review;

@Service
public class ReviewService {
  
  public ReviewService() {
    
  }

/**
   * Saves the review.
   *
   * @param review The review to be saved.
   * @return The saved review.
   */
  public Review saveReview(Review review) {
    // TODO: Implement saving logic here
    // Sample code:
    // Database.save(review);
    return review;
  }

  /**
   * Deletes a review with the given ID.
   *
   * @param id The ID of the review to delete.
   */
  public void deleteReview(UUID id) {
    // TODO: Implement deletion logic here
    // Sample code:
    // Database.deleteReview(id);
  }

  /**
   * Updates a review with the specified ID.
   *
   * @param id The ID of the review to update.
   * @param updatedReview The review object with updated information.
   * @return The updated review.
   */
  public Review updateReview(UUID id, Review updatedReview) {
    // TODO: Implement review update logic here
    // Sample code:
    // Review existingReview = Database.getReview(id);
    // if (existingReview != null) {
    //     existingReview.update(updatedReview);
    //     return existingReview;
    // }
    return updatedReview;
  }

  /**
   * Retrieves a review by its ID.
   * 
   * @param id The ID of the review to retrieve.
   * @return The review with the specified ID, or null if not found.
   */
  public Review getReview(UUID id) {
    // TODO: Implement retrieval logic here
    // Sample code:
    // return Database.getReview(id);
    return new Review(id);
  }

  /**
   * Retrieves all reviews from the database.
   *
   * @return List of all reviews.
   */
  public List<Review> getAllReviews() {
    // TODO: Implement method logic here
    // Sample code:
    // return Database.getAllReviews();
    return null;
  }
}
