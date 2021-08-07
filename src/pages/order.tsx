import { FC, useEffect, useState } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { useParams, useLocation  } from 'react-router-dom';
// importing components from project
import Loader from '../components/loader/loader';
import OrderDetailedView from '../components/order-detailed-view/order-detailed-view';
// import slices and their functions
import { feedSlice, startFeed, stopFeed } from '../services/slices/feed';
import { startHistory, stopHistory } from '../services/slices/user';
import { IOrder } from '../services/types';

export const OrderPage: FC = () => {
  const dispatch = useAppDispatch();
  // for user profile page we should open different websocket with auth token
  // useRouteMatch for some reason returning always null here
  const location = useLocation();
  const isFeedPage: boolean = location.pathname.split('/')[1] === 'feed';
  
  const {
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useAppSelector(
    state => state.items
  );
  const {
    orders,
    feedRequest,
    feedSuccess,
    feedFailed
  } = useAppSelector(
    state => state.feed
  );

  const {
    wsConnected,
    wsError
  } = useAppSelector(
    state => state.ws
  );

  const [currentOrder, setCurrentOrder] = useState<IOrder>({});

  // we need to have feed from websocket in store to render orders data
  useEffect(() => {
    // open new websocket when the page is opened
    if(isFeedPage)
      dispatch(startFeed());
    else
      dispatch(startHistory());
    return () => {
      // close the websocket when the page is closed
      if(isFeedPage)
        dispatch(stopFeed());
      else
        dispatch(stopHistory());
    };  
  }, []);

  const currentOrderId:string = useParams<{ id: string }>().id;

  useEffect(() => {
    if (!!orders && orders.length > 0 && wsConnected) {
      setCurrentOrder(orders.find(order => order._id === currentOrderId) || {})
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
