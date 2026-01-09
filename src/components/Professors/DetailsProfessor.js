
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment,
  Input,
  DialogContentText,
} from '@mui/material';
import Iconify from '../iconify';
import { Upload as UploadIcon } from '@mui/icons-material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function DetailsProfessor() {
  const [professors, setProfessors] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editedProfessor, setEditedProfessor] = useState(null);
  const [imageFile, setImageFile] = useState(null);


  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    fetchProfessors(search);
  }, [search]);

  const fetchProfessors = async (searchText) => {
    try {
      let url = 'http://localhost:44364/api/Professors';
      if (searchText) {
        url += `/SearchProfessor?SearchTerm=${encodeURIComponent(searchText)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log('Data from backend:', data);
      setProfessors(data);
    } catch (error) {
      console.error('Error during request:', error);
    }
  };

  const handleEditClick = (professor) => {
    setEditedProfessor(professor);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditedProfessor(null);
    setEditDialogOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:44364/api/Professor/UpdateProfessor/${editedProfessor.professorId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedProfessor),
        }
      );

      if (response.ok) {
        handleCloseEditDialog();
      } else {
        console.error('Error updating professor');
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };






  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSaveImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch(
        `http://localhost:44364/api/Professor/UploadProfilePhoto/${editedProfessor.professorId}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        // Update the professors list or display a success message
        // For now, let's just close the dialog
        handleCloseEditDialog();
      } else {
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };


  const handleDeleteClick = (professor) => {
    setEditedProfessor(professor);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setEditedProfessor(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteProfessor = async () => {
    try {
      const response = await fetch(
        `http://localhost:44364/api/Professor/DeleteProfessor/${editedProfessor.professorId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // Update the professors list or display a success message
        // For now, let's just close the dialog
        handleCloseDeleteDialog();
      } else {
        console.error('Error deleting professor');
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };





  return (
    <div className="container">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">List of Professors</Typography>
        <Link to="http://localhost:3000/dashboard/createProfessor" style={{ textDecoration: 'none' }}>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Professor
          </Button>
        </Link>
      </Stack>
      <div className="row">
        {professors &&
          professors.map((professor) => (
            <div key={professor.id} className="col-md-4 mb-5">
              <Card sx={{ maxWidth: 345, borderRadius: 0.5 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:44364/${professor.profilePhotoPath}`}
                    alt={`${professor.name} ${professor.surname}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {professor.firstName} {professor.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Education: {professor.education}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Role: {professor.role}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>


                  <IconButton onClick={() => handleEditClick(professor)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(professor)} >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>



      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Professor</DialogTitle>
        <DialogContent>
          {editedProfessor && (
            <>
              <TextField
                label="First Name"
                value={editedProfessor.firstName}
                onChange={(e) =>
                  setEditedProfessor({
                    ...editedProfessor,
                    firstName: e.target.value,
                  })
                }
                fullWidth
                sx={{marginTop: 4}}
              />
              <TextField
                label="Last Name"
                value={editedProfessor.lastName}
                onChange={(e) =>
                  setEditedProfessor({
                    ...editedProfessor,
                    lastName: e.target.value,
                  })
                }
                fullWidth
                sx={{marginTop: 2}}
              />
              <TextField
                label="Education"
                value={editedProfessor.education}
                onChange={(e) =>
                  setEditedProfessor({
                    ...editedProfessor,
                    education: e.target.value,
                  })
                }
                fullWidth
                sx={{marginTop: 2}}
              />
               <TextField
                label="Role"
                value={editedProfessor.role}
                onChange={(e) =>
                  setEditedProfessor({
                    ...editedProfessor,
                    role: e.target.value,
                  })
                }
                fullWidth
                sx={{marginTop: 2}}
              />
              {/* Add more text fields for other properties */}


              <DialogContentText sx={{marginTop: 3}}>Upload Profile Photo:</DialogContentText>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleSaveImageUpload}>
                  <UploadIcon />
                </IconButton>
              </InputAdornment>
            }
          />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Professor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this professor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProfessor} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}

export default DetailsProfessor;
