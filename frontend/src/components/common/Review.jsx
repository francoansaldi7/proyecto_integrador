import PropTypes from 'prop-types';

const Review = ({ review }) => {
  return (
    <div className="review">
      <p>Usuario: {review.username}</p>
      <p>Fecha: {review.date}</p>
      <p>Calificación: {review.rating}</p>
      {review.comment && <p>Comentario: {review.comment}</p>}
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string
  })
}

export default Review;