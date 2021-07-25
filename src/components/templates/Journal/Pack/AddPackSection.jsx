import React from "react";
import { Grid, Button } from "@material-ui/core";
import { packStyles } from "./packStyles";

export const AddPackSection = ({ onAddSection }) => {
  const classes = packStyles();

  return (
    <Grid>
      <Button
        fullWidth
        size="small"
        variant="text"
        color="secondary"
        className={classes.addSection}
        onClick={onAddSection}
      >
        + Add section
      </Button>
    </Grid>
  );
};
