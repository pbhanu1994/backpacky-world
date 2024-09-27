import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Page from "../../atoms/Page";
import HeaderBreadcrumbs from "../../atoms/HeaderBreadCrumbs";
import DashboardLayout from "../../layouts/dashboard";
import ToursActivities from "./ToursActivities/ToursActivities";
import useSettings from "../../../hooks/useSettings";
import { PAGE_PATH } from "../../../constants/navigationConstants";
import { LOADING_STATES } from "../../../constants/loadingStates";
import { performActivitiesSearchByGeoCode } from "../../../services/explore/toursActivities/activitiesByGeoCode";
import TourActivityCard from "./ToursActivities/TourActivityCard";
import SkeletonTourActivityCard from "./ToursActivities/SkeletonTourActivityCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExploreCity = ({ pageTitle }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { city } = router.query;
  const location = useSelector((state) => state.explore?.location);
  const { latitude, longitude } = location.geoCode;

  const [activities, setActivities] = useState(null);
  const [activitiesLoadingState, setActivitiesLoadingState] = useState(
    LOADING_STATES.INITIAL
  );

  const cityLocation = city || location.name;
  const errorMessage = "An error occurred, please try again later.";
  const noResultsForActivitiesMessage = "No Tours or Activities were found.";

  const sliderSettings = {
    dots: activities?.length > 1,
    infinite: activities?.length > 1, // This is a temporary fix - change later
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (!cityLocation) return router.push(PAGE_PATH.EXPLORE);

    // Fetching Tours & Activities
    const getActivitiesData = async () => {
      try {
        const { data: activitiesResult } =
          await performActivitiesSearchByGeoCode(dispatch, latitude, longitude);
        setActivities(activitiesResult);
        if (activitiesResult) {
          setActivitiesLoadingState(LOADING_STATES.LOADED);
        } else {
          setActivitiesLoadingState(LOADING_STATES.NO_RESULTS);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setActivitiesLoadingState(LOADING_STATES.ERROR);
      }
    };

    if (cityLocation) {
      setActivitiesLoadingState(LOADING_STATES.LOADING);
      getActivitiesData();
    }
  }, [city, cityLocation, router]);

  const renderSkeletonLoadingForActivities = () => {
    const SKELETON_LOADING_COUNT = isMobile ? 1 : 6;

    return Array.from({ length: SKELETON_LOADING_COUNT }).map((_, index) => (
      <Grid
        key={`activity-${index}`}
        item
        xs={12}
        sm={6}
        md={4}
        direction="row"
      >
        <SkeletonTourActivityCard key={`activity-item-${index}`} />
      </Grid>
    ));
  };

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <Grid sx={{ my: 2 }}>
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
            {/* Tours & Activities */}
            <Typography variant="h4" gutterBottom>
              Activities
            </Typography>
            <Grid container direction="row" spacing={1.5}>
              {/* Showing first 6 activities */}
              {isMobile && (
                <Grid item xs={12}>
                  {activitiesLoadingState === LOADING_STATES.LOADING && (
                    <Slider {...sliderSettings}>
                      {renderSkeletonLoadingForActivities()}
                    </Slider>
                  )}

                  {activities && (
                    <Slider {...sliderSettings}>
                      {activities.slice(0, 6).map((activity) => (
                        <TourActivityCard activity={activity} />
                      ))}
                    </Slider>
                  )}
                </Grid>
              )}

              {!isMobile &&
                activitiesLoadingState === LOADING_STATES.LOADING &&
                renderSkeletonLoadingForActivities()}

              {!isMobile &&
                activities &&
                activities.slice(0, 6).map((activity) => (
                  <Grid key={activity.id} item xs={4} direction="row">
                    <TourActivityCard activity={activity} />
                  </Grid>
                ))}
            </Grid>
            {activitiesLoadingState !== LOADING_STATES.LOADING &&
              activities && (
                <Grid
                  container
                  xs={12}
                  justifyContent="center"
                  sx={{ marginTop: 2 }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size={isMobile ? "large" : "medium"}
                    fullWidth={isMobile}
                    onClick={() =>
                      router.push(
                        `${PAGE_PATH.EXPLORE}${cityLocation}/activities`
                      )
                    }
                  >
                    See all {activities.length} Activities
                  </Button>
                </Grid>
              )}
            {activitiesLoadingState === LOADING_STATES.ERROR && (
              <Typography variant="body1" color="error">
                {errorMessage}
              </Typography>
            )}
            {activitiesLoadingState === LOADING_STATES.NO_RESULTS && (
              <Typography variant="body1">
                {noResultsForActivitiesMessage}
              </Typography>
            )}
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default ExploreCity;
