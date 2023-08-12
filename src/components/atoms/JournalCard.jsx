import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const JournalCard = ({ image, imageTitle, title, path, completed }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = () => {
    router.push(path);
  };

  return (
    <Card sx={{ width: isMobile ? "100%" : 340 }} variant="outlined">
      <CardActionArea onClick={handleClick}>
        <CardMedia sx={{ height: 140 }} image={image} title={imageTitle} />
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Journal
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Completed: {completed} Items
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
