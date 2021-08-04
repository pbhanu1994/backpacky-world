import { SIGNUP_USER } from "../../actionTypes/auth";
import { auth } from "../../../handlers/firebaseClient";
import setAndShowToastMessage from "../../actions/config/setAndShowToastMessage";

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
    } catch (err) {
      console.log("Error Signing up", err);
      dispatch(setAndShowToastMessage(true, "error", err.message));
    }
  };

export default signUpUser;
