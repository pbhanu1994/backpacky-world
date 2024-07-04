import React from "react";
import { capitalCase } from "change-case";
import { useRouter } from "next/router";
import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import Page from "../../atoms/Page";
import Iconify from "../../atoms/Iconify";
import useTabs from "../../../hooks/useTabs";
import useSettings from "../../../hooks/useSettings";
import SearchFlightsForm from "./Flights/SearchFlightsForm";
import SearchHotelsForm from "./Hotels/SearchHotelsForm";
import { Cars } from "./Cars";

export const BOOK_TYPES = {
  FLIGHTS: "Flights",
  HOTELS: "Hotels",
  CARS: "Cars",
};

const Book = ({ location, date }) => {
  const { themeStretch } = useSettings();
  const { query } = useRouter();

  const { currentTab, onChangeTab } = useTabs(
    query.currentTab ?? BOOK_TYPES.FLIGHTS
  );

  console.log("location", location);
  console.log("date", date);

  const BOOK_TABS = [
    {
      value: BOOK_TYPES.FLIGHTS,
      icon: <Iconify icon={"mdi:flight"} width={20} height={20} />,
      component: <SearchFlightsForm />,
    },
    {
      value: BOOK_TYPES.HOTELS,
      icon: <Iconify icon={"mdi:hotel"} width={20} height={20} />,
      component: <SearchHotelsForm />,
    },
    {
      value: BOOK_TYPES.CARS,
      icon: <Iconify icon={"mdi:car"} width={20} height={20} />,
      component: <Cars />,
    },
  ];

  const matchedTab = BOOK_TABS.find((tab) => tab.value === currentTab);

  return (
    <DashboardLayout>
      <Page title="Book">
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
            Book
          </Typography>
          <Tabs
            //   allowScrollButtonsMobile
            //   variant="scrollable"
            //   scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {BOOK_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={capitalCase(tab.value)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          <Box sx={{ mb: 5 }} />

          {matchedTab && (
            <Box key={matchedTab.value}>{matchedTab.component}</Box>
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default Book;
