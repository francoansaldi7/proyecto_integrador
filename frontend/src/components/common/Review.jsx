import PropTypes from 'prop-types';
import { Rating } from '@mui/material';
const Review = ({ review }) => {
  return (
    <div className="review flex flex-col gap-4 text-white mb-8 rounded-md p-4 border border-purple-700">
      <div className='flex gap-4 items-center'>
        <p className='font-bold text-xl'>{review.user.name}<span className='text-white/50'> ({review.user.username})</span></p>
        <p className='font-bold text-white/50'>Fecha: {review.date}</p>

      </div>
      <div className='flex gap-2'>
        <Rating name="rating" readOnly value={review.rating} />
        <p className='p-1 px-2 font-bold text-orange-500 rounded-sm bg-white/10'>{review.rating}</p>
      </div>
      {review.commentTitle && <h6 className='font-bold text-lg'>{review.commentTitle}</h6>}
      {review.comment && <p>{review.comment}</p>}
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }),
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string,
    commentTitle: PropTypes.string
  })
}

export default Review;