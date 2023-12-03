import React, { useState } from 'react';
import { Rating } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const ReviewPopup = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const reviewData = {
        rating: rating,
        title: title,
        comment: comment,
      };

      // Realiza la llamada a la API para enviar la reseña
      const response = await fetch('http://tu-backend/api/v1/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log('Reseña enviada correctamente');
      } else {
        console.error('Error al enviar la reseña:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la reseña:', error);

    }

    onSubmit();
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Hacer comentario</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Rating name="rating" value={rating} onChange={handleRatingChange} />
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Título"
          type="text"
          fullWidth
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          margin="dense"
          label="Comentario"
          type="text"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={handleCommentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Enviar comentario</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewPopup;
