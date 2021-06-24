import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS
} from '../actions';

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  itemsSuccess: false,
  constructorItems: {},
  currentIngredient: {},
  order: {}
}

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false,
        itemsSuccess: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
        itemsSuccess: false,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsSuccess: true,
        itemsRequest: false,
        itemsFailed: false,
        items: action.items
      };
    }
    default: {
      return state
    }
  }
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

