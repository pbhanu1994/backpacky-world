import React from "react";
import HomeComponent from "../src/components/templates/Home";
import { parseCookies } from "../src/helpers/parseCookies";
import { verifyIdToken } from "../src/handlers/firebaseAdmin";

import styles from "../styles/Home.module.css";

const Home = ({ userId }) => {
  return <HomeComponent userId={userId} />;
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

export default Home;
