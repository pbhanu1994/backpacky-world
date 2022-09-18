import cookie from "js-cookie";
import { auth } from "../../../handlers/firebaseClient";
// import { SIGN_OUT } from "../../actionTypes/auth";

const signOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  cookie.remove("__session");
  // TODO: Check with an experienced dev if this is a good approach
  // Dispatching the SIGN_OUT to clear the store
  // dispatch({ type: SIGN_OUT });
  window.location.href = "/";
};

export default signOutUser;
