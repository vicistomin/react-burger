import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './feed.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import OrdersList from '../components/orders-list/orders-list';
import Loader from '../components/loader/loader';
// import slices and their functions
import { getItems } from '../services/slices/items';
import { getFeed } from '../services/slices/feed';

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

  // we need to have items from API in store to render ingredients icons in order card
  useEffect(() => {
    // won't call API if items are already in store
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

  // we need to have feed from API in store to render orders data
  useEffect(() => {
    // won't call API if items are already in store
    if (!feedSuccess) {
      dispatch(getFeed());
    }
  }, [dispatch, feedSuccess]);

  return(
    <>
      <AppHeader />
      {
          (itemsRequest || feedRequest) && 
          (!itemsFailed || !feedFailed) && 
          (!itemsSuccess || !feedSuccess) && (
            <Loader />
        )}
        <div className={styles.feed_container + ' mt-30'}>
        <div className={styles.feed_orders_container}>
          {
            (itemsFailed || feedFailed) && 
            (!itemsRequest || !feedRequest) && 
            (!itemsSuccess || !feedSuccess) && (
              <h2 className='ml-30 text text_type_main-large text_color_inactive'>
                Ошибка загрузки
              </h2>
          )}
          {
            (itemsSuccess && feedSuccess) && 
            (!itemsFailed || !feedFailed) && 
            (!itemsRequest || !feedRequest) && (
              <OrdersList 
                source='feed'
                orders={orders}
              />
          )}
        </div>
      </div>
    </>
  );
}

export default FeedPage;
