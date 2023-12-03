import React from 'react';

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

export default Review;