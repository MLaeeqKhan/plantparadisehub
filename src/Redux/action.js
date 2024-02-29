// actions.js
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_LAST_MESSAGE = 'SET_LAST_MESSAGE';


export const setNotification = (newNotification) => ({
  type: SET_NOTIFICATION,
  payload: newNotification
});

export const setLastMessage = (message) => ({
  type: SET_LAST_MESSAGE,
  payload: message
});

