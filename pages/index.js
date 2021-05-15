import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useAuth } from "../src/handlers/auth";
import LandingComponent from "../src/components/Landing";
import styles from "../styles/Home.module.css";

export default function Landing() {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.uid) {
    router.push("/home");
  }
  return <LandingComponent />;
}
