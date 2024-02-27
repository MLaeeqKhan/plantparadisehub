// actions.js
export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export const setNotification = (newNotification) => ({
  type: SET_NOTIFICATION,
  payload: newNotification
});
