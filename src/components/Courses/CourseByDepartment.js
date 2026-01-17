

import React, { useState, useEffect, useCallback } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
  Typography,
  Stack,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

function CourseByDepartment() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:44364/api/Courses`);
      const data = await response.json();
      console.log('Fetched courses:', data);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Stack direction="row" alignItems="center">
        <IconButton color="primary" onClick={handleGoBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Courses</Typography>
      </Stack>
      <Divider />
      {courses.map((course) => (
        <Accordion key={course.id} elevation={3} style={{ margin: '10px 0' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{course.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
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
    </div>
  );
}

export default CourseByDepartment;
