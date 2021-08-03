import styles from './home.module.css';
// importing components from project
import BurgerConstructor from '../components/burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import Loader from '../components/loader/loader';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { useEffect } from "react";
// import slices and their functions
import { orderSlice } from '../services/slices/order';
import { userSlice } from '../services/slices/user';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function HomePage() {
  const dispatch = useAppDispatch();
  const { closeOrderModal } = orderSlice.actions;
  const { checkAuthorization } = userSlice.actions;

  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useAppSelector(
    state => state.items
  );

  const {
    isOrderModalOpen
  } = useAppSelector(
    state => state.order
  );

    const closeModal = () => {
      dispatch(closeOrderModal());
    };

  useEffect(() => {
    // check cookies with tokens for correct order placement of authorized user
    dispatch(checkAuthorization());
  }, []);

  return (
    <>
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
              closeModal={closeModal}
              isFancyCloseIcon >
                <OrderDetails />
            </Modal>
        )}
    </>
  );
}

export default HomePage;
