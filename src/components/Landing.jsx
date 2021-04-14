import React from 'react'
import Link from 'next/link';

export default function Landing() {
    return (
        <div>
            <h1>Welcome to BackPacky World</h1>
            <h3>Have a Safe Travel!</h3>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Sign Up</Link>
        </div>
    )
}