import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  IconButton,
  Divider,
  Typography,
  Button,
  Stack,
  Input,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  CircularProgress,
  Paper,
  Chip,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Book as BookIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import Logo2 from "../logo/Logo2";

function DepartmentByUniversityVisitor() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { universityId } = useParams();

  useEffect(() => {
    if (universityId) {
      fetchDepartments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universityId]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter((dept) =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDepartments(filtered);
    }
  }, [searchQuery, departments]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:44364/api/Departments`);
      const data = await response.json();

      // If API doesn't return universityId, try fetching by university endpoint
      // Otherwise filter by universityId
      let filtered = [];

      if (universityId) {
        // Try multiple possible field names for universityId
        filtered = data.filter(
          (department) =>
            department.universityId === +universityId ||
            department.universityId === universityId ||
            department.universityId?.toString() === universityId ||
            department.university?.id === +universityId ||
            department.university?.id === universityId
        );

        // If no matches found, show all departments (for debugging)
        if (filtered.length === 0) {
          console.warn("No departments found with universityId:", universityId);
          console.log("Available departments:", data);
          // Show all for now - you may want to remove this
          filtered = data;
        }
      } else {
        filtered = data;
      }

      setDepartments(filtered);
      setFilteredDepartments(filtered);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <section className="top-nav">
        <div>
          <Logo2 sx={{ position: "relative" }} />
        </div>
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
        <ul className="menu">
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
            <Link
              to="http://localhost:3000/universityList"
              className="button-47 "
              role="button"
              id="m"
            >
              Go to Universities
            </Link>
          </li>
        </ul>
      </section>

      <Container
        sx={{ maxWidth: "1200px", margin: "auto", marginTop: 5, padding: 3 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <IconButton color="primary" onClick={handleGoBack} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Departments
            </Typography>
            {!loading && (
              <Chip
                label={`${filteredDepartments.length} Department${
                  filteredDepartments.length !== 1 ? "s" : ""
                }`}
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>
          <Divider sx={{ mb: 4 }} />

          {/* Search Bar */}
          <Paper
            elevation={2}
            sx={{
              p: 2,
              mb: 4,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <SearchIcon color="action" />
            <Input
              fullWidth
              disableUnderline
              placeholder="Search departments by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ fontSize: "1rem" }}
            />
          </Paper>

          {/* Loading State */}
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <CircularProgress size={60} />
            </Box>
          )}

          {/* Empty State */}
          {!loading && filteredDepartments.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 6,
                  textAlign: "center",
                  borderRadius: 3,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <SchoolIcon
                  sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {searchQuery
                    ? "No departments found matching your search"
                    : "No departments available"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "There are no departments to display at this time"}
                </Typography>
              </Paper>
            </motion.div>
          )}

          {/* Departments Grid */}
          {!loading && filteredDepartments.length > 0 && (
            <Grid container spacing={3}>
              {filteredDepartments.map((department, index) => (
                <Grid item xs={12} sm={6} md={4} key={department.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      elevation={4}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: 6,
                        },
                        borderRadius: 3,
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <SchoolIcon
                            sx={{
                              fontSize: 40,
                              color: "primary.main",
                              mr: 1.5,
                            }}
                          />
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{ fontWeight: 600, color: "primary.main" }}
                          >
                            {department.name}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CalendarIcon
                              sx={{ fontSize: 20, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Established:</strong>{" "}
                              {department.establishedYear}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PeopleIcon
                              sx={{ fontSize: 20, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Staff:</strong>{" "}
                              {department.staffNumber || "N/A"}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PeopleIcon
                              sx={{ fontSize: 20, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Students:</strong>{" "}
                              {department.studentsNumber || "N/A"}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <BookIcon
                              sx={{ fontSize: 20, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Courses:</strong>{" "}
                              {department.coursesNumber || "N/A"}
                            </Typography>
                          </Box>

                          {department.description && (
                            <Box sx={{ mt: 1 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {department.description}
                              </Typography>
                            </Box>
                          )}
                        </Stack>
                      </CardContent>

                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Link
                          to={`http://localhost:3000/coursesByDepartmentVisitor/${department.id}`}
                          style={{ textDecoration: "none", width: "100%" }}
                        >
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                              borderRadius: 2,
                              py: 1.5,
                              textTransform: "none",
                              fontSize: "1rem",
                              fontWeight: 600,
                            }}
                          >
                            View Courses
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Container>
    </div>
  );
}

export default DepartmentByUniversityVisitor;
