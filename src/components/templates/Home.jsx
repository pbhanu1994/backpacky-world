import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Sidebar } from "../organisms/Sidebar";
import { Navbar } from "../organisms/Navbar";
import getPackItems from "../../store/actions/journal/pack/getPackItems";

const useStyles = makeStyles((theme) => ({
  welcomeText: {
    color: theme.palette.primary.main,
  },
}));

export default function Home({ userId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // Journal - Pack items
    dispatch(getPackItems());
  }, []);

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
        </Grid>
      </Grid>
    </>
  );
}
