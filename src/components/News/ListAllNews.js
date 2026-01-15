import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Link,
  Button,
  List,
  Input,
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../api/axios";
import SearchIcon from "@mui/icons-material/Search";
import Logo2 from "../logo/Logo2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ListAllNews = () => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api
      .get("/api/GetAllNewsDescByDate")
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së lajmeve:", error);
      });
  }, []);

  const handleCardClick = (id) => {
    const newsItem = news.find((item) => item.id === id);
    if (newsItem) {
      setSelectedNews(newsItem);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNews(null);
  };

  // Get static image based on news index
  const getStaticImage = (index) => {
    const imageIndex = (index % 24) + 1;
    return `/assets/images/covers/cover_${imageIndex}.jpg`;
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
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className="title-animation"
        >
          All The News
        </Typography>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            marginTop: 2,
            marginBottom: 2,
            padding: 0,
            position: "relative",
          }}
        >
          <Link color="inherit" href="/" underline="hover">
            Home
          </Link>
          <Typography color="text.primary">News</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          {news.map((item, index) => (
            <Grid
              item
              xs={12}
              sx={{ cursor: "pointer" }}
              sm={6}
              md={3}
              key={item.id}
              onClick={() => handleCardClick(item.id)}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={getStaticImage(index)}
                  alt={item.title}
                />
                <CardContent sx={{ margin: 0, padding: 0 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ paddingLeft: 2, paddingTop: 1, marginBottom: 1.5 }}
                  >
                    {item.title.length > 24
                      ? `${item.title.slice(0, 24)}...`
                      : item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ paddingBottom: -2, marginBottom: -2, paddingLeft: 2 }}
                  >
                    {item.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

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
                    news.findIndex((item) => item.id === selectedNews.id)
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
    </div>
  );
};

export default ListAllNews;
