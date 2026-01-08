

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Breadcrumbs, IconButton, Typography, Button, Container, Box, Alert, TextField, Stack, Grid, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import Iconify from '../iconify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';


const CreateDepartment = () => {

    const [department, setDepartment] = useState({
      name: '',
      establishedYear: '',
      staffNumber: '',
      studentNumber: '',
      courseNumber: '',
      description: '',
    });


    const [universities, setUniversities] = useState([]);

    const [selectedUniversityId, setSelectedUniversityId] = useState('');


    const [message, setMessage] = useState('');

    const [animationComplete, setAnimationComplete] = useState(false);


    useEffect(() => {
      fetch('http://localhost:44364/api/Universities')
        .then(response => response.json())
        .then(data => setUniversities(data))
        .catch(error => console.error('Error fetching universities:', error));
    }, []);

    useEffect(() => {
      setAnimationComplete(true);
    }, []);


    const handleChange = (e) => {
      const { name, value } = e.target;
      setDepartment((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleUniversityChange = (e) => {
      setSelectedUniversityId(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const token = localStorage.getItem('token'); 

      if (!token) {
        setMessage('You need to log in to create a university.');
        return;
      }

      if (!selectedUniversityId) {
        setMessage('Please select a university.');
        return;
      }

      const departmentData = { ...department, universityId: selectedUniversityId };
      fetch('https://localhost:44364/api/Department/CreateDepartment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(departmentData),
      })
        .then((response) => {
          if (!response.ok) {
            // Log the response for debugging
            console.log('API Response:', response);
            // Handle validation errors
            return response.json().then((errorData) => {
              throw new Error(errorData.title);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log('Department created successfully:', data);
          setMessage('Department created successfully!');
        })
        .catch((error) => {
          // Handle error and display the error message to the user
          console.error('Error creating department:', error.message);
          setMessage('Error creating department. Please try again later.');
        });
    };

    const handleGoBack = () => {
      window.history.back();
    };

    return (
      <Container sx={{ mt: 0 }}>
              <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={animationComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div style={{ paddingLeft: '0px'}}>
        <Stack direction="row" alignItems="center" >
            <IconButton color="primary" onClick={handleGoBack}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" >
                Create Department
            </Typography>
        </Stack>
        </div>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid sx={{display: 'flex'}}>
            <Grid sx={{width: '65%'}}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Name:"
                    type="text"
                    name="name"
                    value={department.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Established Year:"
                    type="text"
                    name="establishedYear"
                    value={department.establishedYear}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Staff Number:"
                    type="number"
                    name="staffNumber"
                    value={department.staffNumber}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Student Number:"
                    type="number"
                    name="studentNumber"
                    value={department.studentNumber}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Course Number:"
                    type="number"
                    name="courseNumber"
                    value={department.courseNumber}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description:"
                    name="description"
                    value={department.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                    <InputLabel>University</InputLabel>
                    <Select
                      name="universityId"
                      value={selectedUniversityId}
                      onChange={handleUniversityChange}
                      label="University"
                      required
                    >
                      {universities.map(university => (
                        <MenuItem key={university.id} value={university.universityId}>
                          {university.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary">
                Create Department
              </Button>

                        {message && (
                <Alert
                  severity={message.startsWith('Error') ? 'error' : 'success'}
                  sx={{ mt: 2 }}
                >
                  {message}
                </Alert>
              )}
            </Grid>
            <Grid sx={{width: '35%', margin: 'auto'}}>
              {/* http://localhost:3000/assets/illustrations/illustration_login.png */}
              <img
                src={`http://localhost:3000/assets/illustrations/illustration_login.png`}
              />
            </Grid>
          </Grid>
        </Box>
        </motion.div>
      </Container>
    );
};

export default CreateDepartment;
