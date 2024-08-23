import {
  SIGNUP_USER,
  SIGNIN_USER,
  SIGNIN_WITH_SOCIAL_ACCOUNT,
  SIGN_OUT,
} from "../actionTypes/auth";

const initialState = {
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER: {
      return { ...state, user: action.payload };
    }

    case SIGNIN_USER: {
      return { ...state, user: action.payload };
    }

    case SIGNIN_WITH_SOCIAL_ACCOUNT: {
      return { ...state, user: action.payload };
    }

    case SIGN_OUT: {
      return { user: null };
    }

    default:
      return state;
  }
};
