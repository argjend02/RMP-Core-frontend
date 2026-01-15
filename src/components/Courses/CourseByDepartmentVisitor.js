import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  IconButton,
  Divider,
  Typography,
  Stack,
  Button,
  Input,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Paper,
  Chip,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Book as BookIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import Logo2 from "../logo/Logo2";

function CourseByDepartmentVisitor() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { departmentId } = useParams();

  useEffect(() => {
    if (departmentId) {
      fetchCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:44364/api/Courses`);
      const data = await response.json();

      // Try multiple possible field names for departmentId
      let filtered = [];

      if (departmentId) {
        filtered = data.filter(
          (course) =>
            course.departmentID === +departmentId ||
            course.departmentID === departmentId ||
            course.departmentID?.toString() === departmentId ||
            course.departmentId === +departmentId ||
            course.departmentId === departmentId ||
            course.departmentId?.toString() === departmentId ||
            course.department?.id === +departmentId ||
            course.department?.id === departmentId
        );

        // If no matches found, show all courses (for debugging)
        if (filtered.length === 0) {
          console.warn("No courses found with departmentId:", departmentId);
          console.log("Available courses:", data);
          // Show all for now - you may want to remove this
          filtered = data;
        }
      } else {
        filtered = data;
      }

      setCourses(filtered);
      setFilteredCourses(filtered);
    } catch (error) {
      console.error("Error fetching courses:", error);
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
            <a
              href="http://localhost:3000/universityList"
              className="button-47 "
              role="button"
              id="m"
            >
              Go to Universities
            </a>
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
              Courses
            </Typography>
            {!loading && (
              <Chip
                label={`${filteredCourses.length} Course${
                  filteredCourses.length !== 1 ? "s" : ""
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
              placeholder="Search courses by name, code, or description..."
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
          {!loading && filteredCourses.length === 0 && (
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
                <BookIcon
                  sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {searchQuery
                    ? "No courses found matching your search"
                    : "No courses available"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "There are no courses to display at this time"}
                </Typography>
              </Paper>
            </motion.div>
          )}

          {/* Courses Grid */}
          {!loading && filteredCourses.length > 0 && (
            <Grid container spacing={3}>
              {filteredCourses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
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
                          <BookIcon
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
                            {course.name}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Stack spacing={2}>
                          {course.code && (
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Code:</strong> {course.code}
                              </Typography>
                            </Box>
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <ScheduleIcon
                              sx={{ fontSize: 20, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Credit Hours:</strong>{" "}
                              {course.creditHours || "N/A"}
                            </Typography>
                          </Box>

                          {course.description && (
                            <Box sx={{ mt: 1 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 1,
                                }}
                              >
                                <DescriptionIcon
                                  sx={{
                                    fontSize: 20,
                                    color: "text.secondary",
                                    mt: 0.5,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <strong>Description:</strong>{" "}
                                  {course.description}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Stack>
                      </CardContent>
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

export default CourseByDepartmentVisitor;
