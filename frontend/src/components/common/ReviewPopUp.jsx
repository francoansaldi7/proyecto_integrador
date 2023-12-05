import { useContext, useState } from 'react';
import { Rating } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Review } from '../Review';
import { AuthContext } from '../../contexts/AuthContext';
import { GlobalContext } from '../../contexts/globalContext';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ReviewPopup = ({ onClose, serviceId, setIsLoading }) => {
  const {isLoggedIn} = useContext(AuthContext);
  const {addReview} = useContext(GlobalContext);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const userId = isLoggedIn().userId;

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
      setIsLoading(true);
      const review = new Review(serviceId, userId, rating, comment, title);
      try {
        await addReview(review);
        setIsLoading(false);
        toast.success("Se ha añadido el comentario.");
        
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        toast.error("Se produjo un error al hacer el comentario.");
      }
      onClose();

  };

  return (
    <>
           
           
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
    </>
  );
};

ReviewPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  serviceId: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired
}

export default ReviewPopup;
