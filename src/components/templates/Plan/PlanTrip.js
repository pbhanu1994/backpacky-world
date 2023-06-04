import React from "react";
import { capitalCase } from "change-case";
import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import Page from "../../atoms/Page";
import Iconify from "../../atoms/Iconify";
import useTabs from "../../../hooks/useTabs";
import useSettings from "../../../hooks/useSettings";
import { Flights } from "./Flights";
import { Hotels } from "./Hotels";
import { Cars } from "./Cars";

const PlanTripType = {
  Flights: "Flights",
  Hotels: "Hotels",
  Cars: "Cars",
};

const PlanTrip = ({ location, date }) => {
  const { themeStretch } = useSettings();
  const { currentTab, onChangeTab } = useTabs(PlanTripType.Flights);

  console.log("location", location);
  console.log("date", date);

  const PLAN_TABS = [
    {
      value: PlanTripType.Flights,
      icon: <Iconify icon={"mdi:flight"} width={20} height={20} />,
      component: <Flights />,
    },
    {
      value: PlanTripType.Hotels,
      icon: <Iconify icon={"mdi:hotel"} width={20} height={20} />,
      component: <Hotels />,
    },
    {
      value: PlanTripType.Cars,
      icon: <Iconify icon={"mdi:car"} width={20} height={20} />,
      component: <Cars />,
    },
  ];

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
        <Tabs
          //   allowScrollButtonsMobile
          //   variant="scrollable"
          //   scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {PLAN_TABS.map((tab) => (
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

        {PLAN_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
};

export default PlanTrip;
