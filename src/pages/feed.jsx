import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './feed.module.css';
// importing components from project
import OrdersList from '../components/orders-list/orders-list';
import FeedInfoPanel from '../components/feed-info-panel/feed-info-panel';
import Loader from '../components/loader/loader';
// import slices and their functions
import { getFeed } from '../services/slices/feed';
import { wsSlice } from '../services/slices/websocket';
import { ALL_ORDERS_WS_URL } from '../services/constants';

export const FeedPage = () => {
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
    wsConnectionStart
  } = wsSlice.actions;

  useEffect(() => {
    dispatch(wsConnectionStart({ url: ALL_ORDERS_WS_URL }));
  }, [dispatch]);


  // we need to have feed from websocket in store to render orders data
  useEffect(() => {
    // won't set new websocket if items are already in store
    if (!feedSuccess) {
      dispatch(getFeed());
    }
  }, [dispatch, feedSuccess]);

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
        (itemsSuccess && feedSuccess) && 
        (!itemsFailed || !feedFailed) && 
        (!itemsRequest || !feedRequest) && (
          <>
            <h1 className={
              styles.feed_title +
              ' mt-10 mb-5 text text_type_main-large text_color_default'
            }>
                Лента заказов
            </h1>
            <div className={styles.feed_container}>
              <div className={styles.feed_orders_container}>
                <OrdersList 
                  source='feed'
                  orders={orders}
                />
              </div>
              <div className={styles.feed_info_container}>
                 <FeedInfoPanel />
              </div>
            </div>
          </>
      )}
    </>
  );
}

export default FeedPage;
