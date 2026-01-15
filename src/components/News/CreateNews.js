import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Input,
  Grid,
  Stack,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import api from "../../api/axios";
import { AnimatePresence, motion } from "framer-motion";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [publicationDate, setPublicationDate] = React.useState(
    dayjs(new Date())
  );

  const [category, setCategory] = useState("");

  const [message, setMessage] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handlePublicationDate = (e) => {
    setPublicationDate(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", title);
    payload.append("content", content);
    payload.append("publicationDate", publicationDate);
    payload.append("category", category);

    const profilePhotoInput = document.getElementById("profilePhoto");
    if (profilePhotoInput.files.length > 0) {
      payload.append("file", profilePhotoInput.files[0]);
    }

    api
      .post("/api/News/CreateNews", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}` // Include the token in the headers
        },
      })
      .then((response) => {
        console.log(response.data);
        setMessage("News created successfully!");
      })
      .catch((error) => {
        console.error("Error creating news:", error.message);
        setMessage("Error creating news. Please try again later.");
      });
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container sx={{ mt: 0, width: "80%" }}>
      <div style={{ paddingLeft: "0px" }}>
        <Stack direction="row" alignItems="center">
          <IconButton color="primary" onClick={handleGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Create News</Typography>
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
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Publication Date"
                    value={publicationDate}
                    onChange={handlePublicationDate}
                    fullWidth
                  />
                </Grid> */}

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DateTimePicker", "DateTimePicker"]}
                    >
                      <DateTimePicker
                        label="Basic date time picker"
                        value={publicationDate}
                        // onChange={handlePublicationDate}
                        onChange={(newValue) => setPublicationDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="text"
                    label="Category"
                    value={category}
                    onChange={handleCategory}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Content"
                    value={content}
                    onChange={handleContent}
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Create News
                  </Button>
                </Grid>
                {message && (
                  <Alert
                    severity={message.startsWith("Error") ? "error" : "success"}
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

export default CreateNews;
