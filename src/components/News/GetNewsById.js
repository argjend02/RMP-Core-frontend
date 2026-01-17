import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Input,
  List,
  Link,
  Breadcrumbs,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo2 from "../logo/Logo2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const GetNewsById = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    api
      .get(`/api/News/GetNewsById/${id}`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së lajmit:", error);
      });

    api
      .get("/api/GetThreeLatestCreatedNews")
      .then((response) => {
        setLatestNews(response.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së tre lajmeve të fundit:", error);
      });
  }, [id]);

  const handleCardClick = (id) => {
    window.location.href = `/news/${id}`;
  };

  if (!news) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" align="center">
          Ngarkohet...
        </Typography>
      </Container>
    );
  }

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
        <Box mb={-4} mt={4}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ position: "relative", padding: 0 }}
          >
            <Link color="inherit" href="/">
              Home
            </Link>
            <Link color="inherit" href="/allNews">
              News
            </Link>
            {/* <Typography color="textPrimary">News Details</Typography> */}
            <Typography color="textPrimary">{news.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Box
          mt={5}
          display="flex"
          flexDirection="row"
          justifyContent={"space-between"}
        >
          <Box sx={{ width: "68%" }}>
            <Box mb={0.5}>
              <img
                src={`http://localhost:44364/${news.profilePhotoPath}`}
                alt={news.title}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Box mb={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="body2" color="primary">
                  {news.publicationDate}
                </Typography>
                <Typography variant="body2" color="primary">
                  {news.category}
                </Typography>
              </Box>
              <Typography variant="h3" gutterBottom>
                {news.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {news.content}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "28%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} marginBottom={-1.7}>
                <Card
                  sx={{
                    borderRadius: "0%",
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft: 2,
                    fontSize: 30,
                  }}
                >
                  Three latest news
                </Card>
              </Grid>
              {latestNews.map((item) => (
                <Grid
                  item
                  xs={12}
                  sx={{ cursor: "pointer" }}
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                >
                  <Card sx={{ borderRadius: "0%", marginBottom: 1.5 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:44364/${item.profilePhotoPath}`}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {item.publicationDate}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default GetNewsById;
