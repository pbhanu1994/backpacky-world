import { SIGNIN_USER } from "../../actionTypes/auth";
import { auth } from "../../../handlers/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import setAndShowErrorToast from "../../actions/config/toast/setAndShowErrorToast";

const signInUser = (userEmail, userPassword) => async (dispatch, getState) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    const {
      uid,
      displayName,
      email,
      emailVerified,
      metadata: { lastSignInTime, creationTime },
    } = user;

    dispatch({
      type: SIGNIN_USER,
      payload: {
        uid,
        displayName,
        email,
        emailVerified,
        metadata: {
          lastSignInTime,
          creationTime,
        },
      },
    });
  } catch (err) {
    console.log("Error Signing in", err);
    dispatch(setAndShowErrorToast(err.message));
    return "error";
  }
};

export default signInUser;
