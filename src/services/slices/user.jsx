import { createSlice } from '@reduxjs/toolkit'
import { fakeUserData } from '../user-data';
import { LOGIN_API_URL } from "../constants";
import { REGISTER_API_URL } from "../constants";
import { FORGOT_PASSWORD_API_URL } from "../constants";
import { RESET_PASSWORD_API_URL } from "../constants";
import { LOGOUT_API_URL } from "../constants";
import { TOKEN_API_URL } from "../constants";

import { getCookie, setCookie, deleteCookie } from '../utils';

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

export const register = (user, redirectCallback) => {
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
        dispatch(userSlice.actions.success());
        dispatch(userSlice.actions.setEmail(data.user.email));
        dispatch(userSlice.actions.setName(data.user.name));

        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);

        redirectCallback();
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

export const login = (user, redirectCallback) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password
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
        dispatch(userSlice.actions.success());
        dispatch(userSlice.actions.setEmail(data.user.email));
        dispatch(userSlice.actions.setName(data.user.name));

        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);

        redirectCallback();
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

export const forgotPassword = (email, redirectCallback) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(FORGOT_PASSWORD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email
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
        dispatch(userSlice.actions.success());
        redirectCallback();
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

export const resetPassword = (code, password, redirectCallback) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(RESET_PASSWORD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "token": code
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
        dispatch(userSlice.actions.success());
        redirectCallback();
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

export const logout = (redirectCallback) => {
  const refreshToken = getCookie('refreshToken');

  return dispatch => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(LOGOUT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": refreshToken
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
        dispatch(userSlice.actions.success());

        deleteCookie('accessToken');
        deleteCookie('refreshToken');

        redirectCallback();
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

export const refreshToken = () => {
  const refreshToken = getCookie('refreshToken');

  return dispatch => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(TOKEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": refreshToken
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
        dispatch(userSlice.actions.success());
        
        setCookie('accessToken', data.accessToken);
        // also saving new refreshToken from server
        setCookie('refreshToken', data.refreshToken);
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
    user: {
      orders: []
    },
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
    },
    setName(state, action) {
      state.user.name = action.payload;
    },
    setPassword(state, action) {
      state.user.password = action.payload;
    },
    setEmail(state, action) {
      state.user.email = action.payload;
    },
    setOrders(state, action) {
      state.user.orders = action.payload;
    },
    resetStatus(state, action) {
      state.userRequest = false;
      state.userFailed = false;
      state.userSuccess = false;
    }
  }
}) 
