import React from "react";
import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/system";
import { Container, Typography, Button, Box } from "@mui/material";
import PlanImage from "../../assets/images/landing-page/plan.png";
import PackImage from "../../assets/images/landing-page/pack.png";
import BucketListImage from "../../assets/images/landing-page/bucketlist.png";
import TravelBudgetImage from "../../assets/images/landing-page/travel-budget.png";
import CalendarImage from "../../assets/images/landing-page/calendar.png";

const HeroSection = styled("div")(({ theme }) => ({
  position: "relative",
  color: theme.palette.common.white,
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(4),
  textAlign: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1470653503930-01819ee7ec83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
}));

const StyledLink = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.common.white,
  borderColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
}));

const FeatureContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: theme.spacing(4),
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    textAlign: "left",
  },
}));

const FeatureImage = styled(Box)(({ theme }) => ({
  flex: "0 0 50%",
  height: "auto",
  marginRight: theme.spacing(4),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const FeatureContent = styled(Box)(({ theme }) => ({
  flex: "0 0 50%",
  [theme.breakpoints.up("md")]: {
    order: -1,
  },
}));

const GetStartedContent = styled("div")({
  display: "flex",
  justifyContent: "center",
  padding: "2rem 0",
});

const Landing = () => {
  return (
    <div>
      <HeroSection>
        <Container maxWidth="sm">
          <Typography variant="h1" component="h1" gutterBottom>
            Backpacky
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Safe Travels!
          </Typography>
          <Link href="/signin" passHref>
            <StyledLink variant="outlined" size="large" sx={{ m: "0 10px" }}>
              Sign In
            </StyledLink>
          </Link>
          <Link href="/signup" passHref>
            <StyledLink variant="contained" size="large" sx={{ m: "0 10px" }}>
              Sign Up
            </StyledLink>
          </Link>
        </Container>
      </HeroSection>
      {/* TODO: Update the Feature descriptions with accurate info... */}
      <FeatureContainer>
        <FeatureBox>
          <FeatureImage>
            <Image src={PlanImage} alt="Plan" width={600} />
          </FeatureImage>
          <FeatureContent>
            <Typography variant="h5" gutterBottom color="primary">
              Plan Your New Adventure
            </Typography>
            <Typography variant="body1" paragraph>
              Our app makes it simple to plan every aspect of your trip, from
              flights and accommodations to activities and sightseeing. Simply
              input your desired destination and travel dates, and our app will
              provide you with a comprehensive list of options for your
              itinerary. Plus, with our user-friendly interface, you can easily
              customize your trip to fit your specific preferences and needs.
            </Typography>
          </FeatureContent>
        </FeatureBox>
        <FeatureBox>
          <FeatureImage>
            <Image src={PackImage} alt="Pack" width={600} />
          </FeatureImage>
          <FeatureContent>
            <Typography variant="h5" gutterBottom color="primary">
              Things to Pack
            </Typography>
            <Typography variant="body1" paragraph>
              To help ensure that you don't forget any important items on your
              trip, our app comes equipped with a handy todo list feature.
              Simply input the items you need to bring along, and our app will
              remind you before you depart.
            </Typography>
          </FeatureContent>
        </FeatureBox>
        <FeatureBox>
          <FeatureImage>
            <Image src={BucketListImage} alt="Plan" width={600} />
          </FeatureImage>
          <FeatureContent>
            <Typography variant="h5" gutterBottom color="primary">
              Bucketlist
            </Typography>
            <Typography variant="body1" paragraph>
              Create your ultimate travel bucket list on our app and embark on a
              transformative journey of discovery. From iconic landmarks to
              hidden gems, curate a collection of awe-inspiring destinations,
              exhilarating activities, and breathtaking experiences. Personalize
              your list, track your progress, and turn your dreams into reality,
              one checked-off item at a time.
            </Typography>
          </FeatureContent>
        </FeatureBox>
        <FeatureBox>
          <FeatureImage>
            <Image src={TravelBudgetImage} alt="Pack" width={600} />
          </FeatureImage>
          <FeatureContent>
            <Typography variant="h5" gutterBottom color="primary">
              Travel Budget
            </Typography>
            <Typography variant="body1" paragraph>
              Sticking to a budget while traveling is important, and our app
              makes it easy. Input your travel budget, and our app will help you
              find the best deals on flights, accommodations, and activities so
              you can stay within your budget while still having an amazing
              trip.
            </Typography>
          </FeatureContent>
        </FeatureBox>
        <FeatureBox>
          <FeatureImage>
            <Image src={CalendarImage} alt="Pack" width={600} />
          </FeatureImage>
          <FeatureContent>
            <Typography variant="h5" gutterBottom color="primary">
              Events Calendar
            </Typography>
            <Typography variant="body1" paragraph>
              Want to make sure you don't miss out on any must-see events or
              activities at your destination? Our app's calendar feature will
              help you stay on top of all the upcoming events and activities so
              you can plan your itinerary accordingly.
            </Typography>
          </FeatureContent>
        </FeatureBox>
      </FeatureContainer>
      <GetStartedContent>
        <Link href="/signup" passHref>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ margin: "auto" }}
          >
            Get Started
          </Button>
        </Link>
      </GetStartedContent>
    </div>
  );
};

export default Landing;
