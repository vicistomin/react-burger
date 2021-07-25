import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// importing components from project
import Loader from '../components/loader/loader';
import OrderDetailedView from '../components/order-detailed-view/order-detailed-view';
// import slices and their functions
import { feedSlice, startFeed, stopFeed } from '../services/slices/feed';

export const OrderPage = () => {
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

  const {
    wsConnected,
    wsError
  } = useSelector(
    state => state.ws
  );

    const [currentOrder, setCurrentOrder] = useState({});

  // we need to have feed from websocket in store to render orders data
  useEffect(() => {
    // open new websocket when the page is opened
    dispatch(startFeed());
    return () => {
      // close the websocket when the page is closed
      dispatch(stopFeed());
    };  
  }, []);

  const currentOrderId = useParams().id;

  useEffect(() => {
    if (orders.length > 0 && wsConnected) {
      setCurrentOrder(orders.find(order => order._id === currentOrderId))
      dispatch(feedSlice.actions.success());
    }
    else if (wsError)
      dispatch(feedSlice.actions.failed());
    else 
      dispatch(feedSlice.actions.request());
  }, [wsConnected, orders, wsError]);

  return(
    <>
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
        (itemsSuccess && feedSuccess ) &&
        (currentOrder !== {}) &&
        (!itemsFailed || !feedFailed) && 
        (!itemsRequest || !feedRequest) && (
          <div className='fullscreen_message'>
            <OrderDetailedView
              order={currentOrder}
            />
          </div>
        )}
    </>
  );
}

export default OrderPage;
