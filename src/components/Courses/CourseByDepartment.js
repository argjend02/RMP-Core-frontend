import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

function CourseByDepartment() {
  const [courses, setCourses] = useState([]);
  const { departmentId } = useParams();

  useEffect(() => {
    if (departmentId) {
      fetchCourses();
    }
  }, [departmentId]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:44364/api/Courses`);
      const data = await response.json();
      const filteredCourses = data.filter((course) => course.departmentID === +departmentId);
      setCourses(filteredCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton color="primary" onClick={handleGoBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Courses</Typography>
      </Stack>
      <Divider />
      {courses.map((course) => (
        <Accordion key={course.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{course.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography variant="body1" color="textSecondary">
                <strong>Code:</strong> {course.code}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Credit Hours:</strong> {course.creditHours}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Description:</strong> {course.description}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

export default CourseByDepartment;
