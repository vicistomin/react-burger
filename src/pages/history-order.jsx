import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Loader from '../components/loader/loader';
import OrderDetailedView from '../components/order-detailed-view/order-detailed-view';
// import slices and their functions
import { getItems } from '../services/slices/items';
import { getFeed } from '../services/slices/feed';

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
    orders,
    feedRequest,
    feedSuccess,
    feedFailed
  } = useSelector(
    state => state.feed
  );

  // we need to have items from API in store to render ingredients icons in order card
  useEffect(() => {
    // won't call API if items are already in store
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

  // we need to have feed from API in store to render order data
  useEffect(() => {
    // won't call API if items are already in store
    if (!feedSuccess) {
      dispatch(getFeed());
    }
  }, [dispatch, feedSuccess]);

  const currentOrderId = useParams().id;

  return(
    <>
      <AppHeader />
      {
        (itemsRequest || feedRequest) && 
        (!itemsFailed || !feedFailed) && 
        (!itemsSuccess || !feedSuccess) && (
          <Loader />
      )}
      {
        (itemsFailed || feedFailed) && 
        (!itemsRequest || !feedRequest) && 
        (!itemsSuccess || !feedSuccess) && (
          <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
            Ошибка загрузки
          </h2>
      )}
      {
        (itemsSuccess && feedSuccess) && 
        (!itemsFailed || !feedFailed) && 
        (!itemsRequest || !feedRequest) && (
          <div className='fullscreen_message'>
            <OrderDetailedView
              order={orders.find((order) => order.id === currentOrderId)}
            />
          </div>
        )}
    </>
  );
}

export default HistoryOrderPage;
