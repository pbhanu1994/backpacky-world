import React from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signOut } from "../../handlers/auth";
import Sidebar from "../molecules/Sidebar";
import Navbar from "../molecules/Navbar";

const useStyles = makeStyles((theme) => ({
  welcomeText: {
    color: theme.palette.primary.main,
  },
}));

export default function Home({ userId }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Grid container spacing={4}>
        <Grid item xs={2} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} md={9}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Welcome, <span className={classes.welcomeText}>Bhanu!</span>
          </Typography>

          <h1>Welcome to Dashboard</h1>
          <h3>Have a Safe Travel!</h3>
          <h2>UID: {userId}</h2>
          <button onClick={signOut}>Signout</button>
        </Grid>
      </Grid>
    </>
  );
}
