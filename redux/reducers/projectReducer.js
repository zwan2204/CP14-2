/** @format */

import { STORE_PROJECTID } from "../actions/projectAction";

const initialState = {
  projectIDs: ""
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PROJECTID:
      return {
        ...state,
        projectIDs: action.id
      };

    default:
      return state;
  }
};
export default projectReducer;
