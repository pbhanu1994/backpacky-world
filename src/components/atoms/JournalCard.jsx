import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const journalCardStyles = () => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const JournalCard = ({ image, imageTitle, title, path, completed }) => {
  const router = useRouter();
  const classes = journalCardStyles();

  return (
    <Card sx={classes.root} variant="outlined">
      <CardActionArea onClick={() => router.push(path)}>
        <CardMedia sx={classes.media} image={image} title={imageTitle} />
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Journal
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {title}..
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Completed: {completed} Items
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
