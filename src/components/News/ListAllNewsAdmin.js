import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Upload as UploadIcon } from "@mui/icons-material";
import api from "../../api/axios";
import EditNews from "./EditNews";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Iconify from "../iconify";

const ListAllNewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editNewsId, setEditNewsId] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteNewsId, setDeleteNewsId] = useState(null);

  useEffect(() => {
    api
      .get("/api/GetAllNewsDescByDate")
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së lajmeve:", error);
      });
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/News/DeleteNews/${deleteNewsId}`);
      const updatedNews = news.filter((item) => item.id !== deleteNewsId);
      setNews(updatedNews);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Gabim gjatë fshirjes së lajmit:", error);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteNewsId(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteNewsId(id);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (id) => {
    setEditNewsId(id);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleNewsUpdate = (id, updatedTitle, updatedContent) => {
    // Update the news item in the news state
    const updatedNews = news.map((item) => {
      if (item.id === id) {
        return { ...item, title: updatedTitle, content: updatedContent };
      }
      return item;
    });
    setNews(updatedNews);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadDialogOpen = (id) => {
    setSelectedNewsId(id);
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setSelectedFile(null);
    setSelectedNewsId(null);
    setUploadDialogOpen(false);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await api.post(
        `/api/News/UploadProfilePhoto/${selectedNewsId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Refresh the news list after uploading
      const updatedNews = [...news];
      const newsToUpdate = updatedNews.find(
        (item) => item.id === selectedNewsId
      );
      if (newsToUpdate) {
        newsToUpdate.profilePhotoPath = selectedFile.name;
        setNews(updatedNews);
      }

      handleUploadDialogClose();
    } catch (error) {
      console.error("Gabim gjatë ngarkimit të fotografisë:", error);
      handleUploadDialogClose();
    }
  };

  // Get static image based on news index
  const getStaticImage = (index) => {
    const imageIndex = (index % 24) + 1;
    return `/assets/images/covers/cover_${imageIndex}.jpg`;
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h3">News</Typography>

          <Link
            to="http://localhost:3000/dashboard/createNews"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add News
            </Button>
          </Link>
        </Stack>

        <Grid container spacing={3}>
          {news.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <IconButton
                  className="icbtn-upload"
                  sx={{ position: "absolute" }}
                  onClick={() => handleUploadDialogOpen(item.id)}
                >
                  <UploadIcon />
                </IconButton>
                <CardMedia
                  component="img"
                  height="200"
                  image={getStaticImage(index)}
                  alt={item.title}
                />

                <CardContent sx={{ paddingBottom: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                    {/* {item.title} */}
                    {item.title.length > 24
                      ? `${item.title.slice(0, 24)}...`
                      : item.title}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {item.category}
                  </Typography>
                  <Typography variant="body2">
                    {item.publicationDate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => handleEditClick(item.id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
              <EditNews
                id={item.id}
                open={editDialogOpen && editNewsId === item.id}
                onClose={handleEditDialogClose}
                onUpdate={handleNewsUpdate}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={uploadDialogOpen} onClose={handleUploadDialogClose}>
        <DialogTitle>Upload Profile Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a new profile photo for the news item.
          </DialogContentText>
          <Input
            type="file"
            onChange={handleFileSelect}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={handleUpload} color="primary">
                  Upload
                </Button>
              </InputAdornment>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this news item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListAllNewsAdmin;
