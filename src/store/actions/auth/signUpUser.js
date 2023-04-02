import { SIGNUP_USER } from "../../actionTypes/auth";
import { auth } from "../../../handlers/firebaseClient";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import setAndShowErrorToast from "../../actions/config/toast/setAndShowErrorToast";
import loadPackItems from "../journal/pack/loadPackItems";
import loadTravelBudgetItems from "../travelBudget/loadTravelBudgetItems";

const signUpUser =
  (userEmail, userPassword, userFirstName, userLastName) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      await updateProfile(user, {
        displayName: `${userFirstName} ${userLastName}`,
      });
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
      dispatch(loadTravelBudgetItems());
    } catch (err) {
      console.log("Error Signing up", err);
      dispatch(setAndShowErrorToast(err.message));
      return "error";
    }
  };

export default signUpUser;
