import React from "react";
import { Grid, Button } from "@mui/material";
import Iconify from "../../atoms/Iconify";

export const AddHotelGuest = ({ onAddHotelGuest }) => {
  return (
    <Grid>
      <Button
        fullWidth
        variant="text"
        size="small"
        color="primary"
        startIcon={<Iconify icon={"ant-design:plus-outlined"} />}
        onClick={onAddHotelGuest}
      >
        Add Guest
      </Button>
    </Grid>
  );
};
