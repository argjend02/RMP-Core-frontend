import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  TablePagination,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import api from "../../api/axios";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [animationComplete, setAnimationComplete] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:44364/api/GetStudents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDialogOpenDelete(true);
  };

  const token = localStorage.getItem("token");

  const handleConfirmDelete = async () => {
    if (token) {
      try {
        await api.delete(`/api/User/DeleteUser/${studentToDelete.studentId}`);
        setUsers((prevUniversities) =>
          prevUniversities.filter(
            (student) => student.studentId !== studentToDelete.studentId
          )
        );
      } catch (error) {
        console.error("Gabim gjatë fshirjes:", error);
      } finally {
        setDialogOpenDelete(false);
      }
    } else {
      console.error("You need to be logged in to delete a university.");
    }
  };

  const handleCancelDelete = () => {
    setDialogOpenDelete(false);
    setStudentToDelete(null);
  };

  const handleMenuOpen = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
  };

  const handleDelete = () => {
    handleMenuClose();
    handleDeleteClick(selectedStudent);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h3" gutterBottom mb={5}>
        Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>University id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>
                  <Avatar
                    src={`http://localhost:44364/${user.profilePhotoPath}`}
                    // alt={`${user.user.name} ${user.user.surname}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.surname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.universityId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.user && user.user.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.user && user.user.userName}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="more"
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, user)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={handleConfirmDelete}></MenuItem>
        <MenuItem>
          <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpenDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {studentToDelete?.name}?
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

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ListUsers;
