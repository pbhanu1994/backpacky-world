import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import DashboardLayout from "../../layouts/dashboard";
import Page from "../../atoms/Page";
import useSettings from "../../../hooks/useSettings";
import axios from "axios";

export default function Plan({ userId }) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const { themeStretch } = useSettings();

  // Validation Schema
  const signUpSchema = Yup.object().shape({
    location: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      location: "",
      date: dayjs(new Date()), //TODO: get the default value (date) => dayjs(new Date(date) || new Date())
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const { location, date } = values;
      //   console.log("location", location);
      //   console.log("date", date);

      if (_.isEmpty(errors)) {
        // setShowLoadingButton(true);
        // const result = await dispatch(
        //   signUpUser(email, password, firstName, lastName)
        // );
        // result === "error" && setShowLoadingButton(false);
      }
    },
  });

  const handleInputChange = (event, value) => {
    setLoading(true);
    setInputValue(value);

    // Make a request to the Google Places Autocomplete API
    axios
      .get(
        "https://us-central1-backpackyworld.cloudfunctions.net/proxy/places",
        {
          params: {
            input: value,
          },
        }
      )
      .then((response) => {
        const { predictions } = response.data;
        if (predictions) {
          const results = predictions.map((prediction) => ({
            name: prediction.description,
            placeId: prediction.place_id,
          }));

          setOptions(results);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error fetching autocomplete results:", error);
      });
  };

  const { errors, touched, setFieldValue, handleSubmit, getFieldProps } =
    formik;

  return (
    <DashboardLayout>
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
                          {/* TODO: Have a re-usable component of countries dropdown */}
                          <Autocomplete
                            freeSolo
                            disableClearable
                            options={options.map((option) => ({
                              label: option.name,
                            }))}
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                label="Where do you want to go?"
                                variant="outlined"
                                color="primary"
                                autoFocus
                                required
                                {...getFieldProps("location")}
                                error={Boolean(
                                  touched.location && errors.location
                                )}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <React.Fragment>
                                      {loading ? (
                                        <CircularProgress
                                          color="inherit"
                                          size={20}
                                        />
                                      ) : null}
                                      {params.InputProps.endAdornment}
                                    </React.Fragment>
                                  ),
                                }}
                              />
                            )}
                            renderOption={(props, option) => {
                              return (
                                <li {...props}>
                                  <Box display="flex" alignItems="center">
                                    <Typography>{option.label}</Typography>
                                  </Box>
                                </li>
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <DatePicker
                            label="When?"
                            {...getFieldProps("date")}
                            onChange={(dateValue) =>
                              setFieldValue("date", dateValue)
                            }
                            format="DD/MM/YYYY"
                            sx={{ width: "100%" }}
                            // onChange={(dateValue) => setDate(dateValue)}
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
}
