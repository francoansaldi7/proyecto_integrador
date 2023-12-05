package com.booking.backend.services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.lang.Thread;

import com.booking.backend.models.Services;
import com.booking.backend.models.User;
import com.booking.backend.repository.IReviewRepository;
import com.booking.backend.repository.IServiceRepository;
import com.booking.backend.repository.IUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.booking.backend.models.Review;

@Service
public class ReviewService {

    private final IReviewRepository reviewRepository;
    private final IServiceRepository serviceRepository;
    private final IUserRepository userRepository;
    private final ServiceService serviceService;

    @Autowired
    public ReviewService(IReviewRepository reviewRepository, IServiceRepository serviceRepository,
            IUserRepository userRepository, ServiceService serviceService) {
        this.reviewRepository = reviewRepository;
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
        this.serviceService = serviceService;
    }

    public Review saveReview(Review review) {
        if(review.getRating() <= 0 || review.getRating() > 5 ) {
            throw new RuntimeException("La puntuación debe estar entre 0 y 5");
        }
        Services service = serviceRepository.findById(review.getService().getId())
                .orElseThrow(() -> new RuntimeException("No se encontró el servicio"));

        User user = userRepository.findById(review.getUser().getId())
                .orElseThrow(() -> new RuntimeException("No se encontró el usuario"));

        LocalDate date = LocalDate.now();

        review.setDate(date);
        review.setService(service);
        review.setUser(user);
        Review savedReview = reviewRepository.save(review);
        serviceService.updateRatingOfService(service);
        return savedReview;
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
                    updatedReview.getCommentTitle(),
                    updatedReview.getRating(),
                    updatedReview.getDate(),
                    updatedReview.getUser(),
                    updatedReview.getService());

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
