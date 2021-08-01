import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Grid, Button, Divider, Typography } from "@material-ui/core";
import { Toast } from "../atoms/Toast";
import { socialMediaAuth } from "../../handlers/auth";
import {
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../../handlers/firebaseClient";

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
  const [toast, setToast] = useState({
    open: false,
    color: "error",
    message: "",
  });
  const classes = useStyles();

  const handleFacebookAuth = async () => {
    try {
      await socialMediaAuth(facebookProvider);
    } catch (err) {
      console.log("Error Signing in", err);
      setToast({
        ...toast,
        open: true,
        color: "error",
        message: err.message,
      });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await socialMediaAuth(googleProvider);
    } catch (err) {
      console.log("Error Signing in", err);
      setToast({
        ...toast,
        open: true,
        color: "error",
        message: err.message,
      });
    }
  };

  const handleTwitterAuth = async () => {
    try {
      await socialMediaAuth(twitterProvider);
    } catch (err) {
      console.log("Error Signing in", err);
      setToast({
        ...toast,
        open: true,
        color: "error",
        message: err.message,
      });
    }
  };

  // On Toast Close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({ ...toast, open: false, message: "" });
  };

  return (
    <>
      <Grid
        container
        fullWidth
        direction="row"
        spacing={2}
        style={{ margin: "1rem 0" }}
      >
        <Toast
          toastOpen={toast.open}
          toastColor={toast.color}
          toastMessage={toast.message}
          onHandleClose={handleClose}
        />
        <Grid item xs={4}>
          <Button
            size="large"
            fullWidth
            color="inherit"
            variant="outlined"
            className={classes.root}
            onClick={() => handleFacebookAuth(facebookProvider)}
          >
            <FaFacebookF color="#1877F2" height={24} />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            size="large"
            fullWidth
            color="inherit"
            variant="outlined"
            className={classes.root}
            onClick={() => handleGoogleAuth(googleProvider)}
          >
            <FaGoogle color="#DF3E30" height={24} />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            size="large"
            fullWidth
            color="inherit"
            variant="outlined"
            className={classes.root}
            onClick={() => handleTwitterAuth(twitterProvider)}
          >
            <FaTwitter color="#1C9CEA" height={24} />
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
