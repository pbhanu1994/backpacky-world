import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import firebaseClient from '../firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function UserHome({ userId }) {
    firebaseClient();
    const router = useRouter();
    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            <h3>Have a Safe Travel!</h3>
            <h2>UID: {userId}</h2>
            <button onClick={async () => {await firebase.auth().signOut(); router.push('/')}}>Signout</button>
        </div>
    )
}