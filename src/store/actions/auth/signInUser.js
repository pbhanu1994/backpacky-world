import { SIGNIN_USER } from "../../actionTypes/auth";
import { auth } from "../../../handlers/firebaseClient";
import setAndShowErrorToast from "../../actions/config/toast/setAndShowErrorToast";

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
    dispatch(setAndShowErrorToast(err.message));
  }
};

export default signInUser;
