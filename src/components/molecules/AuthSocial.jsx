import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Grid, Button, Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.grey[500_32]}`,
    padding: "1rem",
  },
  separator: {
    color: theme.palette.text.secondary,
  },
}));

// TODO: Implement the Social Auth (facebook, Google) with Firebase
export const AuthSocial = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        fullWidth
        direction="row"
        spacing={2}
        style={{ margin: "1rem 0" }}
      >
        <Grid item xs={6}>
          <Button
            size="large"
            fullWidth
            color="inherit"
            variant="outlined"
            className={classes.root}
          >
            <FaFacebookF color="#1877F2" height={24} />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            fullWidth
            color="inherit"
            variant="outlined"
            className={classes.root}
          >
            <FaGoogle color="#DF3E30" height={24} />
          </Button>
        </Grid>
      </Grid>

      {/* TODO: Add Divider with OR text in between, when the material UI 5 arrives */}
      <Typography variant="body2" className={classes.separator}>
        OR
      </Typography>
      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider> */}
    </>
  );
};
