import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  TablePagination,
} from "@mui/material";
import Iconify from "../iconify";
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import api from "../../api/axios";

function ListAdmins() {
  const [users, setUsers] = useState([]);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Ensure the initial value is null
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [animationComplete, setAnimationComplete] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/GetAdmins");
      const filteredUsers = response.data.filter((user) => user.role === 0);

      setUsers(filteredUsers);
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

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDialogOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("userToDelete:", userToDelete);
      if (userToDelete) {
        await api.delete(`/api/User/DeleteUser/${userToDelete.userId}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== userToDelete.userId)
        );
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    } finally {
      setDialogOpenDelete(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpenDelete(false);
    setUserToDelete(null); // Reset the userToDelete state if cancellation
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setUserToDelete(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        Admins
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h3"> </Typography>
        <Link
          to="http://localhost:3000/dashboard/createAdmin"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Admin
          </Button>
        </Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell component="th" scope="row">
                  {user && `${user.name} ${user.surname}`}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user && user.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user && user.userName}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="more"
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, user)} // Pass the user to handleMenuOpen
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
        count={users.length} // Numri total i shënimeve
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
        <MenuItem onClick={handleMenuClose}>
          {/* Add any specific menu item content you need here */}
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(userToDelete)}>
          <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpenDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {userToDelete?.name}{" "}
          {userToDelete?.surname}?
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
    </div>
  );
}

export default ListAdmins;
