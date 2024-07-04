import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const FlightCardSkeleton = ({ showSelectButton = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card sx={{ marginY: 2 }}>
      <CardContent>
        {[1, 2].map((_, index) => (
          <Box key={index} sx={{ marginTop: 2 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={isMobile ? 3 : 1}>
                  <Skeleton variant="circular" width={40} height={40} />
                </Grid>
                {!isMobile ? (
                  <>
                    <Grid item xs={2}>
                      <Skeleton variant="text" width={60} />
                      <Skeleton variant="text" width={80} />
                    </Grid>
                    <Grid item xs={1}>
                      <Skeleton variant="text" width={40} />
                    </Grid>
                    <Grid item xs={1} textAlign="center">
                      <FlightIcon sx={{ rotate: "90deg" }} />
                    </Grid>
                    <Grid item xs={1}>
                      <Skeleton variant="text" width={40} />
                    </Grid>
                    <Grid item xs={2}>
                      <Skeleton variant="text" width={60} />
                      <Skeleton variant="text" width={80} />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={3}>
                      <Skeleton variant="text" width={40} />
                      <Skeleton variant="text" width={60} />
                      <Skeleton variant="text" width={80} />
                    </Grid>
                    <Grid item xs={3} textAlign="center">
                      <FlightIcon sx={{ rotate: "90deg" }} />
                    </Grid>
                    <Grid item xs={3}>
                      <Skeleton variant="text" width={40} />
                      <Skeleton variant="text" width={60} />
                      <Skeleton variant="text" width={80} />
                    </Grid>
                  </>
                )}
                {!isMobile && (
                  <>
                    <Grid item xs={2}>
                      <Skeleton variant="text" width={60} />
                    </Grid>
                    <Grid item xs={2}>
                      <Skeleton variant="text" width={40} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
            {showSelectButton && <Divider />}
          </Box>
        ))}
        {showSelectButton && (
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            sx={{ marginTop: 2 }}
          >
            <Grid item>
              <Typography variant="h5" component="div" sx={{ marginRight: 2 }}>
                <Skeleton variant="text" width={60} />
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" disabled>
                <Skeleton variant="rectangular" width={60} height={30} />
              </Button>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default FlightCardSkeleton;
