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
import api from "../../api/axios";

function DetailsDepartment() {
  const [departments, setDepartments] = useState([]);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [editDepartment, setEditDepartment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [universities, setUniversities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
    fetchUniversities();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/api/Departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  const fetchUniversities = async () => {
    try {
      const response = await api.get("/api/Universities");
      setUniversities(response.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };
  const getUniversityName = (universityId) => {
    const university = universities.find(
      (uni) => uni.universityId === universityId
    );
    return university ? university.name : "";
  };

  const mixedColor = "#f8f8f8";

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
    setDialogOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(
        `/api/Department/DeleteDepartment/${departmentToDelete.departmentId}`
      );
      setDepartments((prevDepartments) =>
        prevDepartments.filter(
          (department) =>
            department.departmentId !== departmentToDelete.departmentId
        )
      );
    } catch (error) {
      console.error("Error deleting department:", error);
    } finally {
      setDialogOpenDelete(false);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpenDelete(false);
    setDepartmentToDelete(null);
  };

  const handleEditClick = (department) => {
    setEditDepartment({ ...department });
    setDialogOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      await api.put(
        `/api/Department/UpdateDepartment/${editDepartment.departmentId}`,
        editDepartment
      );
      setDepartments((prevDepartments) =>
        prevDepartments.map((department) =>
          department.departmentId === editDepartment.departmentId
            ? editDepartment
            : department
        )
      );
    } catch (error) {
      console.error("Error updating department:", error);
    } finally {
      setDialogOpen(false);
    }
  };

  const handleMenuOpen = (event, department) => {
    setAnchorEl(event.currentTarget);
    setSelectedDepartment(department);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    handleEditClick(selectedDepartment);
  };

  const handleDelete = () => {
    handleMenuClose();
    handleDeleteClick(selectedDepartment);
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
          Departments
        </Typography>
        <Link
          to="http://localhost:3000/dashboard/createDepartment"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Department
          </Button>
        </Link>
      </Stack>

      <Grid container spacing={3}>
        {departments.map((department) => (
          <Grid key={department.id} item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {department.name}
                </Typography>
                <br />
                <Typography variant="body1" color="text.secondary">
                  <strong>University:</strong>{" "}
                  {getUniversityName(department.universityId)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Established Year:</strong>{" "}
                  {department.establishedYear}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Staf number:</strong> {department.staffNumber}
                </Typography>
              </CardContent>
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
                    to={`http://localhost:3000/dashboard/departments/courseDep/${department.departmentId}`}
                  >
                    <Button
                      variant="contained"
                      color="primary" /*startIcon={<VisibilityIcon />}*/
                    >
                      View Courses
                    </Button>
                  </Link>
                  <div style={{ flexGrow: 1 }} />
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, department)}
                    aria-label="more"
                    aria-controls="action-menu"
                    aria-haspopup="true"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={dialogOpenDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {departmentToDelete?.name}?
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
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} marginTop={2}>
              <TextField
                label="Department Name"
                fullWidth
                value={editDepartment?.name || ""}
                onChange={(e) =>
                  setEditDepartment({ ...editDepartment, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Department Name"
                fullWidth
                value={editDepartment?.establishedYear || ""}
                onChange={(e) =>
                  setEditDepartment({
                    ...editDepartment,
                    establishedYear: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Department Name"
                fullWidth
                value={editDepartment?.staffNumber || ""}
                onChange={(e) =>
                  setEditDepartment({
                    ...editDepartment,
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

export default DetailsDepartment;
