import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Link, Button, List, Input } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Logo2 from '../logo/Logo2';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const ListAllNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:44364/api/GetAllNewsDescByDate')
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.error('Gabim gjatë marrjes së lajmeve:', error);
      });
  }, []);

  const handleCardClick = (id) => {
    window.location.href = `/news/${id}`;
  };

  return (
    <div>
        <section class="top-nav">
            <div>
              <Logo2 
                sx={{position: 'relative'}}
              />
            </div>
            <input id="menu-toggle" type="checkbox" />
            <label class='menu-button-container' for="menu-toggle">
            <div class='menu-button'></div>
        </label>
            <ul class="menu">

            <li>
            <div className="sear">
            <Button /*onClick={handleSearch}*/><SearchIcon className="searIcon"  /></Button>
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

      <Typography variant="h3" align="center" gutterBottom className="title-animation">
          All The News
        </Typography>

        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ marginTop: 2, marginBottom: 2, padding: 0, position:'relative' }}
          >
            <Link color="inherit" href="/" underline="hover">
              Home
            </Link>
            <Typography color="text.primary">News</Typography>
          </Breadcrumbs>

        <Grid container spacing={3}>
          {news.map(item => (
            <Grid item xs={12} sx={{cursor: 'pointer'}} sm={6} md={3} key={item.id} onClick={() => handleCardClick(item.id)}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:44364/${item.profilePhotoPath}`}
                  alt={item.title}
                />
                <CardContent sx={{margin: 0, padding: 0}}>

                        <Typography variant="h6" gutterBottom sx={{paddingLeft: 2, paddingTop: 1, marginBottom: 1.5}}>
                          {item.title.length > 24? `${item.title.slice(0, 24)}...` : item.title}
                        </Typography>
                  <Typography variant="body2" color="primary" sx={{paddingBottom: -2, marginBottom: -2, paddingLeft: 2}}>
                    {item.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default ListAllNews;

