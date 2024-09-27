import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Page from "../../../atoms/Page";
import HeaderBreadcrumbs from "../../../atoms/HeaderBreadCrumbs";
import DashboardLayout from "../../../layouts/dashboard";
import TourActivityCard from "./TourActivityCard";
import SkeletonTourActivityCard from "./SkeletonTourActivityCard";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import { LOADING_STATES } from "../../../../constants/loadingStates";
import useSettings from "../../../../hooks/useSettings";
import { performActivitiesSearchByGeoCode } from "../../../../services/explore/toursActivities/activitiesByGeoCode";

const ToursActivities = ({ pageTitle }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { city } = router.query;
  const location = useSelector((state) => state.explore?.location);
  const { latitude, longitude } = location.geoCode;

  const [activities, setActivities] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ACTIVITIES_PER_PAGE = 6;

  const heading = "Explore";
  const currentPageHeading = "Activities";
  const cityLocation = city || location.name;
  const errorMessage = "An error occurred, please try again later.";
  const noResultsForActivitiesMessage = "No Tours or Activities were found.";

  useEffect(() => {
    if (!cityLocation) return router.push(PAGE_PATH.EXPLORE);

    const fetchActivities = async () => {
      setLoadingState(LOADING_STATES.LOADING);
      try {
        const { data: activitiesResult } =
          await performActivitiesSearchByGeoCode(dispatch, latitude, longitude);
        setActivities(activitiesResult);
        setTotalPages(Math.ceil(activitiesResult.length / ACTIVITIES_PER_PAGE));
        setLoadingState(LOADING_STATES.LOADED);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setLoadingState(LOADING_STATES.ERROR);
      }
    };

    if (cityLocation) {
      fetchActivities();
    }
  }, [cityLocation, latitude, longitude, router]);

  const loadMoreActivities = () => {
    // Set loading state when load more is triggered
    setLoadingState(LOADING_STATES.LOADING);

    // Simulating loading delay, replace with actual data fetching
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoadingState(LOADING_STATES.LOADED);
    }, 1000); // Simulate delay
  };

  const displayedActivities = activities.slice(
    0,
    currentPage * ACTIVITIES_PER_PAGE
  );

  const renderSkeletonLoading = () => {
    const LOADING_COUNT = isMobile ? 3 : ACTIVITIES_PER_PAGE;
    return Array.from({ length: LOADING_COUNT }, (_, index) => (
      <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
        <SkeletonTourActivityCard />
      </Grid>
    ));
  };

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <Typography variant="h2" sx={{ mb: 4, fontWeight: 100 }}>
            Explore{" "}
            <Typography
              component="span"
              variant="h2"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {cityLocation}
            </Typography>
          </Typography>
          <HeaderBreadcrumbs
            links={[
              { name: heading, href: PAGE_PATH.EXPLORE },
              {
                name: cityLocation,
                href: `${PAGE_PATH.EXPLORE}${cityLocation}`,
              },
              {
                name: currentPageHeading,
              },
            ]}
          />
          <Typography variant="h4" gutterBottom>
            {currentPageHeading}
          </Typography>
          <Grid container spacing={2}>
            {/* Render activities */}
            {displayedActivities.map((activity) => (
              <Grid item xs={12} sm={6} md={4} key={activity.id}>
                <TourActivityCard activity={activity} />
              </Grid>
            ))}

            {/* Skeleton loading while fetching more activities */}
            {loadingState === LOADING_STATES.LOADING && renderSkeletonLoading()}

            {/* Error or No Results */}
            {loadingState === LOADING_STATES.ERROR && (
              <Typography variant="body1" color="error">
                {errorMessage}
              </Typography>
            )}
            {loadingState === LOADING_STATES.NO_RESULTS && (
              <Typography variant="body1">
                {noResultsForActivitiesMessage}
              </Typography>
            )}
          </Grid>

          {/* Load more button */}
          {currentPage < totalPages &&
            loadingState !== LOADING_STATES.LOADING && (
              <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size={isMobile ? "large" : "medium"}
                  fullWidth={isMobile}
                  onClick={loadMoreActivities}
                >
                  Load More {currentPageHeading}
                </Button>
              </Grid>
            )}
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default ToursActivities;
