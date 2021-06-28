import { createSlice } from '@reduxjs/toolkit'

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: {
    selectedIngredient: {},
    isIngredientModalOpen: false
  },
  reducers: {
    openIngredientModal(state, action) {
      state.isIngredientModalOpen = true;
      state.selectedIngredient = action.payload;
    },
    closeIngredientModal(state) {
      state.isIngredientModalOpen = false;
      state.selectedIngredient = {};
    }
  }
}) 
