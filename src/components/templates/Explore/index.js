import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import DashboardLayout from "../../layouts/dashboard";
import Page from "../../atoms/Page";
import HeaderBreadcrumbs from "../../atoms/HeaderBreadCrumbs";
import CityAirportSearchField from "../../atoms/CityAirportSearchField";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import useSettings from "../../../hooks/useSettings";
import addLocation from "../../../store/actions/explore/addLocation";

const Explore = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const router = useRouter();

  // Validation Schema
  const exploreSchema = Yup.object().shape({
    location: Yup.string().required("Please enter a valid destination city"),
  });

  const formik = useFormik({
    initialValues: {
      location: "",
      date: dayjs(new Date()), //TODO: get the default value (date) => dayjs(new Date(date) || new Date())
    },
    validationSchema: exploreSchema,
    onSubmit: async (values) => {
      const { location, date } = values;
      router.push(`${PAGE_PATH.EXPLORE}${location}`);
    },
  });

  const { errors, touched, values, setFieldValue, handleSubmit } = formik;

  const { location, date } = values;

  const handleDestinationSelected = (destinationDetails) => {
    setFieldValue("location", destinationDetails.label);
    dispatch(addLocation(destinationDetails.cityAddress));
  };

  return (
    <DashboardLayout>
      <Page title="Explore | BackpackyWorld">
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs heading="Explore" />
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                mt: "14%",
              }}
            >
              <Container maxWidth="md">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h1"
                    align="center"
                    gutterBottom
                  >
                    Find Your Destination
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <FormikProvider value={formik}>
                    <Form
                      style={{ width: "100%", marginTop: 24 }}
                      autoComplete="off"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <Grid container spacing={2} sx={{ alignItems: "center" }}>
                        <Grid item xs={12} md={6}>
                          <CityAirportSearchField
                            inputValue={location}
                            city
                            onSelected={(destinationDetails) =>
                              handleDestinationSelected(destinationDetails)
                            }
                            onChange={(value) =>
                              setFieldValue("location", value)
                            }
                            label="Where do you want to go?"
                            autoFocus
                            error={Boolean(touched.location && errors.location)}
                            helperText={
                              touched.location && errors.location
                                ? errors.location
                                : ""
                            }
                          />
                        </Grid>
                        {/* TODO: Make the Date functional later if needed or remove it completely */}
                        <Grid item xs={12} md={4}>
                          <DatePicker
                            label="When?"
                            onChange={(dateValue) =>
                              setFieldValue("date", dateValue)
                            }
                            value={date}
                            format="DD/MM/YYYY"
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                          >
                            Search
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  </FormikProvider>
                </Box>
              </Container>
            </Box>
          </Box>
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default Explore;
