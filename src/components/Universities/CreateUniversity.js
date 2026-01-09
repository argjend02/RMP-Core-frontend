
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Input, Grid, Stack, Typography, Breadcrumbs, 
         Link, IconButton, Alert } from '@mui/material';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AnimatePresence, motion } from 'framer-motion';


const CreateUniversity = () => {
  const [name, setName] = useState("");
  const [establishedYear, setEstablishedYear] = useState("0");
  const [description, setDescription] = useState("");
  const [staffNumber, setStaffNumber] = useState("0");
  const [studentsNumber, setStudentsNumber] = useState("0");
  const [coursesNumber, setCoursesNumber] = useState("0");

  const [message, setMessage] = useState('');

  const [animationComplete, setAnimationComplete] = useState(false);
  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEstablishedYear = (e) => {
    setEstablishedYear(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleStaffNumber = (e) => {
    setStaffNumber(e.target.value);
  };

  const handleStudentsNumber = (e) => {
    setStudentsNumber(e.target.value);
  };

  const handleCoursesNumber = (e) => {
    setCoursesNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


      // try {
    const token = localStorage.getItem('token'); 

    if (!token) {
      setMessage('You need to log in to create a university.');
      return;
    }

    const payload = new FormData();
    payload.append("University.Name", name);
    payload.append("University.EstablishedYear", establishedYear);
    payload.append("University.Description", description);
    payload.append("University.StaffNumber", staffNumber);
    payload.append("University.StudentsNumber", studentsNumber);
    payload.append("University.CoursesNumber", coursesNumber);



    const profilePhotoInput = document.getElementById('profilePhoto');
    if (profilePhotoInput.files.length > 0) {
      payload.append("file", profilePhotoInput.files[0]);
    }

    axios
        .post("https://localhost:44364/api/University/CreateUniversity", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}` 

          },
        })
        .then((response) => {
          console.log(response.data);
          // console.log('University created successfully:', data);
          setMessage('University created successfully!');

        })
        .catch((error) => {
          console.error('Error creating university:', error.message);
           setMessage('Error creating university. Please try again later.');
        });
    };

    const handleGoBack = () => {
      window.history.back();
    };

  return (
  <Container sx={{ mt: 0, width: '80%' }}>
            <div style={{ paddingLeft: '0px'}}>
              <Stack direction="row" alignItems="center" >
                  <IconButton color="primary" onClick={handleGoBack}>
                      <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h4" >
                      Create University
                  </Typography>
              </Stack>
            </div>
              <form onSubmit={handleSubmit}>
              <AnimatePresence>
                {animationComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    exit={{ opacity: 0, y: -50 }} // Animacioni kur komponenti largohet
                  >
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                </Grid>
                            
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    label="Year"
                    value={establishedYear}
                    onChange={handleEstablishedYear}
                    required
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                  </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="text"
                    label="Staff number"
                    value={staffNumber}
                    onChange={handleStaffNumber}
                    required
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                  </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="text"
                    label="Students number"
                    value={studentsNumber}
                    onChange={handleStudentsNumber}
                    required
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                  </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="text"
                    label="Courses number"
                    value={coursesNumber}
                    onChange={handleCoursesNumber}
                    required
                    fullWidth
                  />
                  </Grid>

                  <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Description"
                    value={description}
                    onChange={handleDescription}
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    fullWidth
                    // sx={{ mb: 2 }}
                  />
                  </Grid>

                <Grid item xs={12}>
                      <Input
                      type="file"
                      label="Photo"
                      id="profilePhoto"
                      name="profilePhoto"
                      accept="image/*"
                      fullWidth
                      margin="normal"
                      // sx={{ mb: 2 }}
                    />
                    </Grid>
                  {/* <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*" /> */}  
                  <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Create University
                  </Button>
                  </Grid>
                    {message && (
                      <Alert
                        severity={message.startsWith('Error') ? 'error' : 'success'}
                        sx={{ mt: 2 }}
                      >
                        {message}
                      </Alert>
                    )}
                </Grid>
                </motion.div>
                  )}
                </AnimatePresence>
              </form>

            
      </Container>
  );
};

export default CreateUniversity;





