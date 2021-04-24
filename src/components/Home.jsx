import React from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
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
import { auth } from "../firebaseClient";
import Sidebar from './Sidebar';

export default function Home({ userId }) {
  const router = useRouter();
  return (
    <Grid container spacing={4}>
       <Grid item xs={2} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} md={9}>
          <h1>Welcome to Dashboard</h1>
          <h3>Have a Safe Travel!</h3>
          <h2>UID: {userId}</h2>
        <button
        onClick={async () => {
          await auth.signOut();
          cookie.remove("__session");
          router.push("/");
        }}
      >
        Signout
      </button>
        </Grid>
    </Grid>
  );
}
