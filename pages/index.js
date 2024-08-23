import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import LandingComponent from "../src/components/templates/Landing";
import styles from "../styles/Home.module.css";

export default function Landing() {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  if (user) {
    router.push("/home");
    return;
  }
  return <LandingComponent />;
}
