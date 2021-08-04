import { SIGNIN_USER } from "../../actionTypes/auth";
import { auth } from "../../../handlers/firebaseClient";
import setAndShowToastMessage from "../../actions/config/setAndShowToastMessage";

const signInUser = (userEmail, userPassword) => async (dispatch, getState) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(
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
    dispatch(setAndShowToastMessage(true, "error", err.message));
  }
};

export default signInUser;
