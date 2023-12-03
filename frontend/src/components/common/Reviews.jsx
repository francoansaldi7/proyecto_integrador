import React from 'react';
import Review from './Review';

const Reviews = ({ averageRating, totalReviews, reviews }) => {
  return (
    <div className="reviews-container">
      <div className="average-rating">
        <p>Calificación Promedio: {averageRating}</p>
      </div>
      <div className="total-reviews">
        <p>Número de Calificaciones: {totalReviews}</p>
      </div>
      <div className="individual-reviews">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;