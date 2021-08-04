import {
  SIGNUP_USER,
  SIGNIN_USER,
  SIGNIN_WITH_SOCIAL_ACCOUNT,
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

    default:
      return state;
  }
};
