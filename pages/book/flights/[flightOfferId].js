import React from "react";
import FlightOfferComponent from "../../../src/components/templates/Book/Flights/FlightOffer";
import { parseCookies } from "../../../src/helpers/parseCookies";
import { verifyIdToken } from "../../../src/handlers/firebaseAdmin";

const FlightOffer = () => {
  const pageTitle = "Book - Flight | BackpackyWorld";

  return <FlightOfferComponent pageTitle={pageTitle} />;
};

export default FlightOffer;

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
