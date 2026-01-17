import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Input,
  Grid,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  IconButton,
  Alert,
} from "@mui/material";
import api from "../../api/axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AnimatePresence, motion } from "framer-motion";

const CreateProfessor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const [animationComplete, setAnimationComplete] = useState(false);
  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You need to log in to create a university.");
      return;
    }

    const payload = new FormData();
    payload.append("firstName", firstName);
    payload.append("lastName", lastName);
    payload.append("userName", userName);
    payload.append("email", email);
    payload.append("education", education);
    payload.append("role", role);

    const profilePhotoInput = document.getElementById("profilePhoto");
    if (profilePhotoInput.files.length > 0) {
      payload.append("file", profilePhotoInput.files[0]);
    }
    const departmentId = localStorage.getItem("departmentId");

    api
      .post(`/api/Professor/CreateProfessor/${departmentId}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((response) => {
        console.log(response.data);
        setMessage("Professor created successfully!");
      })
      .catch((error) => {
        console.error("Error creating professor:", error.message);
        setMessage("Error creating professor. Please try again later.");
      });
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container sx={{ mt: 0 }}>
      <div style={{ paddingLeft: "0px" }}>
        <Stack direction="row" alignItems="center">
          <IconButton color="primary" onClick={handleGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Create Professor</Typography>
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
              <Grid sx={{ display: "flex" }}>
                <Grid container spacing={2} sx={{ mt: 3, width: "58%" }}>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      label="First Name"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      required
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      label="Last Name"
                      value={lastName}
                      onChange={handleLastNameChange}
                      required
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      label="Username"
                      value={userName}
                      onChange={handleUserNameChange}
                      required
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      type="email"
                      label="Email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      type="text"
                      label="Education"
                      value={education}
                      onChange={handleEducationChange}
                      required
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      type="text"
                      label="Role"
                      value={role}
                      onChange={handleRoleChange}
                      required
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      type="file"
                      id="profilePhoto"
                      name="profilePhoto"
                      accept="image/*"
                      fullWidth
                      variant="filled"
                      // sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Create Professor
                    </Button>
                  </Grid>
                  {message && (
                    <Alert
                      severity={
                        message.startsWith("Error") ? "error" : "success"
                      }
                      sx={{ mt: 2 }}
                    >
                      {message}
                    </Alert>
                  )}
                </Grid>
                <Grid sx={{ width: "38%", margin: "auto", paddingTop: 4 }}>
                  <img
                    src={`https://img.freepik.com/free-vector/professor-concept-illustration_114360-4226.jpg?w=2000`}
                  />
                </Grid>
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Container>
  );
};

export default CreateProfessor;
