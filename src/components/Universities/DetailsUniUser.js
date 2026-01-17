import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Divider,
  Stack,
  IconButton,
  Container,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  List,
  Toolbar,
  AppBar,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import CreateRateUniversity from "../../components/RateUniversity/CreateRateUniversity";
import Iconify from "../iconify";
import api from "../../api/axios";

function DetailsUni() {
  const [university, setUniversity] = useState({});
  const { universityId } = useParams();

  const [loading, setLoading] = useState(true);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [openCreateRateDialog, setOpenCreateRateDialog] = useState(false);

  const fetchUniversity = useCallback(async () => {
    try {
      const response = await api.get(`/api/GetUniversityById/${universityId}`);
      setUniversity(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching university:", error);
      setLoading(false);
    }
  }, [universityId]);

  useEffect(() => {
    if (universityId) {
      fetchUniversity();
    }
  }, [universityId, fetchUniversity]);

  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const [expandedDescription, setExpandedDescription] = useState({});

  const toggleDescriptionExpansion = (universityId) => {
    setExpandedDescription((prevExpandedDescription) => ({
      ...prevExpandedDescription,
      [universityId]: !prevExpandedDescription[universityId],
    }));
  };

  const handleEditDialogOpen = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", university.name);
      formData.append("establishedYear", university.establishedYear.toString());
      formData.append("staffNumber", university.staffNumber.toString());
      formData.append("studentsNumber", university.studentsNumber.toString());
      formData.append("coursesNumber", university.coursesNumber.toString());

      await api.put(
        `/api/University/UpdateUniversity/${universityId}`,
        formData
      );
      setIsEditDialogOpen(false);
      // Refresh university data after successful update
      fetchUniversity();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleOpenCreateRateDialog = () => {
    setOpenCreateRateDialog(true);
  };
  const handleCloseCreateDialog = () => {
    setOpenCreateRateDialog(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={animationComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          style={{ marginBottom: "20px" }}
        >
          <IconButton color="primary" onClick={handleGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">University Details</Typography>
        </Stack>
        <Divider />
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} md={6}>
            <img
              src={`http://localhost:44364/${university.profilePhotoPath}`}
              alt={university.name}
              style={{
                width: "300px",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ padding: "20px" }}>
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                {university.name}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <strong>Established Year:</strong> {university.establishedYear}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <strong>Staff Number:</strong> {university.staffNumber}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <strong>Student Number:</strong> {university.studentsNumber}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <strong>Course Number:</strong> {university.coursesNumber}
              </Typography>

              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                <strong>Description:</strong>{" "}
                {loading
                  ? "Loading..."
                  : expandedDescription[university.universityId]
                  ? university.description
                  : `${university.description.slice(0, 20)}...`}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() =>
                    toggleDescriptionExpansion(university.universityId)
                  }
                >
                  {expandedDescription[university.universityId]
                    ? "See less"
                    : "See more"}
                </Button>
              </Typography>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  maxWidth: "73%",
                }}
              >
                <Link
                  to="#"
                  onClick={handleOpenCreateRateDialog}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    Create Rate
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>

        <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle>Edit University</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={university.name}
              onChange={(e) =>
                setUniversity({ ...university, name: e.target.value })
              }
            />
            <TextField
              label="Established Year"
              variant="outlined"
              fullWidth
              value={university.establishedYear}
              onChange={(e) =>
                setUniversity({
                  ...university,
                  establishedYear: parseInt(e.target.value) || 0,
                })
              }
            />
            <TextField
              label="Staff Number"
              variant="outlined"
              fullWidth
              value={university.staffNumber}
              onChange={(e) =>
                setUniversity({
                  ...university,
                  staffNumber: parseInt(e.target.value) || 0,
                })
              }
            />
            <TextField
              label="Student Number"
              variant="outlined"
              fullWidth
              value={university.studentsNumber}
              onChange={(e) =>
                setUniversity({
                  ...university,
                  studentsNumber: parseInt(e.target.value) || 0,
                })
              }
            />
            <TextField
              label="Course Number"
              variant="outlined"
              fullWidth
              value={university.coursesNumber}
              onChange={(e) =>
                setUniversity({
                  ...university,
                  coursesNumber: parseInt(e.target.value) || 0,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>

      <Dialog
        open={openCreateRateDialog}
        onClose={() => setOpenCreateRateDialog(false)}
        // fullScreen
        maxWidth="md"
        // TransitionComponent={Transition}
        fullWidth
      >
        <AppBar className="btn-mui-grayContained" sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={handleCloseCreateDialog}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create rate for {}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleCloseDialog}>
              Close
            </Button> */}
          </Toolbar>
        </AppBar>
        <DialogContent>
          <CreateRateUniversity universityId={universityId} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default DetailsUni;
