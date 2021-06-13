import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import JournalComponent from "../../src/components/templates/Journal/";
import { parseCookies } from "../../src/helpers/parseCookies";
import { verifyIdToken } from "../../src/handlers/firebaseAdmin";

import styles from "../../styles/Home.module.css";

export default function Journal({ userId }) {
  return <JournalComponent userId={userId} />;
}

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
