import Head from 'next/head';
import { useSelector, useDispatch } from "react-redux";
import incrementCounter from "../redux/actions/counter/incrementCounter";
import decrementCounter from "../redux/actions/counter/decrementCounter";

import HomeComponent from "../src/components/Home";

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <HomeComponent />
  )
}
