import { createSlice } from '@reduxjs/toolkit'
import { fakeUserData } from '../user-data';
import { REGISTER_API_URL } from "../constants";

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

export const register = (user) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password,
        "name": user.name,
      })
    })
    .then(res => {
      if (!res.ok && res.status !== 400) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success) {
        dispatch(userSlice.actions.success({
          email: data.user.email,
          name: data.user.name,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }))
      }
      else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      dispatch(userSlice.actions.failed())
      console.log(error);
    })
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
