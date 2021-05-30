// import React from 'react';
import appStyles from './app.module.css';
// importing test data
import { testData } from '../../utils/data.js';
// importing components from project
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

// define arrays of ingredients from the test data:
const topItem = testData[0];
const middleItems = testData.slice(4, 12);
const bottomItem = testData[0];

function App() {
  return (
    <>
      <AppHeader />
      <div className={appStyles.container}>
        <section className={appStyles.container_left + ' mr-5'}>
          <BurgerIngredients items={testData}/>
        </section>
        <section className={appStyles.container_right + ' ml-5'}>
          <BurgerConstructor topItem={topItem} middleItems={middleItems} bottomItem={bottomItem} />
        </section>
      </div>
    </>
  );
}

export default App;
