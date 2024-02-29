// reducer.js
import { SET_NOTIFICATION } from "./action";
import { SET_LAST_MESSAGE } from "./action";


const initialState = {
  notifications: [],
  lastMessage:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
      };
      case SET_LAST_MESSAGE:
        return {
          ...state,
          lastMessage: action.payload,
        };

    default:
      return state;
  }
};

export default reducer;
