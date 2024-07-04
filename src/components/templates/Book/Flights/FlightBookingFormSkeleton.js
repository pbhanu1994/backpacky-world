import React from "react";
import { Grid, Typography, Card, CardContent, Skeleton } from "@mui/material";
import { Formik, Form } from "formik";

const FlightBookingFormSkeleton = () => {
  // Skeleton for form
  return (
    <>
      <Card sx={{ marginY: 2 }}>
        <CardContent>
          <Formik>
            {() => (
              <Form>
                <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
                  <Skeleton variant="text" height={20} width="50%" />
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ my: 4 }}>
                  <Skeleton variant="text" height={20} width="50%" />
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ my: 4 }}>
                  <Skeleton variant="text" height={20} width="50%" />
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton variant="text" height={20} />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <Skeleton
        variant="rectangular"
        height={48}
        animation="wave"
        sx={{ mt: 1.5, borderRadius: 1 }}
      />
    </>
  );
};

export default FlightBookingFormSkeleton;
