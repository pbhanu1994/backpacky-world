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
  InputBase,
  Paper,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { packStyles } from "./packStyles";

export const PackInput = () => {
  const classes = packStyles();
  return (
    <InputBase
      classes={{ root: classes.inputText }}
      placeholder="Add Item.. e.g. Running shoes"
      inputProps={{ "aria-label": "naked" }}
    />
  );
};
