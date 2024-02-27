// actions.js
export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export const setNotification = (newNotification) => ({
  type: SET_NOTIFICATION,
  payload: newNotification
});

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const removeNotification = (chatId) => ({
  type: REMOVE_NOTIFICATION,
  payload: chatId
});
