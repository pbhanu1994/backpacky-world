import cookie from "js-cookie";
import { auth } from "../../../handlers/firebaseClient";
import { signOut } from "firebase/auth";
import { SIGN_OUT } from "../../actionTypes/auth";

const signOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);

    cookie.remove("__session");

    // TODO: Check with an experienced dev if this is a good approach
    // Dispatch the SIGN_OUT to clear the store
    await dispatch({ type: SIGN_OUT });
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export default signOutUser;
