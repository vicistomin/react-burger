import PropTypes from 'prop-types';
// importing typed hooks for Redux Toolkit
import { useAppSelector } from '../../services/hooks';
import orderDetailedViewStyles from './order-detailed-view.module.css';
// importing components from library
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDateTime } from '../../services/utils'

import { useCallback, useEffect, useState } from 'react';

const OrderDetailedView = ({ order, isOrderModal=false }) => {

  const {
    items
  } = useAppSelector(
    state => state.items
  );

  const [orderStatusName, setOrderStatusName] = useState('');
  const [orderStatusClass, setOrderStatusClass] = useState(null);
  
  // defining the order status text and class based on status string from server
  useEffect(() => {
    switch (order.status) {
      case 'created':
        setOrderStatusName('Создан');
        break;

      case 'pending':
        setOrderStatusName('Готовится');
        break;

      case 'done':
        setOrderStatusName('Выполнен')
        setOrderStatusClass(orderDetailedViewStyles.status_completed);
        break;

      // TODO: find out what status string server will send on error
      case 'canceled':
        setOrderStatusName('Отменён')
        setOrderStatusClass(orderDetailedViewStyles.status_canceled);
        break;

      default:
        break;
    }
  }, [order.status]);

  // parsing data and time to specific format as in Figma
  const getOrderDateTime = useCallback(() => (
    formatDateTime(order.createdAt)
  ), [order.createdAt]);

  const orderedIngredients = order.ingredients.map(item_id => (
    items.find(item => item._id === item_id)
  ));

  const orderedBun = orderedIngredients.find(item => item.type === 'bun');
  const orderedMiddleItems = orderedIngredients.filter(item => item.type !== 'bun');
    
  const renderIngredientIcons = useCallback(() => {
    let itemsToRender = orderedMiddleItems;
    // adding bun in the first place
    itemsToRender.splice(0, 0, orderedBun);

    const uniqueCountedItems = itemsToRender
      .map((item) => {
        return {count: 1, ...item}
      })
      .reduce((a, b) => {
        a[b._id] = 
          {
            ...b,
            // counting buns twice
            count: ( a[b._id] ? a[b._id].count : 0) + (b.type === 'bun' ? 2 : 1),
          }
        return a
      }, {})
 
    let renderedItems = [];
    for (let item_id in uniqueCountedItems) {
      renderedItems.push(
        <li
          className={orderDetailedViewStyles.ingredient_wrapper}
          key={uniqueCountedItems[item_id]._id}>
          <span 
            className='ingredient_icon_wrapper'
          >
            <img 
              src={uniqueCountedItems[item_id].image_mobile}
              alt={uniqueCountedItems[item_id].name}
              title={uniqueCountedItems[item_id].name}
              width='112px'
              className='ingredient_icon'
            />
          </span>
          <p className={
            orderDetailedViewStyles.ingredient_name +
            ' text text_type_main-default'
          }>
            {uniqueCountedItems[item_id].name}
          </p>
          <span className={orderDetailedViewStyles.ingredient_price}>
            <p className='text text_type_digits-default'>
              {`${uniqueCountedItems[item_id].count} x ${uniqueCountedItems[item_id].price}`}
            </p>
            <CurrencyIcon />
          </span>
        </li>
      )
    };
    return renderedItems;
  }, [orderedMiddleItems, orderedBun]);

  const calculateOrderPrice = useCallback(() => {
    const orderIngredients = order.ingredients.map(item_id => {
      let orderedItems = items.find(item => item._id === item_id)
      return ({
        price: orderedItems.price,
        type: orderedItems.type
      })
    });
    // select only 1st bun in a case when there are 2 buns in the order (there shouldn't be)
    const bunPrice = orderIngredients.find(item => item.type === 'bun').price;
    return(bunPrice * 2 + orderIngredients.reduce((acc, p) => (
      acc + (p.type !== 'bun' ? p.price : 0)), 0)
    );
  }, [items, order.ingredients]);

  return(
    <div className={orderDetailedViewStyles.order_container}>
      {!isOrderModal &&
        <p className={
          orderDetailedViewStyles.order_id +
          ' text text_type_digits-default'
        }>
        {/* display order number in 6-digit format filled with zeros */}
        {`#${order.number.toString().padStart(6, 0)}`}
      </p>
      }
      <p className={'mt-10 mb-3 text text_type_main-medium'}>
        {order.name}
      </p>
      <p className={
        `${orderStatusClass} mt-2 text text_type_main-default`
      }>
        {orderStatusName}
      </p>
      <p className={'mt-15 mb-6 text text_type_main-medium'}>
        Состав:
      </p>
      <ul className={orderDetailedViewStyles.ingredients_container + ' pr-6'}>
        {renderIngredientIcons()}
      </ul>
      <div className={orderDetailedViewStyles.order_info + ' mt-10'}>
        <p className='text text_type_main-default text_color_inactive'>
          {getOrderDateTime()}
        </p>  
        <div className={'flex_row ml-6'}>
          <p className='text text_type_digits-default'>{calculateOrderPrice()}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

OrderDetailedView.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  }).isRequired,
  isOrderModal: PropTypes.bool
};

export default OrderDetailedView;
