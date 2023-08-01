import React from "react";
import { Container, Typography } from "@mui/material";
import Page from "../../atoms/Page";
import useSettings from "../../../hooks/useSettings";

const PlanTrip = ({ location, date }) => {
  const { themeStretch } = useSettings();

  return (
    <Page title="Plan Trip">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="primary"
          gutterBottom
          paragraph
          style={{
            display: "flex",
          }}
        >
          Plan Trip
        </Typography>
      </Container>
    </Page>
  );
};

export default PlanTrip;
