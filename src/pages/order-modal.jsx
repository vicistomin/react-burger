import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
// importing components from project
import Modal from '../components/modal/modal';
import Loader from '../components/loader/loader';
import OrderDetailedView from '../components/order-detailed-view/order-detailed-view';
// import slices and their functions
import { getFeed } from '../services/slices/feed';
import { itemsSlice } from '../services/slices/items';

export const OrderModalPage = () => {
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

  const { request } = itemsSlice.actions;

  let history = useHistory();

  // we need to have feed from API in store to render order data
  useEffect(() => {
    // won't call API if items are already in store
    if (!feedSuccess) {
      dispatch(getFeed());
    }
  }, [dispatch, feedSuccess]);

  const currentOrderId = useParams().id;

  const replaceState = useCallback(() => {
    // hiding the content on page before the reload starts
    dispatch(request())
    // remove the background element to show ingredient page instead of a modal
    history.replace({ 
      ...history.location,
      state: { background: undefined }
  });
  }, [history]);

  // return to parent page if modal is closed
  const closeModal = () => {
    history.replace({
      pathname: history.location.state.background.pathname
    });
  }

  // handle state cleaning in case of page refresh
  useEffect(() => {
    window.addEventListener("beforeunload", replaceState);
    return () => {
      window.removeEventListener("beforeunload", replaceState);
    };
  }, []);

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
          <Modal
            header={`#${currentOrderId}`}
            isOrderModal={true}
            closeModal={closeModal} >
            <OrderDetailedView
              order={orders.find((order) => order.id === currentOrderId)}
              isOrderModal={true}
            />
          </Modal> 
        )}
    </>
  );
}

export default OrderModalPage;
