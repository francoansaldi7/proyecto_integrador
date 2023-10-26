package com.booking.backend.repository;

import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ReviewRepositoryTest {

  // TODO: Implement test cases

  // @Autowired
  //   private ReviewRepository reviewRepository;

  //   @Test
  //   void testSaveReview() {
  //       // Test Case 1: Save a review successfully
  //       // Description: Verify that the save method saves a review successfully.
  //       // Preconditions: None
  //       // Expected outcome: The saved review should not be null.
  //       Review review = new Review();
  //       Review savedReview = reviewRepository.save(review);
  //       assertNotNull(savedReview);

  //       // Test Case 2: Save a review with invalid data
  //       // Description: Verify that the save method throws an exception when saving a review with invalid data.
  //       // Preconditions: Invalid review data.
  //       // Expected outcome: Should throw a SaveErrorException.
  //       assertThrows(SaveErrorException.class, () -> {
  //           Review invalidReview = new Review(null, null, null); // Invalid data
  //           reviewRepository.save(invalidReview);
  //       });
  //   }

  //   @Test
  //   void testFindById() {
  //       // Assume you have a valid review in the database with a known ID.
  //       Long validReviewId = 1L;

  //       // Test Case 1: Find a review by existing ID
  //       // Description: Verify that the findById method retrieves an existing review by its ID.
  //       // Preconditions: Review with the known ID exists in the database.
  //       // Expected outcome: Should return the review with the known ID.
  //       Review retrievedReview = reviewRepository.findById(validReviewId).orElse(null);
  //       assertNotNull(retrievedReview);
  //       assertEquals(validReviewId, retrievedReview.getId());

  //       // Test Case 2: Find a review by non-existent ID
  //       // Description: Verify that the findById method returns null when searching for a review with a non-existent ID.
  //       // Preconditions: No review exists with the provided ID.
  //       // Expected outcome: Should return null.
  //       Long nonExistentReviewId = 1000L; // Assume this ID does not exist
  //       Review nonExistentReview = reviewRepository.findById(nonExistentReviewId).orElse(null);
  //       assertNull(nonExistentReview);
  //   }

  //   @Test
  //   void testUpdateReview() {
  //       // Assume you have a valid review in the database with a known ID.
  //       Long validReviewId = 2L;

  //       // Test Case 1: Update an existing review
  //       // Description: Verify that the save method updates an existing review correctly.
  //       // Preconditions: Review with the known ID exists in the database.
  //       // Expected outcome: Should return the updated review.
  //       Review existingReview = reviewRepository.findById(validReviewId).orElse(null);
  //       assertNotNull(existingReview);
  //       existingReview.setComment("Updated comment"); // Update the comment
  //       Review updatedReview = reviewRepository.save(existingReview);
  //       assertEquals("Updated comment", updatedReview.getComment());

  //       // Test Case 2: Update a non-existent review
  //       // Description: Verify that the save method throws an exception when trying to update a non-existent review.
  //       // Preconditions: No review exists with the provided ID.
  //       // Expected outcome: Should throw a SaveErrorException.
  //       Review nonExistentReview = new Review();
  //       nonExistentReview.setId(1000L); // Assume this ID does not exist
  //       assertThrows(SaveErrorException.class, () -> {
  //           reviewRepository.save(nonExistentReview);
  //       });
  //   }

  //   @Test
  //   void testDeleteReview() {
  //       // Assume you have a valid review in the database with a known ID.
  //       Long validReviewId = 3L;

  //       // Test Case 1: Delete an existing review
  //       // Description: Verify that the delete method deletes an existing review successfully.
  //       // Preconditions: Review with the known ID exists in the database.
  //       // Expected outcome: The review should be deleted successfully.
  //       Review existingReview = reviewRepository.findById(validReviewId).orElse(null);
  //       assertNotNull(existingReview);
  //       reviewRepository.delete(existingReview);
  //       Review deletedReview = reviewRepository.findById(validReviewId).orElse(null);
  //       assertNull(deletedReview);

  //       // Test Case 2: Delete a non-existent review
  //       // Description: Verify that the delete method throws an exception when trying to delete a non-existent review.
  //       // Preconditions: No review exists with the provided ID.
  //       // Expected outcome: Should throw a DeleteErrorException.
  //       Review nonExistentReview = new Review();
  //       nonExistentReview.setId(1000L); // Assume this ID does not exist
  //       assertThrows(DeleteErrorException.class, () -> {
  //           reviewRepository.delete(nonExistentReview);
  //       });
  //   }
}
