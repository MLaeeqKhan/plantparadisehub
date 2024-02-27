// reducer.js
import { SET_NOTIFICATION } from "./action";

const initialState = {
  notifications: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,      };
    
    default:
      return state;
  }
};

export default reducer;
