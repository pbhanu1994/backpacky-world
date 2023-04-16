import { SIGNIN_WITH_SOCIAL_ACCOUNT } from "../../actionTypes/auth";
import { auth } from "../../../handlers/firebaseClient";
import { signInWithPopup } from "firebase/auth";
import setAndShowErrorToast from "../../actions/config/toast/setAndShowErrorToast";
import loadPackItems from "../journal/pack/loadPackItems";
import loadBucketListItems from "../journal/bucketList/loadBucketListItems";
import loadTravelBudgetItems from "../travelBudget/loadTravelBudgetItems";

const signInWithSocialAccount = (provider) => async (dispatch, getState) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
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
    // TODO: Check with an experienced Developer if it's a right approach to load the sample data with auth social sign in
    dispatch(loadPackItems());
    dispatch(loadBucketListItems());
    dispatch(loadTravelBudgetItems());
  } catch (err) {
    console.log("Error Signing in", err);
    dispatch(setAndShowErrorToast(err.message));
  }
};

export default signInWithSocialAccount;
