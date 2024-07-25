import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    clearNotifications(state, action){
      return '';
    },
    setNotification(state, action){
      return action.payload;
    }
  }
});

export default notificationSlice.reducer;
export const { clearNotifications, setNotification } = notificationSlice.actions;

export const notify = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 5000);
  };
};