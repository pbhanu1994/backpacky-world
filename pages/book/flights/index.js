import React from "react";
import FlightsComponent from "../../../src/components/templates/Book/Flights/Flights";
import { parseCookies } from "../../../src/helpers/parseCookies";
import { verifyIdToken } from "../../../src/handlers/firebaseAdmin";

const Flights = () => {
  const pageTitle = "Book - Flights | BackpackyWorld";

  return <FlightsComponent pageTitle={pageTitle} />;
};

export default Flights;

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
