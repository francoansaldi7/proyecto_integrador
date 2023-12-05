import Review from './Review';
import Proptypes from 'prop-types';

const Reviews = ({ averageRating = 0, totalReviews = 0, reviews = [] }) => {
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

Reviews.propTypes = {
  averageRating: Proptypes.number,
  totalReviews: Proptypes.number,
  reviews: Proptypes.array,
}

export default Reviews;