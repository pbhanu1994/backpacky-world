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
  Paper,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { GiLightBackpack } from "react-icons/gi";
import Sidebar from "../../../organisms/Sidebar";
import Navbar from "../../../organisms/Navbar";
import PackOption from "./PackOption";
import PackInput from "./PackInput";
import { packStyles } from "./packStyles";

export default function Pack() {
  const classes = packStyles();
  const theme = useTheme();

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
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{
              display: "flex",
              marginTop: "2rem",
            }}
          >
            <GiLightBackpack color={theme.palette.primary.main} />
            <span className={classes.packHeadingText}>Things to pack..</span>
          </Typography>
          {/* <h3>Pack this stuff</h3> */}
          <Paper variant="outlined" classes={{ root: classes.listPaper }}>
            <PackOption />
            <PackInput />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
