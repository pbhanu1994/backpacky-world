import { SIGNIN_WITH_SOCIAL_ACCOUNT } from "../../actionTypes/auth";
import { auth } from "../../../handlers/firebaseClient";
import setAndShowErrorToast from "../../actions/config/toast/setAndShowErrorToast";

const signInWithSocialAccount = (provider) => async (dispatch, getState) => {
  try {
    const { user } = await auth.signInWithPopup(provider);
    const {
      uid,
      displayName,
      email,
      emailVerified,
      metadata: { lastSignInTime, creationTime },
    } = user;

    dispatch({
      type: SIGNIN_WITH_SOCIAL_ACCOUNT,
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

export default signInWithSocialAccount;
