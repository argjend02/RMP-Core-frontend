import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Rating, Grid, Snackbar, Alert } from '@mui/material';

function CreateRateProfessor() {
  const { professorId } = useParams();
  const [rating, setRating] = useState({
    entityType: "professor",
    entityId: professorId,
    userId: 0, 
    communicationSkills: 0,
    responsiveness: 0,
    gradingFairness: 0,
    feedback: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const studentEmail = localStorage.getItem('userId');

    if (studentEmail) {
      fetch(`http://localhost:44364/api/GetUserById/${studentEmail}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            setRating(prevRating => ({
              ...prevRating,
              userId: data.id,
            }));
          }
        })
        .catch(error => {
          console.error('Error fetching studentId:', error);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:44364/api/CreateRate', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rating),
      });

      if (response.ok) {
        setSnackbarMessage('Rating submitted successfully!');
        setSnackbarSeverity('success');
      } else {
        const responseData = await response.json();
        setSnackbarMessage('Failed to submit rating! The content of your feedback is toxic. ' + responseData.description);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error creating rating:', error);
      setSnackbarMessage('An error occurred while submitting the rating.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleRatingChange = (field, value) => {
    setRating(prevRating => ({
      ...prevRating,
      [field]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ width: '60%', margin: 'auto' }}>
          <Grid item xs={5}>
            <Typography>Communication Skills:</Typography>
            <Rating
              name="communicationSkills"
              value={rating.communicationSkills}
              onChange={(event, newValue) => handleRatingChange('communicationSkills', newValue)}
            />
            <Typography>Responsiveness:</Typography>
            <Rating
              name="responsiveness"
              value={rating.responsiveness}
              onChange={(event, newValue) => handleRatingChange('responsiveness', newValue)}
            />
            <Typography>Grading Fairness:</Typography>
            <Rating
              name="gradingFairness"
              value={rating.gradingFairness}
              onChange={(event, newValue) => handleRatingChange('gradingFairness', newValue)}
            />
          </Grid>

          <Grid item xs={7} sx={{ marginBottom: 5 }}>
            <TextField
              label="Feedback"
              multiline
              rows={6}
              fullWidth
              value={rating.feedback}
              onChange={(e) => handleRatingChange('feedback', e.target.value)}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained">
          Submit Rating
        </Button>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateRateProfessor;
