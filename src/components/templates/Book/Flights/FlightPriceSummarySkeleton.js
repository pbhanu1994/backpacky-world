import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Skeleton,
} from "@mui/material";

const FlightPriceSummarySkeleton = () => {
  // Helper function to generate skeleton elements
  const renderSkeleton = (count, width) =>
    Array.from({ length: count }, (_, index) => (
      <Skeleton key={index} variant="text" height={20} width={width} />
    ));

  return (
    <Card sx={{ marginY: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Skeleton variant="text" height={24} width="50%" />
        </Typography>
        <Divider />

        {/* Skeleton for one-way or return flight */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Grid container item>
            <Typography variant="h6" gutterBottom>
              <Skeleton variant="text" height={20} width="80%" />
            </Typography>
          </Grid>
          {renderSkeleton(2, 60)}{" "}
          {/* Placeholder for "1 x Adult fare" and price */}
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Skeletons for fees */}
        {Array.from({ length: 2 }, (_, index) => (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
            key={index}
          >
            {renderSkeleton(1, 100)} {/* Placeholder for fee type */}
            {renderSkeleton(1, 60)} {/* Placeholder for fee amount */}
          </Grid>
        ))}

        {/* Skeletons for additional services */}
        {Array.from({ length: 2 }, (_, index) => (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
            key={index}
          >
            {renderSkeleton(1, 100)} {/* Placeholder for service type */}
            {renderSkeleton(1, 60)} {/* Placeholder for service amount */}
          </Grid>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Skeleton for taxes and fees */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography variant="body1" fontWeight="bold">
            <Skeleton variant="text" height={20} width="50%" />
          </Typography>
          {renderSkeleton(1, 60)}{" "}
          {/* Placeholder for total taxes and fees amount */}
        </Grid>

        <Divider sx={{ my: 2, borderColor: "black" }} />

        {/* Skeleton for total */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography variant="h5" fontWeight="bold">
            <Skeleton variant="text" height={24} width="30%" />
          </Typography>
          {renderSkeleton(1, 60)} {/* Placeholder for grand total amount */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightPriceSummarySkeleton;
