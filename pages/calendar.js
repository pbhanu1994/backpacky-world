import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { parseCookies } from "../src/helpers/parseCookies";
import { verifyIdToken } from "../src/handlers/firebaseAdmin";

import styles from "../styles/Home.module.css";

let CalendarComponent;

const Calendar = ({ userId }) => {
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  // Dynamically importing the Calendar Component for not rendering in SSR with ssr: false
  // and adding it in useEffect just to be sure that window is already defined
  useEffect(() => {
    CalendarComponent = dynamic(
      () => import("../src/components/templates/Calendar"),
      {
        ssr: false,
      }
    );
    setCalendarLoaded(true);
  });

  let showCalendar = (userId) => {
    if (!calendarLoaded) return <div>Loading ...</div>;
    return <CalendarComponent userId={userId} />;
  };

  return <div>{showCalendar(userId)}</div>;
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

export default Calendar;
