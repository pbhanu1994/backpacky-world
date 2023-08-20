import React from "react";
import { Grid, Box, Stack, Card, CardContent, Skeleton } from "@mui/material";

const HotelOfferCardSkeleton = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Grid container direction="column" spacing={0.6}>
                <Grid
                  container
                  item
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="text" width="50%" />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" width={50} height={20} />
                  </Grid>
                </Grid>
                <Grid item>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item>
                  <Skeleton variant="text" width="50%" />
                </Grid>
                <Grid item>
                  <Skeleton variant="rectangular" width={100} height={30} />
                </Grid>
                <Grid item>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item>
                  <Skeleton variant="text" width="50%" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <Box
              sx={{
                padding: 3,
                borderRadius: 1,
                bgcolor: "background.neutral",
              }}
            >
              <Stack spacing={3}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="70%" />
                <Stack direction={{ xs: "column" }} spacing={2}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="30%" />
                </Stack>
              </Stack>
            </Box>
          </Card>
          <Skeleton
            variant="rounded"
            width="100%"
            height={50}
            sx={{ mt: 1.5 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default HotelOfferCardSkeleton;
