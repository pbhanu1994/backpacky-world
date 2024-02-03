import React from "react";
import HotelBookingConfirmationComponent from "../../../../src/components/templates/Book/HotelBookingConfirmation";
import { parseCookies } from "../../../../src/helpers/parseCookies";
import { verifyIdToken } from "../../../../src/handlers/firebaseAdmin";

const HotelBookingConfirmation = () => {
  const pageTitle = "Hotel - Booking Confirmation | BackpackyWorld";

  return <HotelBookingConfirmationComponent pageTitle={pageTitle} />;
};

export default HotelBookingConfirmation;

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
