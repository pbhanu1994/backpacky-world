import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import nookies from 'nookies';
import HomeComponent from "../src/components/Home";
import firebaseClient from '../src/firebaseClient';
import {verifyIdToken} from '../src/firebaseAdmin';

import styles from '../styles/Home.module.css';

export default function Home({ userId }) {
  firebaseClient();
  return (
     <HomeComponent userId={userId} />
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
        context.res.writeHead(302, {location: '/signin'});
        context.res.end();
        return { props: {}}
    }
}