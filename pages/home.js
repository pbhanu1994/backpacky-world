import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../src/components/Navbar";
import HomeComponent from "../src/components/Home";
import { parseCookies } from '../src/utils/parseCookies';
import { verifyIdToken } from '../src/firebaseAdmin';


import styles from '../styles/Home.module.css';

export default function Home({ userId }) {
  return (
    <>
     <Navbar />
     <HomeComponent userId={userId} />
    </>
  )
}

export async function getServerSideProps({ req, res }) {
    try {
        const cookies = parseCookies(req);
        const token = await verifyIdToken(cookies.__session);
        const {uid} = token;
        return {
            props: { userId: uid || "" }
        }
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/signin",
            },
            props: {}
        };
    }
}