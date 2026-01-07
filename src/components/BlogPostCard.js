import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { Link } from '@mui/material'; 


    const StyledCardMedia = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: 'calc(100% * 3 / 4)',
    background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0)}, ${alpha(theme.palette.primary.main, 0.7)})`,
    transition: 'background-color 0.3s ease-in-out',
  
    '&:hover': {
      background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.85)}, ${alpha(theme.palette.primary.main, 0.9)})`,

},


'&:before': {
  content: "''",
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
},

'&:hover:before': {
  opacity: 1,
  background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.85)}, ${alpha(theme.palette.primary.main, 0.9)})`,
},
}));

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textAlign: 'left',
});

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const BlogPostCard = ({ post, index }) => {
  const { title, publicationDate, profilePhotoPath } = post;

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>

      <Card sx={{ position: 'relative', cursor: 'pointer' }} key={post.id}>
      <Link
        href={`/news/${post.id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <StyledCover alt={title}  src={`http://localhost:44364/${profilePhotoPath}`}/>
          
        </StyledCardMedia>



        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block', textAlign: 'left'  }}>
            {publicationDate}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(latestPostLarge && { typography: 'h4', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          >
            {title}
          </StyledTitle>
        </CardContent>
        </Link>

      </Card>
      {/* </Link> */}
    </Grid>
  );
};

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default BlogPostCard;
