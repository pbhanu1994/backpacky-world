import React from "react";
import Link from "next/link";
import { Typography, Container } from "@mui/material";

export default function Landing() {
  return (
    <Container maxWidth="sm" style={{ marginTop: "5rem" }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Backpacky World
      </Typography>
      <h3>Have a Safe Travel!</h3>
      <Link href="/signin" shallow>
        Sign In
      </Link>
      <Link href="/signup" shallow>
        Sign Up
      </Link>
    </Container>
  );
}
