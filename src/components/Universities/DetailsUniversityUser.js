import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Iconify from "../iconify";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Stack,
  Breadcrumbs,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import api from "../../api/axios";

function DetailsUniversityUser() {
  const [universities, setUniversities] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState(null);
  const [editUniversity, setEditUniversity] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userId");

  const fetchStudentUniversityId = useCallback(async (email) => {
    try {
      const response = await api.get(`/api/GetUserById/${email}`);
      return response.data.universityId;
    } catch (error) {
      console.error("Gabim gjatë kërkesës për universityId:", error);
      return null;
    }
  }, []);

  const fetchUniversityById = useCallback(async (universityId) => {
    try {
      const response = await api.get(`/api/GetUniversityById/${universityId}`);
      setUniversities([response.data]);
    } catch (error) {
      console.error("Gabim gjatë kërkesës për universitetin:", error);
    }
  }, []);

  useEffect(() => {
    const loadStudentUniversity = async () => {
      const universityId = await fetchStudentUniversityId(userEmail);
      if (universityId !== null) {
        fetchUniversityById(universityId);
      }
    };

    loadStudentUniversity();
  }, [userEmail, fetchStudentUniversityId, fetchUniversityById]);

  const mixedColor = "#f8f8f8";
  const handleDeleteClick = (university) => {
    setUniversityToDelete(university);
    setDialogOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(
        `/api/University/DeleteUniversity/${universityToDelete.universityId}`
      );
      setUniversities((prevUniversities) =>
        prevUniversities.filter(
          (university) =>
            university.universityId !== universityToDelete.universityId
        )
      );
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error);
    } finally {
      setDialogOpenDelete(false);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpenDelete(false);
    setUniversityToDelete(null);
  };

  const handleEditClick = (university) => {
    setEditUniversity({ ...university });
    setDialogOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      await api.put(
        `/api/University/UpdateUniversity/${editUniversity.universityId}`,
        editUniversity
      );
      setUniversities((prevUniversities) =>
        prevUniversities.map((university) =>
          university.universityId === editUniversity.universityId
            ? editUniversity
            : university
        )
      );
    } catch (error) {
      console.error("Gabim gjatë ndryshimit:", error);
    } finally {
      setDialogOpen(false);
    }
  };

  const handleMenuOpen = (event, university) => {
    setAnchorEl(event.currentTarget);
    setSelectedUniversity(university);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    handleEditClick(selectedUniversity);
  };

  const handleDelete = () => {
    handleMenuClose();
    handleDeleteClick(selectedUniversity);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h3" gutterBottom>
          Universities
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {universities.map((university) => (
          <Grid key={university.id} item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <Link
                to={`http://localhost:3000/dashboardUser/universitiesUser/detailsUniUser/${university.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {university.name}
                  </Typography>
                  <br />
                  <Typography variant="body1" color="text.secondary">
                    <strong>Viti i themelimit:</strong>{" "}
                    {university.establishedYear}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Staff Number:</strong> {university.staffNumber}
                  </Typography>
                </CardContent>
              </Link>

              <CardActions
                style={{
                  borderTop: "1px solid #f0f0f0",
                  background: mixedColor,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Link
                    to={`http://localhost:3000/dashboardUser/universitiesUser/depUniUser/${university.id}`}
                  >
                    <Button variant="outlined" color="primary">
                      View Departments
                    </Button>
                  </Link>
                  <div style={{ flexGrow: 1 }} />
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={dialogOpenDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {universityToDelete?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit University</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} marginTop={2}>
              <TextField
                label="University Name"
                fullWidth
                value={editUniversity?.name || ""}
                onChange={(e) =>
                  setEditUniversity({ ...editUniversity, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Viti themeelimit"
                fullWidth
                value={editUniversity?.establishedYear || ""}
                onChange={(e) =>
                  setEditUniversity({
                    ...editUniversity,
                    establishedYear: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Staff Number"
                fullWidth
                value={editUniversity?.staffNumber || ""}
                onChange={(e) =>
                  setEditUniversity({
                    ...editUniversity,
                    staffNumber: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEdit}
            color="warning"
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ marginRight: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default DetailsUniversityUser;
