import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const JournalCard = ({ image, imageTitle, title, path, completed }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={() => router.push(path)}>
        <CardMedia className={classes.media} image={image} title={imageTitle} />
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
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
