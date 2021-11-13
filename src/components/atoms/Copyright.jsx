import React from "react";
import { Typography, Link } from "@mui/material";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Backpacky
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
