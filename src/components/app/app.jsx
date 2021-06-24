import { useState, useEffect, useCallback } from 'react';
import appStyles from './app.module.css';
// importing components from project
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgerContext } from '../../utils/burger-context';
import { useSelector, useDispatch } from "react-redux";
// import slices and their functions
import { getItems } from '../../services/slices/items';
import { orderSlice } from '../../services/slices/order';
import { ingredientSlice } from '../../services/slices/ingredient';

// TODO: remove random generation of ingredients on step-2
const randomFirstIngredient = Math.floor(Math.random() * 12);
const randomLastIngredient = Math.floor(Math.random() * 6) + 1 + randomFirstIngredient;

function App() {
  const dispatch = useDispatch();
  const { closeOrderModal } = orderSlice.actions;
  const { closeIngredientModal } = ingredientSlice.actions;

  const { 
    items,
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    state => state.items
  );

  const { 
    orderData,
    isOrderModalOpen
  } = useSelector(
    state => state.order
  );

  const { 
    selectedIngredient,
    isIngredientModalOpen
  } = useSelector(
    state => state.ingredient
  );

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch]);

    const closeAllModals = () => {
      dispatch(closeOrderModal());
      dispatch(closeIngredientModal());
    };

    // TODO: implement interactive selection of buns (top/bottom)
    // !!! Buns can be only be of one type
    // (user can't choose different buns for top and bottom)

    // define hardcoded arrays of ingredients from the data from API:
    const bunItem = items.filter(item => item.type === 'bun')[0];
    const middleItems = items.filter(item => 
      (item.type === 'sauce' || item.type === 'main')).slice(randomFirstIngredient, randomLastIngredient);
    const orderedItems = {
      bunItem,
      middleItems
    }

  return (
    <>
      <AppHeader />
        {
          itemsFailed && 
          !itemsRequest && 
          !itemsSuccess && (
            <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
              Ошибка загрузки
            </h2>
        )}
        {
          itemsRequest && 
          !itemsFailed && 
          !itemsSuccess && (
            <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
              Загрузка...
            </h2>
        )}
        {
          itemsSuccess && 
          !itemsFailed && 
          !itemsRequest && (
            <BurgerContext.Provider value={{ 
              items: items,
              orderedItems 
            }}>
              <div className={appStyles.container}>
                <section className={appStyles.container_left + ' mr-5'}>
                  <BurgerIngredients />
                </section>
                <section className={appStyles.container_right + ' ml-5'}>
                  <BurgerConstructor />
                </section>
              </div>
            </BurgerContext.Provider>
        )}
        {
          isOrderModalOpen && (
            <Modal 
              header={null}
              closeModal={closeAllModals}
              isFancyCloseIcon >
                <OrderDetails orderData={orderData} />
            </Modal>
        )}
        {
          isIngredientModalOpen && (
            <Modal 
              header='Детали ингредиента'
              closeModal={closeAllModals} >
                <IngredientDetails item={selectedIngredient} />
            </Modal> 
        )}
    </>
  );
}

export default App;
