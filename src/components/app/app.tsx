import React from 'react';
import './app.module.css';
// importing test data
import { testData } from '../../utils/data.js';
// importing components from project
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

function App() {
  console.log(testData);
  return (
    <>
      <AppHeader />
      <BurgerConstructor />
      <BurgerIngredients />
    </>
  );
}

export default App;
