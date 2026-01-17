import React, { useState, useEffect } from "react";
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
  Input,
  Box,
  Rating,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import Logo2 from "../logo/Logo2";
import ListRateUniversity from "../../components/ListRateUniversity";
import api from "../../api/axios";

function DetailsUniVisitor() {
  const [university, setUniversity] = useState({});
  const { universityId } = useParams();

  const [loading, setLoading] = useState(true);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (universityId) {
      fetchUniversity();
    }
  }, [universityId]);

  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  const fetchUniversity = async () => {
    try {
      const response = await fetch(
        `http://localhost:44364/api/GetUniversityById/${universityId}`
      );
      const data = await response.json();
      setUniversity(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching university:", error);
      setLoading(false);
    }
  };

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
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const [overallRating, setOverallRating] = useState({});
  const [professor, setProfessor] = useState({});

  useEffect(() => {
    fetchProfessorAndRating();
  }, []);

  const fetchProfessorAndRating = async () => {
    try {
      const professorResponse = await api.get(
        `/api/GetUniversityById/${universityId}`
      );
      const professorData = professorResponse.data;
      setProfessor(professorData);

      const ratingResponse = await api.get(
        `/api/RateUniversity/GetOverallRatingForUniversities`
      );
      const ratingData = ratingResponse.data;
      const professorRating = ratingData.find(
        (rating) => rating.universityId === parseInt(universityId)
      );
      if (professorRating) {
        setOverallRating(professorRating);
      }
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <section class="top-nav">
        <div>
          <Logo2 sx={{ position: "relative" }} />
        </div>
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-button-container" for="menu-toggle">
          <div class="menu-button"></div>
        </label>
        <ul class="menu">
          <li>
            <div className="sear">
              <Button /*onClick={handleSearch}*/>
                <SearchIcon className="searIcon" />
              </Button>
              <Input
                disableUnderline
                className="searInput"
                type="text"
                placeholder="Search Professor..."
              />
            </div>
          </li>
          <li>
            <List>
              <Link
                to="http://localhost:3000/universityList"
                className="button-47 "
                role="button"
                id="m"
              >
                Go to Universities
              </Link>
            </List>
          </li>
        </ul>
      </section>
      <Container style={{ width: "75%", marginTop: "20px", padding: "20px" }}>
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
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box sx={{ width: "70%" }}>
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
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "10px" }}
                    >
                      <strong>Established Year:</strong>{" "}
                      {university.establishedYear}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "10px" }}
                    >
                      <strong>Staff Number:</strong> {university.staffNumber}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "10px" }}
                    >
                      <strong>Student Number:</strong>{" "}
                      {university.studentsNumber}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "10px" }}
                    >
                      <strong>Course Number:</strong> {university.coursesNumber}
                    </Typography>

                    <Typography
                      variant="body1"
                      style={{ marginBottom: "10px" }}
                    >
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
                        to={`#`}
                        onClick={handleOpenDialog}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          className="btn-mui-blackContained"
                          variant="contained"
                          color="primary"
                        >
                          Rate
                        </Button>
                      </Link>
                      <Link
                        to={`http://localhost:3000/departmentByUniversityVisitor/${university.universityId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          className="btn-mui-blackContained"
                          variant="contained"
                          color="primary"
                        >
                          Departments
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              {" "}
              {/* <Typography variant="h6">Ratings</Typography> */}
              <Box>
                <Typography>
                  {" "}
                  <strong>Overall Rating:</strong>{" "}
                  <strong className="strRate">
                    {overallRating.overallRating}
                  </strong>{" "}
                  /5
                </Typography>
              </Box>
              <Typography sx={{ marginTop: 4 }}>
                Participants: {overallRating.totalRatings}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={animationComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullScreen
          maxWidth="md"
          fullWidth
        >
          <AppBar
            className="btn-mui-blackContained"
            sx={{ position: "relative" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={handleCloseDialog}
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                All rating of {university.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <ListRateUniversity />
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}

export default DetailsUniVisitor;
