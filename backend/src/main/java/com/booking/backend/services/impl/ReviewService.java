package com.booking.backend.services.impl;

import java.util.List;
import java.util.UUID;

import com.booking.backend.models.Services;
import com.booking.backend.models.User;
import com.booking.backend.repository.IReviewRepository;
import com.booking.backend.repository.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.models.Review;

@Service
public class ReviewService {

    private final IReviewRepository reviewRepository;
    private final IServiceRepository serviceRepository;

    @Autowired
    public ReviewService(IReviewRepository reviewRepository, IServiceRepository serviceRepository) {
        this.reviewRepository = reviewRepository;
        this.serviceRepository = serviceRepository;
    }


    public Review saveReview(Review review) {
        double avgRating = reviewRepository.findAvgRatingByServiceId(review.getService().getId());
        Services service = review.getService();
        service.setRating((float) avgRating);
        serviceRepository.save(service);

        return reviewRepository.save(review);
    }

    /**
     * Deletes a review with the given ID.
     *
     * @param id The ID of the review to delete.
     */
    public void deleteReview(UUID id) {
        reviewRepository.deleteById(id);
    }

    public Review updateReview(UUID id, Review updatedReview) {
        Review existingReview = reviewRepository.findById(id).orElse(null);
        if (existingReview != null) {
            Review updated = new Review(
                    existingReview.getId(),
                    updatedReview.getComment(),
                    updatedReview.getDescription(),
                    updatedReview.getRating(),
                    updatedReview.getDate(),
                    updatedReview.getUser(),
                    updatedReview.getService()
            );

            return reviewRepository.save(updated);
        }
        throw new RuntimeException("No se encontró la review");
    }


    public Review getReview(UUID id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();

    }
}
