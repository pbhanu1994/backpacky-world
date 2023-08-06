import React, { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DashboardLayout from "../../layouts/dashboard";
import Page from "../../atoms/Page";
import useSettings from "../../../hooks/useSettings";
import PlanTrip from "./PlanTrip";
import PlacesAutocompleteField from "../../atoms/PlacesAutoComplete";

export default function Plan({ userId }) {
  const [showPlanTrip, setShowPlanTrip] = useState(false);

  const { themeStretch } = useSettings();

  // Validation Schema
  const planTripSchema = Yup.object().shape({
    location: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      location: "",
      date: dayjs(new Date()), //TODO: get the default value (date) => dayjs(new Date(date) || new Date())
    },
    validationSchema: planTripSchema,
    onSubmit: async (values) => {
      // const { location, date } = values;

      if (_.isEmpty(errors)) {
        setShowPlanTrip(true);
      }
    },
  });

  const { errors, touched, values, setFieldValue, handleSubmit } = formik;

  const { location, date } = values;

  return (
    <DashboardLayout>
      {!showPlanTrip && (
        <Page title="Plan | BackpackyWorld">
          <Container maxWidth={themeStretch ? false : "xl"}>
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
                      Plan your next adventure
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <FormikProvider value={formik}>
                      <Form
                        style={{ width: "100%", marginTop: 24 }}
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit}
                      >
                        <Grid
                          container
                          spacing={2}
                          sx={{ alignItems: "center" }}
                        >
                          <Grid item xs={12} md={6}>
                            <PlacesAutocompleteField
                              inputValue={location}
                              onInputValueChange={(value) =>
                                setFieldValue("location", value)
                              }
                              label="Where do you want to go?"
                              autoFocus
                              error={Boolean(
                                touched.location && errors.location
                              )}
                            />
                          </Grid>
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
      )}
      {showPlanTrip && <PlanTrip location={location} date={date} />}
    </DashboardLayout>
  );
}
