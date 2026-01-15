import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Rating from "@mui/material/Rating";
import "./ListRateProfessor.css";

function ListRateProfessor() {
  const { professorId } = useParams();
  const [rateProfessors, setRateProfessors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoRatings, setHasNoRatings] = useState(false);
  const hasShownError = useRef(false);

  const handleGoBack = () => {
    window.history.back();
  };

  // Clear any existing toasts when component mounts
  useEffect(() => {
    toast.dismiss();
    hasShownError.current = false;
  }, [professorId]);

  const fetchRateProfessors = useCallback(async () => {
    setIsLoading(true);
    setHasNoRatings(false);
    try {
      const response = await fetch(
        `http://localhost:44364/api/GetRateProfessorsByProfessorId/${professorId}`
      );

      const data = await response.json();

      // Check if the response is an error (e.g., NotFound)
      if (data && data.code && data.code.includes("NotFound")) {
        // Show empty state for NotFound errors
        setRateProfessors([]);
        setHasNoRatings(true);
        setIsLoading(false);
        if (!hasShownError.current) {
          hasShownError.current = true;
          toast.error(
            data.description || "No ratings found for this professor.",
            {
              position: "top-right",
              autoClose: 5000,
              toastId: "not-found-error", // Prevent duplicates
            }
          );
        }
        return;
      }

      if (!response.ok) {
        // If response is not ok and it's not a NotFound error, set empty array
        setRateProfessors([]);
        setHasNoRatings(false);
        setIsLoading(false);
        if (!hasShownError.current) {
          hasShownError.current = true;
          toast.error("Failed to fetch ratings. Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            toastId: "fetch-error", // Prevent duplicates
          });
        }
        return;
      }

      // Ensure data is always an array
      let ratingsData = [];
      if (Array.isArray(data)) {
        ratingsData = data;
      } else if (data && Array.isArray(data.data)) {
        // Handle case where API returns { data: [...] }
        ratingsData = data.data;
      } else if (data && typeof data === "object" && !data.code) {
        // Handle case where API returns a single object instead of array
        // But skip if it's an error object with a code
        ratingsData = [data];
      }

      // If we have ratings, set them and stay on this page to display them
      if (ratingsData.length > 0) {
        setRateProfessors(ratingsData);
        setHasNoRatings(false);
        hasShownError.current = false; // Reset error flag on success
      } else {
        // No ratings found but no error - show empty state
        setRateProfessors([]);
        setHasNoRatings(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching rate professors:", error);
      setRateProfessors([]); // Set to empty array on error
      setHasNoRatings(false);
      setIsLoading(false);
      if (!hasShownError.current) {
        hasShownError.current = true;
        toast.error("An error occurred while fetching ratings.", {
          position: "top-right",
          autoClose: 5000,
          toastId: "network-error", // Prevent duplicates
        });
      }
    }
  }, [professorId]);

  useEffect(() => {
    if (professorId) {
      fetchRateProfessors();
    }
  }, [professorId, fetchRateProfessors]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          variant="outlined"
          sx={{
            mb: 2,
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Back
        </Button>
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: "primary.main",
        }}
      >
        Professor Ratings
      </Typography>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Loading ratings...
          </Typography>
        </Box>
      )}

      {/* Empty State - No Ratings */}
      {!isLoading && hasNoRatings && (
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
        >
          <Box
            sx={{
              fontSize: 80,
              mb: 2,
              opacity: 0.5,
            }}
          >
            ⭐
          </Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            No Ratings Available
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 500, mx: "auto" }}
          >
            This professor doesn't have any ratings yet. Be the first to rate
            this professor and help others make informed decisions!
          </Typography>
        </Paper>
      )}

      {/* Ratings Grid */}
      {!isLoading && !hasNoRatings && rateProfessors.length > 0 && (
        <Grid container spacing={3}>
          {rateProfessors.map((rateProfessor) => (
            <Grid key={rateProfessor.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    {rateProfessor.professorName}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Overall Rating
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating
                        name="overall-rating"
                        value={rateProfessor.overall}
                        size="medium"
                        readOnly
                        precision={0.5}
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({rateProfessor.overall})
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Communication
                    </Typography>
                    <Rating
                      name="communication-rating"
                      value={rateProfessor.communicationSkills}
                      size="small"
                      readOnly
                      precision={0.5}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Responsiveness
                    </Typography>
                    <Rating
                      name="responsiveness-rating"
                      value={rateProfessor.responsiveness}
                      size="small"
                      readOnly
                      precision={0.5}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Grading Fairness
                    </Typography>
                    <Rating
                      name="grading-fairness-rating"
                      value={rateProfessor.gradingFairness}
                      size="small"
                      readOnly
                      precision={0.5}
                    />
                  </Box>
                </CardContent>

                <CardContent
                  sx={{
                    bgcolor: "grey.50",
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
                  >
                    Feedback
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontStyle: rateProfessor.feedback ? "normal" : "italic",
                    }}
                  >
                    {rateProfessor.feedback ||
                      "No feedback provided for this rating."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ListRateProfessor;
