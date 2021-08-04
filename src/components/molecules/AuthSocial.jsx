import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Grid, Button, Divider, Typography } from "@material-ui/core";
import signInWithSocialAccount from "../../store/actions/auth/signInWithSocialAccount";
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

export const AuthSocial = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleFacebookAuth = async () => {
    dispatch(signInWithSocialAccount(facebookProvider));
  };

  const handleGoogleAuth = async () => {
    dispatch(signInWithSocialAccount(googleProvider));
  };

  const handleTwitterAuth = async () => {
    dispatch(signInWithSocialAccount(twitterProvider));
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
