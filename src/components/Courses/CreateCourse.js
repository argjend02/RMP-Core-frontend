import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Breadcrumbs, Typography, Alert, Button, Container, Box, TextField, Stack, Grid, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import Iconify from '../iconify';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateCourse = () => {

  const [course, setCourse] = useState({
    name: '',
    code: '',
    creditHours: '',
    description: '',
  });

  const [departments, setDepartments] = useState([]);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:44364/api/Departments')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartmentId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      return;
    }
  
    if (!selectedDepartmentId) {
      return;
    }
  
    const courseData = { ...course, departmentID: selectedDepartmentId };
    axios.post('https://localhost:44364/api/Course/CreateCourse', courseData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      }
    })

.then((response) => {
  if (response.status === 201) {
    // Course created successfully
    alert("Course created succesfully");
    setSuccessMessage('Course created successfully!');
  }
  // ...
})
.catch((error) => {
  console.error('Error creating course:', error.message);
  setErrorMessage('Error creating course. Please try again later.');
});
};
  

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container sx={{ mt: 0 }}>
      <div style={{ paddingLeft: '0px'}}>

            <Stack direction="row" alignItems="center" >
            <IconButton color="primary" onClick={handleGoBack}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" >
                Create Course
            </Typography>
        </Stack>
      </div>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={0}>

          <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name:"
              type="text"
              name="name"
              value={course.name}
              onChange={handleChange}
              required
              variant="filled"
              fullWidth
              // sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Code:"
              type="text"
              name="code"
              value={course.code}
              onChange={handleChange}
              required
              variant="filled"
              fullWidth
              // sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Credit Hours:"
              type="number"
              name="creditHours"
              value={course.creditHours}
              onChange={handleChange}
              required
              variant="filled"
              fullWidth
              // sx={{ mb: 2 }}
            />
          </Grid>


          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                name="departmentID"
                value={selectedDepartmentId}
                onChange={handleDepartmentChange}
                label="Department"
                required
                variant='filled'
              >
                {departments.map(department => (
                  <MenuItem key={department.id} value={department.departmentId}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>


          <Grid item xs={4}>
          <img
            style={{margin: 'auto'}}
            src={`https://www.ratemyprofessors.com/static/media/instructional-slide-pencil-lady.492f2289.svg`}
            // loading="lazy"
          />
          </Grid>



          <Grid item xs={12}>
            <TextField
              label="Description:"
              name="description"
              value={course.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              variant="filled"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Create Course
        </Button>

        {successMessage && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {successMessage}
        </Alert>
      )}
          
      </Box>
    </Container>
  );
};

export default CreateCourse;
