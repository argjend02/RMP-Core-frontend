import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";

const StyledCardMedia = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  paddingTop: "calc(100% * 3 / 4)",
  background: `linear-gradient(to bottom, ${alpha(
    theme.palette.primary.main,
    0
  )}, ${alpha(theme.palette.primary.main, 0.7)})`,
  transition: "background-color 0.3s ease-in-out",

  "&:hover": {
    background: `linear-gradient(to bottom, ${alpha(
      theme.palette.primary.main,
      0.85
    )}, ${alpha(theme.palette.primary.main, 0.9)})`,
  },

  "&:before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },

  "&:hover:before": {
    opacity: 1,
    background: `linear-gradient(to bottom, ${alpha(
      theme.palette.primary.main,
      0.85
    )}, ${alpha(theme.palette.primary.main, 0.9)})`,
  },
}));

const StyledTitle = styled(Typography)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  textAlign: "left",
});

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const BlogPostCard = ({ post, index, onClick }) => {
  const { title, publicationDate } = post;

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  // Use different static images based on index
  const staticImageIndex = (index % 24) + 1;
  const staticImageSrc = `/assets/images/covers/cover_${staticImageIndex}.jpg`;

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card
        sx={{ position: "relative", cursor: "pointer" }}
        key={post.id}
        onClick={onClick}
      >
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          <StyledCover alt={title} src={staticImageSrc} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute",
            }),
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{
              color: "text.disabled",
              display: "block",
              textAlign: "left",
            }}
          >
            {publicationDate}
          </Typography>

          <StyledTitle
            component="div"
            variant="subtitle2"
            sx={{
              ...(latestPostLarge && { typography: "h4", height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: "common.white",
              }),
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            {title}
          </StyledTitle>
        </CardContent>
      </Card>
    </Grid>
  );
};

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.func,
};

export default BlogPostCard;
