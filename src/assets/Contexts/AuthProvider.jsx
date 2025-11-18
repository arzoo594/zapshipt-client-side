import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../FireBase/firebase.config";
const gooleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUserFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSingInFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, gooleProvider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateProfileFunc = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  const authInfo = {
    user,
    logOut,
    loading,
    registerUser,
    signInUserFunc,
    googleSingInFunc,
    updateProfileFunc,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
