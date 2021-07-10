import { useEffect } from 'react';
import styles from './home.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import BurgerConstructor from '../components/burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Loader from '../components/loader/loader';
import { useSelector, useDispatch } from "react-redux";
// import slices and their functions
import { getItems } from '../services/slices/items';
import { orderSlice } from '../services/slices/order';
import { ingredientSlice } from '../services/slices/ingredient';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function HomePage() {
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
    // won't call API if items are already in store
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

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
            <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
              Ошибка загрузки
            </h2>
        )}
        {
          itemsRequest && 
          !itemsFailed && 
          !itemsSuccess && (
            <Loader />
        )}
        {
          itemsSuccess && 
          !itemsFailed && 
          !itemsRequest && (
            <div className={styles.container}>
              <DndProvider backend={HTML5Backend}>
                <section className={styles.container_left + ' mr-5'}>
                  <BurgerIngredients />
                </section>
                <section className={styles.container_right + ' ml-5'}>
                  <BurgerConstructor />
                </section>
              </DndProvider>
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

export default HomePage;
