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
import { Book as JournalIcon } from "@material-ui/icons";
import { Sidebar } from "../../organisms/Sidebar";
import { Navbar } from "../../organisms/Navbar";
import { JournalCard } from "../../atoms/JournalCard";
import addItem from "../../../store/actions/journal/addItem";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import { journalStyles } from "./journalStyles";

export default function Journal({ userId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = journalStyles();

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
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="primary"
            gutterBottom
            style={{
              display: "flex",
              marginTop: "2rem",
            }}
          >
            <JournalIcon className={classes.journalIcon} />
            Journal Entries..
          </Typography>
          <JournalCard
            image="https://images.unsplash.com/photo-1499803270242-467f7311582d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2031&q=80"
            imageTitle="Things to pack"
            title="Things to pack"
            path={PAGE_PATH.JOURNAL_PACK}
            completed={0}
          />
          <h2>UID: {userId}</h2>
          <Button onClick={() => dispatch(addItem(item))}>Add Item</Button>
        </Grid>
      </Grid>
    </>
  );
}
