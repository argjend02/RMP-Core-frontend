import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { Link } from '@mui/material'; 
import BlogPostCard from './BlogPostCard';



const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    async function fetchLatestNews() {
      try {
        const response = await fetch('http://localhost:44364/api/GetThreeLatestCreatedNews');
        const data = await response.json();
        setLatestNews(data);
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    }

    fetchLatestNews();
  }, []);

  const handleCardClick = (id) => {
    window.location.href = `/news/${id}`;
  };


  return (
    
    <Grid container spacing={2}>
      {latestNews.map((newsItem, index) => (

        <BlogPostCard key={newsItem.id} post={newsItem} index={index} />

      ))}
    </Grid>
  );
};

export default LatestNews;