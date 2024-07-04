import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Button,
  Box,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { formatISODuration } from "../../../../utils/formatTime";
import { formatCurrency } from "../../../../utils/formatCurrency";

const FlightCard = ({ offer, onSelectedFlight, showSelectButton = true }) => {
  const { itineraries, price } = offer;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const StyledGridItem = styled(Grid)(() => ({
    maxWidth: isMobile ? "unset" : "auto",
  }));

  const isReturn = itineraries.length === 2;

  const handleClick = () => {
    onSelectedFlight(offer);
  };

  return (
    <Card sx={{ marginY: 2 }}>
      <CardContent>
        {itineraries.map((itinerary, index) => (
          <Box key={index} sx={{ marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
              {!isReturn ? "Departing Flight" : "Returning Flight"}
            </Typography>
            {itinerary.segments.map((segment, idx) => (
              <Box
                key={segment.id}
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Grid container spacing={2} alignItems="center">
                  <StyledGridItem item xs={isMobile ? 3 : 1}>
                    <img
                      src={`https://content.airhex.com/content/logos/airlines_${segment.carrierCode}_100_100_s.png`}
                      alt={`${segment.carrierCode} logo`}
                      width={40}
                      height={40}
                    />
                  </StyledGridItem>
                  {!isMobile ? (
                    <>
                      <StyledGridItem item xs={2}>
                        <Typography variant="h6">
                          {new Date(segment.departure.at).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(segment.departure.at).toLocaleDateString(
                            [],
                            {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </Typography>
                      </StyledGridItem>
                      <StyledGridItem item xs={1}>
                        <Typography variant="h6">
                          {segment.departure.iataCode}
                        </Typography>
                      </StyledGridItem>
                      <StyledGridItem item xs={1} textAlign="center">
                        <FlightIcon sx={{ rotate: "90deg" }} />
                      </StyledGridItem>
                      <StyledGridItem item xs={1}>
                        <Typography variant="h6">
                          {segment.arrival.iataCode}
                        </Typography>
                      </StyledGridItem>
                      <StyledGridItem item xs={2}>
                        <Typography variant="h6">
                          {new Date(segment.arrival.at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(segment.arrival.at).toLocaleDateString([], {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </Typography>
                      </StyledGridItem>
                    </>
                  ) : (
                    <>
                      <StyledGridItem item xs={3}>
                        <Typography variant="h5" color="primary">
                          {segment.departure.iataCode}
                        </Typography>
                        <Typography variant="h6">
                          {new Date(segment.departure.at).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(segment.departure.at).toLocaleDateString(
                            [],
                            {
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </Typography>
                      </StyledGridItem>
                      <StyledGridItem item xs={3} textAlign="center">
                        <FlightIcon sx={{ rotate: "90deg" }} />
                      </StyledGridItem>
                      <StyledGridItem item xs={3}>
                        <Typography variant="h5" color="primary">
                          {segment.arrival.iataCode}
                        </Typography>
                        <Typography variant="h6">
                          {new Date(segment.arrival.at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(segment.arrival.at).toLocaleDateString([], {
                            day: "numeric",
                            month: "short",
                          })}
                        </Typography>
                      </StyledGridItem>
                    </>
                  )}
                  {!isMobile && (
                    <>
                      <Grid item xs={2}>
                        <Typography variant="h6" color="green">
                          Non-stop
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">
                          {formatISODuration(segment.duration)}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            ))}
            {/* {index < itineraries.length - 1 && (
              <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                Layover in{" "}
                {
                  itinerary.segments[itinerary.segments.length - 1].arrival
                    .iataCode
                }
              </Typography>
            )} */}
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
                {formatCurrency(price.total, price.currency)}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleClick}>
                SELECT
              </Button>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default FlightCard;
