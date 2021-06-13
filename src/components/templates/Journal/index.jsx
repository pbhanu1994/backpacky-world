import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
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
import Sidebar from "../../organisms/Sidebar";
import Navbar from "../../organisms/Navbar";
import addItem from "../../../store/actions/journal/addItem";

export default function Journal({ userId }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const item = {
    id: 1,
    dateCreated: new Date().toLocaleDateString(),
    name: "Shampoo",
  };

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
          <Button onClick={() => dispatch(addItem(item))}>Add Item</Button>
        </Grid>
      </Grid>
    </>
  );
}
