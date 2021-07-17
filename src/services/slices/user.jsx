import { createSlice } from '@reduxjs/toolkit'
import { fakeUserData } from '../user-data';

export const getUser = () => {
  return dispatch => {
    dispatch(userSlice.actions.request());
    // getting data from fake API
    setTimeout(() => {  
    if (!!fakeUserData)
      dispatch(userSlice.actions.success(fakeUserData));
    else
      dispatch(userSlice.actions.failed());
    }, 1000);
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userRequest: false,
    userFailed: false,
    userSuccess: false,
  },
  reducers: {
    request(state) {
      state.userRequest = true;
      state.userFailed = false;
      state.userSuccess = false;
    },
    failed(state) {
      state.userFailed = true;
      state.userRequest = false;
      state.userSuccess = false;
    },
    success(state, action) {
      state.userSuccess = true;
      state.userRequest = false;
      state.userFailed = false;
      state.user = action.payload;
    },
    setName(state, action) {
      state.user.name = action.payload;
    },
    setPassword(state, action) {
      state.user.password = action.payload;
    },
    setEmail(state, action) {
      state.user.email = action.payload;
    }
  }
}) 
