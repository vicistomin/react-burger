import { useEffect } from 'react';
import appStyles from './app.module.css';
// importing components from project
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from "react-redux";
// import slices and their functions
import { getItems } from '../../services/slices/items';
import { orderSlice } from '../../services/slices/order';
import { ingredientSlice } from '../../services/slices/ingredient';

function App() {
  const dispatch = useDispatch();
  const { closeOrderModal } = orderSlice.actions;
  const { closeIngredientModal } = ingredientSlice.actions;

  const { 
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

  // TODO: move API call for getting items into BurgerIngredients component
  useEffect(() => {
    dispatch(getItems())
  }, [dispatch]);

    const closeAllModals = () => {
      dispatch(closeOrderModal());
      dispatch(closeIngredientModal());
    };

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
            <div className={appStyles.container}>
              <section className={appStyles.container_left + ' mr-5'}>
                <BurgerIngredients />
              </section>
              <section className={appStyles.container_right + ' ml-5'}>
                <BurgerConstructor />
              </section>
            </div>
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
