/** @format */

import { STORE_USERID } from "../actions/userAction";

const initialState = {
  userId: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USERID:
      return {
        ...state,
        userId: action.id
      };

    default:
      return state;
  }
};
export default userReducer;
