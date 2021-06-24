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
import { orderSlice, placeOrder } from '../../services/slices/order';

// TODO: remove random generation of ingredients on step-2
const randomFirstIngredient = Math.floor(Math.random() * 12);
const randomLastIngredient = Math.floor(Math.random() * 6) + 1 + randomFirstIngredient;

function App() {
  const dispatch = useDispatch();
  const { closeOrderModal } = orderSlice.actions;

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

  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch]);

    const closeAllModals = () => {
      dispatch(closeOrderModal());
      setIsIngredientModalOpen(false);
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

    const openOrderModal = () => {
      const items = [bunItem._id];
      middleItems.map(item => items.push(item._id));
      // get new order ID from API:
      dispatch(placeOrder(items));
    };

    const openIngredientModal = useCallback((clickedItem) => {
      setSelectedItem(clickedItem);
      setIsIngredientModalOpen(true);
    }, []
    );

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
              orderedItems,
              onOrderButtonClick: openOrderModal,
              onIngredientClick: openIngredientModal 
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
                <IngredientDetails item={selectedItem} />
            </Modal> 
        )}
    </>
  );
}

export default App;
