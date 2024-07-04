import React from "react";
import { Grid, Box, Stack, Card, CardContent, Skeleton } from "@mui/material";

const HotelOfferCardSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <Skeleton variant="rectangular" height={200} animation="wave" />
          <CardContent>
            <Skeleton variant="text" height={40} animation="wave" width="60%" />
            <Skeleton variant="text" height={20} animation="wave" width="80%" />
            <Skeleton variant="text" height={20} animation="wave" width="90%" />
            <Skeleton variant="text" height={20} animation="wave" width="75%" />
            <Skeleton variant="text" height={20} animation="wave" width="85%" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card variant="outlined">
          <Skeleton variant="rectangular" height={200} animation="wave" />
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Skeleton
                variant="text"
                height={40}
                animation="wave"
                width="60%"
              />
              <Skeleton variant="rectangular" height={140} animation="wave" />
              <Skeleton
                variant="text"
                height={20}
                animation="wave"
                width="80%"
              />
              <Skeleton
                variant="text"
                height={20}
                animation="wave"
                width="90%"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Skeleton
                variant="text"
                height={40}
                animation="wave"
                width="60%"
              />
              <Skeleton variant="rectangular" height={140} animation="wave" />
              <Skeleton
                variant="text"
                height={20}
                animation="wave"
                width="80%"
              />
              <Skeleton
                variant="text"
                height={20}
                animation="wave"
                width="90%"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Skeleton
                variant="text"
                height={40}
                animation="wave"
                width="60%"
              />
              <Skeleton variant="rectangular" height={140} animation="wave" />
              <Skeleton
                variant="text"
                height={20}
                animation="wave"
                width="80%"
              />
              <Skeleton
                variant="text"
                height={20}
                animation="wave"
                width="90%"
              />
            </Stack>
          </CardContent>
        </Card>
        <Skeleton
          variant="rectangular"
          height={48}
          animation="wave"
          sx={{ mt: 1.5, borderRadius: 1 }}
        />
      </Grid>
    </Grid>
  );
};

export default HotelOfferCardSkeleton;
