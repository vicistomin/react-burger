import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import styles from './history-order.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Loader from '../components/loader/loader';
import OrderDetailedView from '../components/order-detailed-view/order-detailed-view';
// import slices and their functions
import { getItems } from '../services/slices/items';
import { getUser } from '../services/slices/user';

export const HistoryOrderPage = () => {
  const dispatch = useDispatch();
  
  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    state => state.items
  );
  const {
    user,
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    state => state.user
  );

  // we need to have items from API in store to render ingredients icons in order card
  useEffect(() => {
    // won't call API if items are already in store
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

  // we need to have user from API in store to render order data
  useEffect(() => {
    // won't call API if items are already in store
    if (!userSuccess) {
      dispatch(getUser());
    }
  }, [dispatch, userSuccess]);

  const currentOrderId = useParams().id;

  return(
    <>
      <AppHeader />
      {
        (itemsRequest || userRequest) && 
        (!itemsFailed || !userFailed) && 
        (!itemsSuccess || !userSuccess) && (
          <div className={styles.loader_container}>
            <Loader />
          </div>
      )}
      <div className={styles.history_order_container}>
        {
          (itemsFailed || userFailed) && 
          (!itemsRequest || !userRequest) && 
          (!itemsSuccess || !userSuccess) && (
            <h2 className='error_message mt-30 text text_type_main-large text_color_inactive'>
              Ошибка загрузки
            </h2>
        )}
        {
          (itemsSuccess && userSuccess) && 
          (!itemsFailed || !userFailed) && 
          (!itemsRequest || !userRequest) && (
            <OrderDetailedView
              order={user.orders.find((order) => order.id === currentOrderId)}
            />
        )}
      </div>
    </>
  );
}

export default HistoryOrderPage;
