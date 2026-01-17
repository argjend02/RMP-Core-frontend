import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAdminData, setEditedAdminData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const email = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.get(`/api/GetUserById/${email}`);
        setAdminData(response.data);
        setEditedAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    if (email) {
      fetchAdminData();
    }
  }, [email]);

  const saveChanges = async () => {
    try {
      await api.put(
        `/api/User/UpdateUser/${adminData.userId}`,
        editedAdminData
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating admin data:", error);
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUploadClick = () => {
    openDialog();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadPhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await api.post(
        `/api/User/UploadProfilePhoto/${adminData.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAdminData({
        ...adminData,
        profilePhotoPath: `/uploads/${adminData.userId}/${selectedFile.name}`,
      });

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "480px", margin: "0 auto" }}
    >
      <Box sx={{ display: "flex" }}>
        {adminData ? (
          <>
            <Box>
              <Avatar
                alt={adminData.user?.name}
                src={`http://localhost:44364/${adminData.profilePhotoPath}`}
                sx={{
                  width: 150,
                  height: 150,
                  marginBottom: 2,
                  marginRight: 5,
                }}
              />
              <IconButton onClick={handleUploadClick} sx={{ marginTop: 1 }}>
                <UploadIcon />
              </IconButton>
            </Box>

            <Box>
              <Typography sx={{ marginTop: 2 }} variant="h5">
                Admin Profile
              </Typography>

              <TextField
                label="Name"
                value={
                  isEditing
                    ? editedAdminData.user?.name
                    : adminData.user?.name
                }
                onChange={(e) =>
                  setEditedAdminData({
                    ...editedAdminData,
                    user: { ...editedAdminData.user, name: e.target.value },
                  })
                }
                disabled={!isEditing}
                sx={{ marginTop: 2 }}
              />

              <TextField
                label="Surname"
                value={
                  isEditing
                    ? editedAdminData.user?.surname
                    : adminData.user?.surname
                }
                onChange={(e) =>
                  setEditedAdminData({
                    ...editedAdminData,
                    user: {
                      ...editedAdminData.user,
                      surname: e.target.value,
                    },
                  })
                }
                disabled={!isEditing}
                sx={{ marginTop: 2 }}
              />

              <TextField
                label="Email"
                value={
                  isEditing
                    ? editedAdminData.user?.email
                    : adminData.user?.email
                }
                onChange={(e) =>
                  setEditedAdminData({
                    ...editedAdminData,
                    user: { ...editedAdminData.user, email: e.target.value },
                  })
                }
                disabled={!isEditing}
                sx={{ marginTop: 2 }}
              />

              {isEditing ? (
                <Button onClick={saveChanges} sx={{ marginTop: 2 }}>
                  Save Changes
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  sx={{ marginTop: 1 }}
                >
                  Edit
                </Button>
              )}
            </Box>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Upload Photo</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={uploadPhoto}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminProfile;

