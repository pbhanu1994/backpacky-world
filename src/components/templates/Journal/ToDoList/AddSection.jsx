import React from "react";
import { Grid, Button } from "@mui/material";
import { listStyles } from "./listStyles";

export const AddSection = ({ onAddSection }) => {
  const classes = listStyles();

  return (
    <Grid>
      <Button
        fullWidth
        size="small"
        variant="text"
        color="secondary"
        sx={classes.addSection}
        onClick={onAddSection}
      >
        + Add section
      </Button>
    </Grid>
  );
};
