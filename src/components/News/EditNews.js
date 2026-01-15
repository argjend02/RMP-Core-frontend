import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import api from "../../api/axios";

const EditNews = ({ id, open, onClose, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [profilePhotoPath, setProfilePhotoPath] = useState("");

  useEffect(() => {
    // Fetch news details by ID
    api
      .get(`/api/News/GetNewsById/${id}`)
      .then((response) => {
        const newsData = response.data;
        setTitle(newsData.title);
        setContent(newsData.content);
        setCategory(newsData.category);
        setPublicationDate(newsData.publicationDate);
        setProfilePhotoPath(newsData.profilePhotoPath);
      })
      .catch((error) => {
        console.error("Error fetching news details:", error);
      });
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePublicationDateChange = (e) => {
    setPublicationDate(e.target.value);
  };

  const handleUpdate = () => {
    const payload = {
      id: id,
      title: title,
      content: content,
      category: category,
      publicationDate: publicationDate,
      profilePhotoPath: profilePhotoPath,
    };

    // Update news details
    api
      .put(`/api/News/UpdateNews/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        onUpdate(id, title, content, category, publicationDate);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating news:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit News</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="Content"
          value={content}
          onChange={handleContentChange}
          multiline
          rows={4}
          fullWidth
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="Category"
          value={category}
          onChange={handleCategoryChange}
          fullWidth
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="Publication Date"
          type="datetime-local"
          value={publicationDate}
          onChange={handlePublicationDateChange}
          fullWidth
          sx={{ marginTop: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditNews;
