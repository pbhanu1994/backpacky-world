import React from "react";
import { useDispatch } from "react-redux";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Grid, Button, Divider, Typography } from "@mui/material";
import signInWithSocialAccount from "../../store/actions/auth/signInWithSocialAccount";
import {
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../../handlers/firebaseClient";

export const AuthSocial = () => {
  const dispatch = useDispatch();

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
            onClick={() => handleTwitterAuth(twitterProvider)}
          >
            <FaTwitter color="#1C9CEA" height={24} />
          </Button>
        </Grid>
      </Grid>
      <Divider fullWidth sx={{ width: 1, my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
    </>
  );
};
