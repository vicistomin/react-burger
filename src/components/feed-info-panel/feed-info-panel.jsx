// importing typed hooks for Redux Toolkit
import { useAppSelector } from '../../services/hooks';
import feedInfoPanelStyles from './feed-info-panel.module.css';
import { useCallback } from 'react';

const FeedInfoPanel = () => {

  const {
    orders,
    ordersTotal,
    ordersTotalToday
  } = useAppSelector(
    state => state.feed
  );

  // showing max 20 last completed or pending orders in list
  const maxDisplayedOrders = 20;

  const renderCompletedOrders = useCallback(() => {
    const completedOrders = orders.filter((order) => (
      order.status === 'done'
    ));    
    return (
      completedOrders.slice(0, maxDisplayedOrders).map((order) => (
        <li
          className='text text_type_digits-default'
          key={order._id}
        >
          {/* display order number in 6-digit format filled with zeros */}
          {order.number.toString().padStart(6, 0)}
        </li>
      ))
    )
  }, [orders]);

  const renderPreparingOrders = useCallback(() => {
    const pendingOrders = orders.filter((order) => (
      order.status === 'pending'
    ));    
    return (
      pendingOrders.slice(0, maxDisplayedOrders).map((order) => (
        <li
          className='text text_type_digits-default'
          key={order._id}
        >
          {/* display order number in 6-digit format filled with zeros */}
          {order.number.toString().padStart(6, 0)}
        </li>
      ))
    )
  }, [orders]);

  return(
    <div className={feedInfoPanelStyles.panel_container}>
      <div className={feedInfoPanelStyles.orders_list_container}>
        <div className={feedInfoPanelStyles.orders_list_column}>
          <p className='mb-6 text text_type_main-medium'>
            Готовы:
          </p>
          <ul className={feedInfoPanelStyles.orders_list_completed}>
            {renderCompletedOrders()}
          </ul>
        </div>
        <div className={feedInfoPanelStyles.orders_list_column}>
          <p className='mb-6 text text_type_main-medium'>
            В работе:
          </p>
          <ul className={feedInfoPanelStyles.orders_list_preparing}>
            {renderPreparingOrders()}
          </ul>
        </div>
      </div>
      <p className='mt-15 text text_type_main-medium'>
        Выполнено за всё время:
      </p>
      <p className='text text_type_digits-large'>
        {/* using space as a thousands separator */}
        {ordersTotal.toLocaleString()}
      </p>
      <p className='mt-15 text text_type_main-medium'>
        Выполнено за сегодня:
      </p>
      <p className='text text_type_digits-large'>
        {ordersTotalToday.toLocaleString()}
      </p>
    </div>
  );
};

export default FeedInfoPanel;
