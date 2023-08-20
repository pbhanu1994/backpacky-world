import React from "react";
import HotelsComponent from "../../../src/components/templates/Book/Hotels";
import { parseCookies } from "../../../src/helpers/parseCookies";
import { verifyIdToken } from "../../../src/handlers/firebaseAdmin";

const Hotels = () => {
  const pageTitle = "Book - Hotels | BackpackyWorld";

  return <HotelsComponent pageTitle={pageTitle} />;
};

export default Hotels;

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
