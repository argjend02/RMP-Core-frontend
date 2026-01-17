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
//import UploadIcon from '@mui/icons-material/Upload';
import { Upload as UploadIcon } from "@mui/icons-material";

const UserProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudentData, setEditedStudentData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const email = localStorage.getItem("userId");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get(`/api/GetUserById/${email}`);
        setStudentData(response.data);
        setEditedStudentData(response.data);
      } catch (error) {
        console.error("Gabim gjatë marrjes së të dhënave të studentit:", error);
      }
    };

    if (email) {
      fetchStudentData();
    }
  }, [email]);

  const saveChanges = async () => {
    try {
      await api.put(
        `/api/User/UpdateUser/${studentData.studentId}`,
        editedStudentData
      );
      setIsEditing(false);
    } catch (error) {
      console.error(
        "Gabim gjatë përditësimit të të dhënave të studentit:",
        error
      );
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
        `/api/User/UploadProfilePhoto/${studentData.studentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setStudentData({
        ...studentData,
        profilePhotoPath: `/uploads/${studentData.studentId}/${selectedFile.name}`,
      });

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Gabim gjatë ngarkimit të fotografisë:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "480px", margin: "0 auto" }}
    >
      <Box sx={{ display: "flex" }}>
        {studentData ? (
          <>
            <Box>
              <Avatar
                alt={studentData.user.name}
                src={`http://localhost:44364/${studentData.profilePhotoPath}`}
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
                Student Profile
              </Typography>

              <TextField
                label="Emri"
                value={
                  isEditing
                    ? editedStudentData.user.name
                    : studentData.user.name
                }
                onChange={(e) =>
                  setEditedStudentData({
                    ...editedStudentData,
                    user: { ...editedStudentData.user, name: e.target.value },
                  })
                }
                disabled={!isEditing}
                sx={{ marginTop: 2 }}
              />

              <TextField
                label="Mbiemri"
                value={
                  isEditing
                    ? editedStudentData.user.surname
                    : studentData.user.surname
                }
                onChange={(e) =>
                  setEditedStudentData({
                    ...editedStudentData,
                    user: {
                      ...editedStudentData.user,
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
                    ? editedStudentData.user.email
                    : studentData.user.email
                }
                onChange={(e) =>
                  setEditedStudentData({
                    ...editedStudentData,
                    user: { ...editedStudentData.user, email: e.target.value },
                  })
                }
                disabled={!isEditing}
                sx={{ marginTop: 2 }}
              />

              <TextField
                label="Grade"
                value={isEditing ? editedStudentData.grade : studentData.grade}
                onChange={(e) =>
                  setEditedStudentData({
                    ...editedStudentData,
                    grade: e.target.value,
                  })
                }
                disabled={!isEditing}
                sx={{ marginTop: 2 }}
              />

              {isEditing ? (
                <Button onClick={saveChanges} sx={{ marginTop: 2 }}>
                  Ruaj Ndryshimet
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
        <DialogTitle>Upload Foto</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Anulo</Button>
          <Button onClick={uploadPhoto}>Ruaj</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserProfile;
