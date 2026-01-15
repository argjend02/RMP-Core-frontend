import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import api from "../../api/axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AnimatePresence, motion } from "framer-motion";

const CreateAdmin = () => {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  const [animationComplete, setAnimationComplete] = useState(false);
  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You need to log in to create an admin.");
      return;
    }

    const payload = new FormData();
    payload.append("name", Name);
    payload.append("surname", Surname);
    payload.append("userName", userName);
    payload.append("email", email);
    payload.append("password", Password);
    payload.append("gender", Gender);

    api
      .post("/api/User/CreateUser", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((response) => {
        console.log(response.data);
        setMessage("Admin created successfully!");
      })
      .catch((error) => {
        console.error("Error creating admin:", error.message);
        setMessage("Error creating admin. Please try again later.");
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
          <Typography variant="h4">Create Admin</Typography>
        </Stack>
      </div>
      <form onSubmit={handleSubmit}>
        <AnimatePresence>
          {animationComplete && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Grid sx={{ display: "flex" }}>
                <Grid container spacing={2} sx={{ mt: 3, width: "58%" }}>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      label="First Name"
                      value={Name}
                      onChange={handleNameChange}
                      required
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      label="Last Name"
                      value={Surname}
                      onChange={handleSurnameChange}
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
                      type="password"
                      label="Password"
                      value={Password}
                      onChange={handlePasswordChange}
                      required
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      select
                      label="Gender"
                      value={Gender}
                      onChange={handleGenderChange}
                      required
                      fullWidth
                      variant="filled"
                      SelectProps={{ native: true }} // Add this prop
                    >
                      <option value=""> </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Create Admin
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
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Container>
  );
};

export default CreateAdmin;
