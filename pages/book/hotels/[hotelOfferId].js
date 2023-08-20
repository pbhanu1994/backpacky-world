import React from "react";
import HotelOfferComponent from "../../../src/components/templates/Book/HotelOffer";
import { parseCookies } from "../../../src/helpers/parseCookies";
import { verifyIdToken } from "../../../src/handlers/firebaseAdmin";

const HotelOffer = () => {
  const pageTitle = "Book - Hotel | BackpackyWorld";

  return <HotelOfferComponent pageTitle={pageTitle} />;
};

export default HotelOffer;

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
