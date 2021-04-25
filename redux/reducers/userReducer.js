/** @format */

import { STORE_USERID } from "../actions/userAction";

const initialState = {
  userId: "",
  role: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USERID:
      return {
        ...state,
        userId: action.id,
        role: action.role
      };

    default:
      return state;
  }
};
export default userReducer;
