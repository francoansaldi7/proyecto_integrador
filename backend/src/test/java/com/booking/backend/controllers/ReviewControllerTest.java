package com.booking.backend.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.booking.backend.models.Review;
import com.booking.backend.services.ReviewService;

@SpringBootTest
class ReviewControllerTest {
  @Mock
  private ReviewService reviewService;

  @InjectMocks
  private ReviewController reviewController;

  @Test
  void contextLoads() {
    assertNotNull(reviewController);
  }

  @Test
void testGetAllReviews() {
    // Test case 1: Obtaining all reviews
    // Description: Verify that the getAllReviews method returns a list of reviews
    // Preconditions: Reviews exist in the database
    // Expected outcome: A list of reviews is returned
    List<Review> reviews = Arrays.asList(new Review(UUID.randomUUID()), new Review(UUID.randomUUID()));
    when(reviewService.getAllReviews()).thenReturn(reviews);

    List<Review> retrievedReviews = reviewController.getAllReviews();

    assertNotNull(retrievedReviews);
    assertEquals(reviews.size(), retrievedReviews.size());
    // Add more assertions to compare the actual and expected lists of reviews

    // Test case 2: Obtaining all reviews when there are no reviews
    // Description: Verify that the getAllReviews method handles the case when no reviews exist
    // Preconditions: No reviews exist in the database
    // Expected outcome: An empty list is returned
    // TODO: Add test case logic here
}

@Test
void testGetReviewById() {
    // Test case 1: Obtaining a review by ID
    // Description: Verify that the getReviewById method returns a review with a specific ID
    // Preconditions: A review with the specified ID exists in the database
    // Expected outcome: The review with the specified ID is returned
    UUID reviewId = UUID.randomUUID();
    Review review = new Review(reviewId);
    when(reviewService.getReview(reviewId)).thenReturn(review);

    Review retrievedReview = reviewController.getReviewById(reviewId);

    assertNotNull(retrievedReview);
    assertEquals(reviewId, retrievedReview.getId());
    // Add more assertions to compare the actual and expected review details

    // Test case 2: Obtaining a review by ID that does not exist
    // Description: Verify that the getReviewById method handles the case when the review does not exist
    // Preconditions: No review with the specified ID exists in the database
    // Expected outcome: Null is returned
    // TODO: Add test case logic here
}

@Test
void testCreateReview() {
    // Test case 1: Creating a new review
    // Description: Verify that the createReview method successfully creates a new review
    // Preconditions: None
    // Expected outcome: Review is created successfully
    Review review = new Review(UUID.randomUUID());
    when(reviewService.saveReview(review)).thenReturn(review);

    Review createdReview = reviewController.createReview(review);

    assertNotNull(createdReview);
    assertEquals(review.getId(), createdReview.getId());
    // Add more assertions to verify the expected outcome

    // Test case 2: Creating a review with invalid data
    // Description: Verify that the createReview method handles invalid review data correctly
    // Preconditions: The review data is invalid (e.g. missing required fields)
    // Expected outcome: Review is not created, and an error is returned
    // TODO: Add test case logic here
}

@Test
void testUpdateReview() {
    // Test case 1: Updating an existing review
    // Description: Verify that the updateReview method successfully updates an existing review
    // Preconditions: An existing review with a valid ID
    // Expected outcome: Review is updated successfully
    UUID reviewId = UUID.randomUUID();
    Review updatedReview = new Review(reviewId);
    when(reviewService.updateReview(reviewId, updatedReview)).thenReturn(updatedReview);

    Review updatedReviewResponse = reviewController.updateReview(reviewId, updatedReview);

    assertNotNull(updatedReviewResponse);
    assertEquals(reviewId, updatedReviewResponse.getId());
    // Add more assertions to verify the expected outcome

    // Test case 2: Updating a non-existing review
    // Description: Verify that the updateReview method handles the case when updating a non-existing review
    // Preconditions: The review with the specified ID does not exist in the database
    // Expected outcome: An exception is thrown
    // TODO: Add test case logic here
}

@Test
void testDeleteReview() {
    // Test case 1: Deleting an existing review
    // Description: Verify that the deleteReview method successfully deletes an existing review
    // Preconditions: An existing review with a valid ID
    // Expected outcome: Review is deleted successfully
    UUID reviewId = UUID.randomUUID();
    reviewController.deleteReview(reviewId);
    // Verify that the reviewService's deleteReview method was called with the correct reviewId
    verify(reviewService).deleteReview(reviewId);

    // Test case 2: Deleting a non-existing review
    // Description: Verify that the deleteReview method handles the case when deleting a non-existing review
    // Preconditions: The review with the specified ID does not exist in the database
    // Expected outcome: No exception is thrown, and the delete operation is considered successful
    // TODO: Add test case logic here
}

}
