import Review from './Review';
import Proptypes from 'prop-types';
import {Rating} from '@mui/material';

const Reviews = ({ averageRating = 0, totalReviews = 0, reviews = [] }) => {
  return (
    <div className="reviews-container">
      <h1 className="font-bold text-white text-2xl pb-2">Reseñas</h1>
      <div className="average-rating flex items-center gap-2 text-white font-bold">
        <Rating name="rating" precision={0.1} readOnly value={averageRating} className='h-10 scale-150 px-7'/>
        <p className='text-3xl'>{averageRating}</p>
      </div>
        <hr className="pb-4" />
      {/* <div className="total-reviews">
        <p>Número de Calificaciones: {totalReviews}</p>
      </div> */}
      <div className="individual-reviews flex flex-col">
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