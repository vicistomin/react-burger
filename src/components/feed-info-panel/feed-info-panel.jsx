import { useSelector } from "react-redux";
import feedInfoPanelStyles from './feed-info-panel.module.css';
import { useCallback } from 'react';

const FeedInfoPanel = () => {

  const {
    orders
  } = useSelector(
    state => state.feed
  );

  const renderCompletedOrders = useCallback(() => (
    orders.map((order) => (
     order.status === 'Выполнен' ?
      <li
        className='text text_type_digits-default'
        key={order.id}
      >
        {order.id}
      </li>
      : null
    ))
  ), [orders]);

  const renderPreparingOrders = useCallback(() => (
    orders.map((order) => (
     order.status === 'Готовится' ?
      <li
        className='text text_type_digits-default'
        key={order.id}
      >
        {order.id}
      </li>
      : null
    ))
  ), [orders]);

  // TODO: calculate qty from orders array using status and time
  const preparedOrdersCount = 28572;
  const preparedOrdersTodayCount = 138;

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
        {preparedOrdersCount.toLocaleString()}
      </p>
      <p className='mt-15 text text_type_main-medium'>
        Выполнено за сегодня:
      </p>
      <p className='text text_type_digits-large'>
        {preparedOrdersTodayCount.toLocaleString()}
      </p>
    </div>
  );
};

export default FeedInfoPanel;
