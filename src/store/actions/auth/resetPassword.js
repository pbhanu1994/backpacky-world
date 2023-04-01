import { auth } from "../../../handlers/firebaseClient";
import { sendPasswordResetEmail } from "firebase/auth";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const resetPassword = (userEmail) => async (dispatch, getState) => {
  try {
    await sendPasswordResetEmail(auth, userEmail);
    return "success";
  } catch (err) {
    console.log("Error Signing in", err);
    dispatch(setAndShowErrorToast(err.message));
    return "error";
  }
};

export default resetPassword;
