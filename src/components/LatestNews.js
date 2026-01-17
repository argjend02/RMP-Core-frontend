import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BlogPostCard from "./BlogPostCard";

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchLatestNews() {
      try {
        const response = await fetch(
          "http://localhost:44364/api/GetThreeLatestCreatedNews"
        );
        const data = await response.json();
        setLatestNews(data);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    }

    fetchLatestNews();
  }, []);

  const handleCardClick = (id) => {
    const newsItem = latestNews.find((item) => item.id === id);
    if (newsItem) {
      setSelectedNews(newsItem);
      setOpen(true);
    }
  };

  // Get static image based on news index
  const getStaticImage = (index) => {
    const imageIndex = (index % 24) + 1;
    return `/assets/images/covers/cover_${imageIndex}.jpg`;
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNews(null);
  };

  return (
    <>
      <Grid container spacing={2}>
        {latestNews.map((newsItem, index) => (
          <BlogPostCard
            key={newsItem.id}
            post={newsItem}
            index={index}
            onClick={() => handleCardClick(newsItem.id)}
          />
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 1,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: 0 }}>
          {selectedNews && (
            <Box>
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={getStaticImage(
                    latestNews.findIndex((item) => item.id === selectedNews.id)
                  )}
                  alt={selectedNews.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box sx={{ p: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="body2" color="primary" fontWeight={500}>
                    {new Date(selectedNews.publicationDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.primary.lighter
                          : theme.palette.primary.darker,
                    }}
                  >
                    {selectedNews.category}
                  </Typography>
                </Box>

                <Typography variant="h4" gutterBottom fontWeight={600}>
                  {selectedNews.title}
                </Typography>

                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    mt: 3,
                    lineHeight: 1.8,
                    color: "text.secondary",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedNews.content}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LatestNews;
