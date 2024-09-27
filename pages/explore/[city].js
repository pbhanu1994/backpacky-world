import React from "react";
import ExploreCityComponent from "../../src/components/templates/Explore/ExploreCity";
import { parseCookies } from "../../src/helpers/parseCookies";
import { verifyIdToken } from "../../src/handlers/firebaseAdmin";

import styles from "../../styles/Home.module.css";

const ExploreCity = () => {
  const pageTitle = "Explore | BackpackyWorld";

  return <ExploreCityComponent pageTitle={pageTitle} />;
};

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

export default ExploreCity;
