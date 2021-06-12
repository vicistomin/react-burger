import { useState, useEffect, useCallback } from 'react';
import appStyles from './app.module.css';
// importing components from project
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ConstructorDataContext, OrderContext } from '../../utils/constructorContext';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [ingredientsData, setIngredientsData] = useState({
    items: [],
    // TODO: perhaps these 3 boolean loading state vars should be rewritten to 1 var with current loading state
    // e.g. loadingState = 'loading' || 'error' || 'success'
    // after all, in this case only one boolean at a time can have 'true' value
    isLoading: false,
    hasLoaded: false,
    hasError: false
  });
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

  // TODO: replace hardcoded values
  const [orderId, setOrderId] = useState('034536');

  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    // getting data from API
    const getIngredientsData = () => {
      setIngredientsData({...ingredientsData, isLoading: true, hasError: false, hasLoaded: false})
      return fetch(API_URL)
        .then(res => {
          if (!res.ok) {
            // we don't need to set state vars here as we will do that in catch
            res.reject(res.statusText);

            // as an option we may throw an Error directly instead of reject:
            // throw Error(res.statusText);
            }
          return res.json();
          })
        // it's a better way to destructurize the data object from API:
        .then(({data}) => {
          setIngredientsData({ ...ingredientsData, items: data, isLoading: false, hasLoaded: true, hasError: false })
        })
        .catch((error) => {
          console.log(error);
          setIngredientsData({ ...ingredientsData, isLoading: false, hasError: true, hasLoaded: false })
    })}
    getIngredientsData();
  }, []);

    const closeAllModals = () => {
      setIsOrderModalOpen(false);
      setIsIngredientModalOpen(false);
    };

    const openOrderModal = () => {
      setIsOrderModalOpen(true);
    };

    const openIngredientModal = useCallback((clickedItem) => {
      setSelectedItem(clickedItem);
      setIsIngredientModalOpen(true);
    }, []
    );

    // TODO: implement interactive selection of buns (top/bottom)
    // !!! Buns can be only be of one type
    // (user can't choose different buns for top and bottom)

    // define hardcoded arrays of ingredients from the data from API:
    const bunItem = ingredientsData.items.filter(item => item.type === 'bun')[0];
    const middleItems = ingredientsData.items.filter(item => (item.type === 'sauce' || item.type === 'main')).slice(4, 12);
    
  return (
    <>
      <AppHeader />
        {
          ingredientsData.hasError && 
          !ingredientsData.isLoading && 
          !ingredientsData.hasLoaded && (
            <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
              Ошибка загрузки
            </h2>
        )}
        {
          ingredientsData.isLoading && 
          !ingredientsData.hasError && 
          !ingredientsData.hasLoaded && (
            <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
              Загрузка...
            </h2>
        )}
        {
          ingredientsData.hasLoaded && 
          !ingredientsData.hasError && 
          !ingredientsData.isLoading && (
            <div className={appStyles.container}>
              <section className={appStyles.container_left + ' mr-5'}>
                <BurgerIngredients items={ingredientsData.items} onIngredientClick={openIngredientModal} />
              </section>
              <section className={appStyles.container_right + ' ml-5'}>
                <ConstructorDataContext.Provider value={{ bunItem, middleItems, onOrderButtonClick: openOrderModal }}>
                  <BurgerConstructor />
                </ConstructorDataContext.Provider>
              </section>
            </div>
        )}
        {
          isOrderModalOpen && (
            <Modal 
              header={null}
              closeModal={closeAllModals}
              isFancyCloseIcon >
              <OrderContext.Provider value={{ orderId }}>
                <OrderDetails />
              </OrderContext.Provider>
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
