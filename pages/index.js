import Head from 'next/head';
import { useSelector, useDispatch } from "react-redux";
import nookies from 'nookies';
import HomeComponent from "../src/components/Home";
import UserHomeComponent from "../src/components/UserHome";
import firebaseClient from '../src/firebaseClient';
import {verifyIdToken} from '../src/firebaseAdmin';

import styles from '../styles/Home.module.css';

export default function Home({ userId }) {
  firebaseClient(); 
  return (
    <div>
      {userId ? <UserHomeComponent userId={userId} /> : <HomeComponent />}
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const {uid} = token;
    return {
      props: { userId: uid || null}
    }
  } catch (err) {
      return {props: {}}
  }
}