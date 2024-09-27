import React from "react";
import ToursActivitiesComponent from "../../../src/components/templates/Explore/ToursActivities/ToursActivities";
import { parseCookies } from "../../../src/helpers/parseCookies";
import { verifyIdToken } from "../../../src/handlers/firebaseAdmin";

import styles from "../../../styles/Home.module.css";

const ExploreCityActivities = () => {
  const pageTitle = "Explore Activities | BackpackyWorld";

  return <ToursActivitiesComponent pageTitle={pageTitle} />;
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

export default ExploreCityActivities;
