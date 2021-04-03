import Head from 'next/head';
import { useSelector, useDispatch } from "react-redux";
import HomeComponent from "../src/components/Home";

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <HomeComponent />
  )
}
