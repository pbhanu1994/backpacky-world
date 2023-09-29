import React from "react";
import { Grid, Button } from "@mui/material";
import Iconify from "../../../atoms/Iconify";
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
        startIcon={<Iconify icon={"ant-design:plus-outlined"} />}
        onClick={onAddSection}
      >
        Add section
      </Button>
    </Grid>
  );
};
