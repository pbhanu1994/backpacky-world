import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";
import DashboardLayout from "../layouts/dashboard";
import useSettings from "../../hooks/useSettings";
import Page from "../atoms/Page";

import getPackItems from "../../store/actions/journal/pack/getPackItems";
import getBucketListItems from "../../store/actions/journal/bucketList/getBucketListItems";
import getBudgetItems from "../../store/actions/travelBudget/getTravelBudgetItems";
import getFlightBookings from "../../store/actions/book/flights/bookings/getFlightBookings";
import getHotelBookings from "../../store/actions/book/hotels/bookings/getHotelBookings";

const Home = ({ userId }) => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const user = useSelector((state) => state.auth?.user);
  const displayName = user?.displayName ?? "";

  useEffect(() => {
    // Journal - Pack items
    dispatch(getPackItems());
    // Journal - Bucket List items
    dispatch(getBucketListItems());
    // Travel Budget Items
    dispatch(getBudgetItems());
    // Book - Flights - Bookings
    dispatch(getFlightBookings());
    // Book - Hotels - Bookings
    dispatch(getHotelBookings());
  }, []);

  return (
    <DashboardLayout>
      <Page title="Home | BackpackyWorld">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Typography
            variant="h3"
            component="h1"
            paragraph
            sx={{ textTransform: "capitalize" }}
          >
            Hi, {displayName.split(" ")[0]}!
          </Typography>
          <Typography gutterBottom>
            Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis,
            ligula mi congue nunc, vitae euismod ligula urna in dolor. Nam quam
            nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus
            blandit leo ut odio. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Fusce id purus. Aliquam
            lorem ante, dapibus in, viverra quis, feugiat a, tellus. In
            consectetuer turpis ut velit. Aenean posuere, tortor sed cursus
            feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor
            sagittis lacus. Vestibulum suscipit nulla quis orci. Nam commodo
            suscipit quam. Sed a libero.
          </Typography>
          <Typography gutterBottom>
            Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis,
            ligula mi congue nunc, vitae euismod ligula urna in dolor. Nam quam
            nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus
            blandit leo ut odio. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Fusce id purus. Aliquam
            lorem ante, dapibus in, viverra quis, feugiat a, tellus. In
            consectetuer turpis ut velit. Aenean posuere, tortor sed cursus
            feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor
            sagittis lacus. Vestibulum suscipit nulla quis orci. Nam commodo
            suscipit quam. Sed a libero.
          </Typography>
          <Typography>
            Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla
            ut metus varius laoreet. Curabitur ullamcorper ultricies nisi. Ut
            non enim eleifend felis pretium feugiat. Donec mi odio, faucibus at,
            scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque libero
            metus, condimentum nec, tempor a, commodo mollis, magna. In enim
            justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Cras dapibus
            really.
          </Typography>
        </Container>
      </Page>
    </DashboardLayout>
  );
};

export default Home;
