import React from "react";
import { Grid, Box, Stack, Card, CardContent, Skeleton } from "@mui/material";

const HotelOfferCardSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <Skeleton variant="rectangular" height={140} animation="wave" />
          <CardContent>
            <Skeleton variant="text" height={40} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card variant="outlined" sx={{ padding: 3 }}>
          <Skeleton variant="text" height={40} animation="wave" />
          <Skeleton variant="text" height={20} animation="wave" />
          <Skeleton variant="text" height={20} animation="wave" />
          <Skeleton variant="text" height={20} animation="wave" />
          <Skeleton variant="text" height={20} animation="wave" />
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <Stack spacing={3} sx={{ padding: 3 }}>
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <Stack spacing={3} sx={{ padding: 3 }}>
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <Stack spacing={3} sx={{ padding: 3 }}>
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
            <Skeleton variant="text" height={20} animation="wave" />
          </Stack>
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
