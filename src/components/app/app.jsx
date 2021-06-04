import { useState, useEffect, useMemo, useCallback } from 'react';
import appStyles from './app.module.css';
// importing components from project
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [state, setState] = useState({
    data: [],
    loading: true,
    success: false
  });
  

  useEffect(() => {
    // getting data from API
    const getData = () => {
      setState({...state, loading: true, success: false})
      return fetch(API_URL)
        .then(res => res.ok ? res.json() : setState({ ...state, loading: false, success: false }))
        .then(data => setState({ data: data.data, loading: false, success: true }))
        .catch(error => setState({ ...state, loading: false, success: false }))
    }

    getData();
    return () => {
    //   TODO: additional cleanup?
        setState({...state, loading: true, success: false})
    };
  }, []);

    const [showOrderModal, toggleOrderModal] = useState(false)
    const [showIngredientModal, toggleIngredientModal] = useState(false)

    const closeModal = () => {
      // TODO: different funcs/conditions for different modals?
      toggleOrderModal(false);
      toggleIngredientModal(false);
    };

    const openOrderModal = () => {
      toggleOrderModal(true);
    };

    // TODO: replace hardcoded values
    const [orderId, setOrderId] = useState('034536');

    // TODO: decide what's better in this case - useMemo, useCallback or just plain function?
    const orderModal = useMemo(() => {
    return (
      <Modal 
        header={null}
        closeModal={closeModal}
        fancyCloseIcon>
          <OrderDetails orderId={orderId}  />
      </Modal>
      )}, [orderId]
      );

    const [selectedItem, setSelectedItem] = useState([]);

    // is useCallback needed here?
    const openIngredientModal = useCallback((clickedItem) => {
      toggleIngredientModal(true);
      setSelectedItem(state.data.filter(item => (item._id === clickedItem))[0]);
    }, [state.data]
    );

    const ingredientModal = useMemo(() => {
      return (
      <Modal 
        header='Детали ингредиента'
        closeModal={closeModal}>
          <IngredientDetails 
            // TODO: Get data from clicked item!
            item={selectedItem}
          />
      </Modal>  
      )}, [selectedItem]
    );

    // TODO: implement interactive selection of buns (top/bottom)
    // !!! Buns can be only be of one type
    // (user can't choose different buns for top and bottom)

    // define hardcoded arrays of ingredients from the data from API:
    const bunType = state.data.filter(item => item.type === 'bun')[0];
    const middleItems = state.data.filter(item => (item.type === 'sauce' || item.type === 'main')).slice(4, 12);
    
  return (
    <>
      <AppHeader />
      {( !state.loading && state.success ?
        <div className={appStyles.container}>
          <section className={appStyles.container_left + ' mr-5'}>
            <BurgerIngredients items={state.data} openModal={openIngredientModal} />
          </section>
          <section className={appStyles.container_right + ' ml-5'}>
            <BurgerConstructor bunType={bunType} middleItems={middleItems} openModal={openOrderModal} />
          </section>
        </div>
      : (state.loading && !state.success ?
        <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
          Загрузка...</h2>
        :
          <h2 className={appStyles.fullscreen_message + ' text text_type_main-large text_color_inactive'}>
            Ошибка загрузки</h2>
      )
      )}
        {showOrderModal && orderModal}
        {showIngredientModal && ingredientModal}
    </>
  );
}

export default App;
