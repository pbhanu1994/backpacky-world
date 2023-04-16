import React from "react";
import { useRouter } from "next/router";
import JournalComponent from "../../src/components/templates/Journal";
import PackComponent from "./Pack";
import BucketListComponent from "./BucketList";
import { parseCookies } from "../../src/helpers/parseCookies";
import { verifyIdToken } from "../../src/handlers/firebaseAdmin";
import { PAGE_PATH } from "../../src/constants/navigationConstants";

export default function JournalEntry({ userId }) {
  const router = useRouter();

  switch (router.asPath) {
    case PAGE_PATH.JOURNAL_PACK:
      return <PackComponent />;
    case PAGE_PATH.JOURNAL_BUCKET_LIST:
      return <BucketListComponent />;
    default:
      return <JournalComponent />;
  }
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
