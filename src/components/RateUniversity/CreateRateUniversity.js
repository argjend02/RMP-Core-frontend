
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Rating, Grid, Alert } from '@mui/material';

function CreateRateUniversity() {
  const { universityId } = useParams();
  const [rating, setRating] = useState({
    entityType: "university",
    entityId: universityId,
    userId: 0, 
    overall: 0,
    feedback: '',
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

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
        setAlert({ open: true, message: 'Rating submitted successfully!', severity: 'success' });
      } else {
        const responseData = await response.json();
        
        setAlert({ open: true, message: 'Error submitting rating. ' + responseData.description, severity: 'error' });
      }
    } catch (error) {
      console.error('Error creating rating:', error);
      setAlert({ open: true, message: 'Error submitting rating. Please try again.', severity: 'error' });
    }
  };

  const handleRatingChange = (field, value) => {
    setRating(prevRating => ({
      ...prevRating,
      [field]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ width: '60%', margin: 'auto' }}>

          <Grid item xs={5}>
            <Typography>Overall:</Typography>
            <Rating
              name="overall"
              size="large"
              sx={{ fontSize: 35 }}
              value={rating.overall}
              onChange={(event, newValue) => handleRatingChange('overall', newValue)}
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

        <Grid item xs={12}>
            {alert.open && (
              <Alert severity={alert.severity} onClose={() => setAlert({ open: false, message: '', severity: 'success' })}>
                {alert.message}
              </Alert>
            )}
          </Grid>
      </form>
    </div>
  );
}

export default CreateRateUniversity;
