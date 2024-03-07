// reducer.js
import { SET_NOTIFICATION } from "./action";
import { SET_LAST_MESSAGE } from "./action";
import { SET_RECEIVER_ID } from "./action";


const initialState = {
  notifications: [],
  lastMessage:[],
  receiverId:null,
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
        case SET_RECEIVER_ID:
          return {
            ...state,
            receiverId: action.payload,
          };
  
    default:
      return state;
  }
};

export default reducer;
