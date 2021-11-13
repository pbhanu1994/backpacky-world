import { SIGNUP_USER } from "../../actionTypes/auth";
import { auth } from "../../../handlers/firebaseClient";
import setAndShowErrorToast from "../../actions/config/toast/setAndShowErrorToast";
import loadPackItems from "../journal/pack/loadPackItems";

const signUpUser =
  (userEmail, userPassword, userFirstName) => async (dispatch, getState) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        userEmail,
        userPassword
      );
      await user.updateProfile({ displayName: userFirstName });
      const {
        uid,
        displayName,
        email,
        emailVerified,
        metadata: { lastSignInTime, creationTime },
      } = user;

      dispatch({
        type: SIGNUP_USER,
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

      dispatch(loadPackItems());
    } catch (err) {
      console.log("Error Signing up", err);
      dispatch(setAndShowErrorToast(err.message));
      return "error";
    }
  };

export default signUpUser;
