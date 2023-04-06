import React from "react";
// import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";
import { Container, Typography } from "@mui/material";
// import { Book as JournalIcon } from "@mui/icons-material";
import { JournalCard } from "../../atoms/JournalCard";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import DashboardLayout from "../../layouts/dashboard";
import Page from "../../atoms/Page";
import useSettings from "../../../hooks/useSettings";

export default function Journal({ userId }) {
  // const router = useRouter();
  // const dispatch = useDispatch();
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
          <JournalCard
            image="https://images.unsplash.com/photo-1499803270242-467f7311582d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2031&q=80"
            imageTitle="Things to pack"
            title="Things to pack"
            path={PAGE_PATH.JOURNAL_PACK}
            completed={0}
          />
        </Container>
      </Page>
    </DashboardLayout>
  );
}
