// reducer.js
import { SET_NOTIFICATION } from './action';
import { REMOVE_NOTIFICATION } from './action';


const initialState = {
  notifications: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      fetch('http://localhost:5000/saveNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
      case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.createdChatID !== action.payload)
      };
    default:
      return state;
  }
};

export default reducer;