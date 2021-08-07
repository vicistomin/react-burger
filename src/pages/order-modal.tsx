import { useEffect, useCallback } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { useParams, useHistory } from 'react-router-dom';
// importing components from project
import Modal from '../components/modal/modal';
import Loader from '../components/loader/loader';
import OrderDetailedView from '../components/order-detailed-view/order-detailed-view';
// import slices and their functions
import { feedSlice } from '../services/slices/feed';
import { itemsSlice } from '../services/slices/items';

export const OrderModalPage = () => {
  const dispatch = useAppDispatch();
  
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

  const { request } = itemsSlice.actions;

  let history = useHistory();

  useEffect(() => {
    if (wsConnected)
      dispatch(feedSlice.actions.success());
    else if (wsError)
      dispatch(feedSlice.actions.failed());
    else 
      dispatch(feedSlice.actions.request());
  }, [wsConnected, wsError]);

  const currentOrderId = useParams().id;
  const currentOrder = orders.find(order => order._id === currentOrderId);

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
            header={`#${currentOrder.number.toString().padStart(6, 0)}`}
            isOrderModal={true}
            closeModal={closeModal} >
            <OrderDetailedView
              order={currentOrder}
              isOrderModal={true}
            />
          </Modal> 
        )}
    </>
  );
}

export default OrderModalPage;