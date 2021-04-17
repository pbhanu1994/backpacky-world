import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebaseClient from './firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
    firebaseClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                nookies.destroy(null, "token");
                nookies.set(undefined, "token", "", { path: '/' });
                return;
            }
            const token = await user.getIdToken();
            setUser(user);
            nookies.destroy(null, "token");
            nookies.set(undefined, "token", token, { path: '/' });
        });
    }, []);

    // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

    return (<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>);
}

export const useAuth = () => useContext(AuthContext);