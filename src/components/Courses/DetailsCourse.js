import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "../iconify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import api from "../../api/axios";

function DetailsCourse() {
  const [courses, setCourses] = useState([]);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [editCourse, setEditCourse] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/Courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const mixedColor = "#f8f8f8";

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDialogOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/Course/DeleteCourse/${courseToDelete.id}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseToDelete.id)
      );
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setDialogOpenDelete(false);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpenDelete(false);
    setCourseToDelete(null);
  };

  const handleEditClick = (course) => {
    setEditCourse({ ...course });
    setDialogOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      await api.put(`/api/Course/UpdateCourse/${editCourse.id}`, editCourse);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === editCourse.id ? editCourse : course
        )
      );
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setDialogOpen(false);
    }
  };

  const handleMenuOpen = (event, course) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    handleEditClick(selectedCourse);
  };

  const handleDelete = () => {
    handleMenuClose();
    handleDeleteClick(selectedCourse);
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
          Courses
        </Typography>
        <Link
          to="http://localhost:3000/dashboard/createCourse"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Course
          </Button>
        </Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Credit Hours</TableCell>
              {/* <TableCell align="right">Description</TableCell> */}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell component="th" scope="row">
                  {course.name}
                </TableCell>
                <TableCell align="right">{course.code}</TableCell>
                <TableCell align="right">{course.creditHours}</TableCell>
                {/* <TableCell align="right">{course.description}</TableCell> */}
                <TableCell align="right">
                  {/* <Link to={`/listRateCourse/${course.id}`}>
              <Button variant="contained" color="primary">
                View
              </Button>
            </Link> */}
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, course)}
                    aria-label="more"
                    aria-controls="action-menu"
                    aria-haspopup="true"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpenDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {courseToDelete?.name}?
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
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} marginTop={2}>
              <TextField
                label="Course Name"
                fullWidth
                value={editCourse?.name || ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Code"
                fullWidth
                value={editCourse?.code || ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, code: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Credit Hours"
                fullWidth
                value={editCourse?.creditHours || ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, creditHours: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Course Description"
                fullWidth
                multiline
                rows={4}
                value={editCourse?.description || ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, description: e.target.value })
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

export default DetailsCourse;
