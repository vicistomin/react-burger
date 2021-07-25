import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './history.module.css';
// importing components from project
import Sidebar from '../components/sidebar/sidebar';
import OrdersList from '../components/orders-list/orders-list';
import Loader from '../components/loader/loader';
// import slices and their functions
import { getUser, userSlice, startHistory, stopHistory } from '../services/slices/user';

export const HistoryPage = () => {
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

  const {
    resetStatus
  } = userSlice.actions;

  const {
    wsConnected,
    wsError
  } = useSelector(
    state => state.ws
  );

  useEffect(() => {
    // reset errors on page load
    dispatch(resetStatus());

    // open new websocket when the page is opened
    dispatch(startHistory());

    // we need to have user from API in store to find user orders
    // won't call API if user data is already in process
    if (!userSuccess && !userRequest) {
      dispatch(getUser());
    }
    return () => {
      // close the websocket when the page is closed
      dispatch(stopHistory());
    };  
  }, []);

  useEffect(() => {
    if (wsConnected)
      dispatch(userSlice.actions.success());
    else if (wsError)
      dispatch(userSlice.actions.failed());
  }, [wsConnected]);

  return(
    <>
        {
          (itemsRequest || userRequest) && 
          (!itemsFailed || !userFailed) && 
          (!itemsSuccess || !userSuccess) && (
            <Loader />
        )}
        <div className={styles.history_container + ' mt-30'}>
        <Sidebar />
        <div className={styles.history_orders_container}>
          {
            (itemsFailed || userFailed) && 
            (!itemsRequest || !userRequest) && 
            (!itemsSuccess || !userSuccess) && (
              <h2 className='ml-30 text text_type_main-large text_color_inactive'>
                Ошибка загрузки
              </h2>
          )}
          {
            (itemsSuccess && userSuccess) && 
            (!itemsFailed || !userFailed) && 
            (!itemsRequest || !userRequest) && (
              <OrdersList 
                source='history'
                orders={user.orders}
              />
          )}
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
