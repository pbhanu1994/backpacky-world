import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Skeleton,
} from "@mui/material";

const FlightInfoSkeleton = () => {
  // Helper function to generate skeleton elements
  const renderSkeleton = (count) =>
    Array.from({ length: count }, (_, index) => (
      <Grid item xs={6} key={index}>
        <Skeleton variant="text" height={20} />
      </Grid>
    ));

  // Skeleton for a single segment
  const renderSegmentSkeleton = () => (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {renderSkeleton(2)} {/* Departure */}
      {renderSkeleton(2)} {/* Arrival */}
      {renderSkeleton(2)} {/* Carrier and Flight Number */}
      {renderSkeleton(1)} {/* Aircraft */}
      {renderSkeleton(1)} {/* Duration */}
    </Grid>
  );

  // Skeleton for traveler pricing
  const renderTravelerPricingSkeleton = () => (
    <>
      {renderSkeleton(1)} {/* Traveler ID */}
      {renderSkeleton(1)} {/* Type */}
      {renderSkeleton(1)} {/* Fare Option */}
      {renderSkeleton(1)} {/* Price */}
      {renderSkeleton(1)} {/* Base Price */}
      <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
        <Skeleton variant="text" height={20} width="20%" />
      </Typography>
      <Skeleton variant="text" height={20} />
    </>
  );

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Skeleton variant="text" height={20} width="50%" />
        </Typography>
        <Typography variant="body1">
          <Skeleton variant="text" height={20} width="20%" />
        </Typography>
        <Typography variant="body1">
          <Skeleton variant="text" height={20} width="40%" />
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          <Skeleton variant="text" height={20} width="20%" />
        </Typography>
        {/* Placeholder for Itinerary */}
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              <Skeleton variant="text" height={20} width="20%" />
            </Typography>
            {renderSegmentSkeleton()}
          </div>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">
          <Skeleton variant="text" height={20} width="30%" />
        </Typography>
        {/* Placeholder for Traveler Pricing */}
        {Array.from({ length: 1 }, (_, index) => (
          <div key={index}>{renderTravelerPricingSkeleton()}</div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FlightInfoSkeleton;
