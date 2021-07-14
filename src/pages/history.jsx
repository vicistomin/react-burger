import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './history.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Sidebar from '../components/sidebar/sidebar';
import OrdersList from '../components/orders-list/orders-list';
import Loader from '../components/loader/loader';
// import slices and their functions
import { getItems } from '../services/slices/items';

export const HistoryPage = () => {
  const dispatch = useDispatch();

  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    state => state.items
  );

  // we need to have items from API in store to render ingredients icons in order card
  useEffect(() => {
    // won't call API if items are already in store
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

  return(
    <>
      <AppHeader />
        {
          itemsRequest && 
          !itemsFailed && 
          !itemsSuccess && (
            <div className={styles.loader_container}>
              <Loader />
            </div>
        )}
        <div className={styles.history_container + ' mt-30'}>
        <Sidebar />
        <div className={styles.history_orders_container}>
          {
            itemsFailed && 
            !itemsRequest && 
            !itemsSuccess && (
              <h2 className='error_message mt-30 text text_type_main-large text_color_inactive'>
                Ошибка загрузки
              </h2>
          )}
          {
            itemsSuccess && 
            !itemsFailed && 
            !itemsRequest && (
              <OrdersList 
                source='history'
              />
          )}
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
