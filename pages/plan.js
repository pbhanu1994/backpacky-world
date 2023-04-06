import React from "react";
import PlanComponent from "../src/components/templates/Plan";
import { parseCookies } from "../src/helpers/parseCookies";
import { verifyIdToken } from "../src/handlers/firebaseAdmin";

import styles from "../styles/Home.module.css";

const Plan = ({ userId }) => {
  return <PlanComponent userId={userId} />;
};

export async function getServerSideProps({ req, res }) {
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

export default Plan;
