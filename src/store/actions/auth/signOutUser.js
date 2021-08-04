import cookie from "js-cookie";
import { auth } from "../../../handlers/firebaseClient";

const signOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  cookie.remove("__session");
  window.location.href = "/";
};

export default signOutUser;
