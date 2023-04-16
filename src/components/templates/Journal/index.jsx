import React from "react";
import { Container, Typography, Grid } from "@mui/material";
// import { Book as JournalIcon } from "@mui/icons-material";
import { JournalCard } from "../../atoms/JournalCard";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import DashboardLayout from "../../layouts/dashboard";
import Page from "../../atoms/Page";
import useSettings from "../../../hooks/useSettings";

export default function Journal({ userId }) {
  const { themeStretch } = useSettings();

  return (
    <DashboardLayout>
      <Page title="Journal | BackpackyWorld">
        <Container maxWidth={themeStretch ? false : "xl"}>
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
            Journal Entries..
          </Typography>
          <Grid container fullWidth gap={2}>
            <JournalCard
              image="https://images.unsplash.com/photo-1499803270242-467f7311582d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2031&q=80"
              imageTitle="Things to pack"
              title="Things to pack"
              path={PAGE_PATH.JOURNAL_PACK}
              completed={0}
            />
            <JournalCard
              image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
              imageTitle="Bucket List"
              title="Bucket List"
              path={PAGE_PATH.JOURNAL_BUCKET_LIST}
              completed={0}
            />
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
