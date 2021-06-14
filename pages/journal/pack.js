import React from "react";
import PackComponent from "../../src/components/templates/Journal/Pack";
import { parseCookies } from "../../src/helpers/parseCookies";
import { verifyIdToken } from "../../src/handlers/firebaseAdmin";

export default function Pack({ userId }) {
  return <PackComponent />;
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
