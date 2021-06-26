import { createSlice } from '@reduxjs/toolkit'
import { ITEMS_API_URL } from "../constants";

export const getItems = () => {
  return dispatch => {
    dispatch(itemsSlice.actions.request());
    // getting data from API
    fetch(ITEMS_API_URL)  
      .then(res => {
        if (!res.ok) {
          // we don't need to set state vars here as we will do that in catch
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(({data}) => {
        dispatch(itemsSlice.actions.success(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(itemsSlice.actions.failed());
      })
  }
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    itemsSuccess: false,
  },
  reducers: {
    request(state) {
      state.itemsRequest = true;
      state.itemsFailed = false;
      state.itemsSuccess = false;
    },
    failed(state) {
      state.itemsFailed = true;
      state.itemsRequest = false;
      state.itemsSuccess = false;
    },
    success(state, action) {
      state.itemsSuccess = true;
      state.itemsRequest = false;
      state.itemsFailed = false;
      state.items = action.payload;
    },
    setValue(state, action) {
      state.items = [...state.items].map(item =>
        item._id === action.payload.itemId ? {
          ...item,
          __v: action.payload.value
        } : item
      );
    },
    clearValues(state) {
      state.items = [...state.items].map(item => ({
          ...item,
          __v: 0
      }));
    }
  }
}) 
