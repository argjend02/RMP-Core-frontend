
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import './ListRateProfessor.css'; 

function ListRateProfessor() {
  const { professorId } = useParams();
  const [rateProfessors, setRateProfessors] = useState([]);

  useEffect(() => {
    fetchRateProfessors();
  }, []);

  const fetchRateProfessors = async () => {
    try {
      const response = await fetch(`http://localhost:44364/api/GetRateProfessorsByProfessorId/${professorId}`);
      const data = await response.json();
      setRateProfessors(data);
    } catch (error) {
      console.error('Error fetching rate professors:', error);
    }
  };

  return (
    <div className="container">
      {/* <h1 className="page-title">Rate Professor for ID: {professorId}</h1> */}
      {/* <h1 className="page-title">Rate Professor </h1> */}
      <Grid container spacing={2}>
        {rateProfessors.map((rateProfessor) => (
          <Grid key={rateProfessor.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {rateProfessor.professorName}
                </Typography>
                <Box>
                  <Typography variant="subtitle1">Overall:</Typography>
                  <Rating
                    name="overall-rating"
                    value={rateProfessor.overall}
                    size="large"
                    readOnly
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1">Communication:</Typography>
                  <Rating
                    name="communication-rating"
                    value={rateProfessor.communicationSkills}
                    readOnly
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1">Responsiveness:</Typography>
                  <Rating
                    name="responsiveness-rating"
                    value={rateProfessor.responsiveness}
                    readOnly
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1">Grading Fairness:</Typography>
                  <Rating
                    name="grading-fairness-rating"
                    value={rateProfessor.gradingFairness}
                    readOnly
                  />
                </Box>
              </CardContent>
              <CardContent>
                <Typography variant="body1">
                  <b>Feedback:</b> {rateProfessor.feedback}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListRateProfessor;
