import React, { useState, useEffect, useContext, createContext } from "react";
import cookie from "js-cookie";
import { auth } from "./firebaseClient";

const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      cookie.remove("__session");
      if (!user) {
        setUser(null);
        cookie.set("__session", "");
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      cookie.set("__session", token);
    });
  }, []);

  // Force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Sign-up with Email & Password
export const signUpWithEmailAndPassword = async (
  email,
  password,
  firstName
) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  await user.updateProfile({ displayName: firstName });
  if (user) window.location.href = `${user && "/home"}`;
  // router.replace(user && '/home');
};

// Sign-in with Email & Password
export const signInWithEmailAndPassword = async (email, password) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  if (user) window.location.href = `${user && "/home"}`;
  // router.replace(user && '/home');
};

// Sign-in with Social Media (Facebook, Google, Twitter)
export const socialMediaAuth = async (provider) => {
  const { user } = await auth.signInWithPopup(provider);
  if (user) window.location.href = `${user && "/home"}`;
};

// Signout here
export const signOut = async () => {
  await auth.signOut();
  cookie.remove("__session");
  window.location.href = "/";
};

export const useAuth = () => useContext(AuthContext);
