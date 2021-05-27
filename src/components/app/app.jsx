// import React from 'react';
import appStyles from './app.module.css';
// importing test data
import { testData } from '../../utils/data.js';
// importing components from project
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <>
      <AppHeader />
      <div className={appStyles.container}>
        <section className={appStyles.container_left + ' mr-5'}>
          <BurgerIngredients items={testData}/>
        </section>
        <section className={appStyles.container_right + ' ml-5'}>
          <BurgerConstructor />
        </section>
      </div>
    </>
  );
}

export default App;
