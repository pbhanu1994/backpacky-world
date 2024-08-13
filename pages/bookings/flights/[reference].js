import React from "react";
import FlightBookingConfirmationComponent from "../../../src/components/templates/Book/Flights/FlightBookingConfirmation";
import { parseCookies } from "../../../src/helpers/parseCookies";
import { verifyIdToken } from "../../../src/handlers/firebaseAdmin";

const FlightBookingConfirmation = () => {
  const pageTitle = "Flight - Booking Confirmation | BackpackyWorld";

  return <FlightBookingConfirmationComponent pageTitle={pageTitle} />;
};

export default FlightBookingConfirmation;

export async function getServerSideProps({ req }) {
  try {
    const cookies = parseCookies(req);
    const token = await verifyIdToken(cookies.__session);
    const { uid } = token;
    return {
      props: { userId: uid || "" },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  }
}
