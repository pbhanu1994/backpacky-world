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
import Sidebar from "../molecules/Sidebar";
import Navbar from "../molecules/Navbar";

export default function Journal({ userId }) {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Grid container spacing={4}>
        <Grid item xs={2} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} md={9}>
          <h1>Welcome to Journal</h1>
          <h3>Make a wonderful list</h3>
          <h2>UID: {userId}</h2>
        </Grid>
      </Grid>
    </>
  );
}
