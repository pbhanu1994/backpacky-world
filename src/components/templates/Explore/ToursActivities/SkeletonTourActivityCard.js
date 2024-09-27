import React from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

const SkeletonTourActivityCard = () => {
  return (
    <Card
      sx={{
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "16px",
      }}
    >
      {/* Image skeleton */}
      <Skeleton variant="rectangular" width="100%" height={200} />

      <CardContent
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Title skeleton */}
        <Skeleton variant="text" width="80%" height={30} />

        {/* Description skeleton */}
        <Skeleton variant="text" width="100%" height={60} />

        {/* Price and rating skeleton */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton variant="rectangular" width="60%" height={30} />
          <Skeleton
            variant="text"
            width="40%"
            height={20}
            sx={{ marginTop: 2 }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonTourActivityCard;
