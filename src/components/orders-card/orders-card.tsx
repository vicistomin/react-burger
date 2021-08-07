// importing typed hooks for Redux Toolkit
import { useAppSelector } from '../../services/hooks';
import ordersCardStyles from './orders-card.module.css';
// importing components from library
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDateTime } from '../../services/utils'

import { useHistory } from 'react-router-dom';
import { FC, useCallback, useEffect, useState, memo } from 'react';
import { IOrder } from '../../services/types';

interface IOrdersCardProps {
  order: IOrder,
  source: string
}

const OrdersCard: FC<IOrdersCardProps> = ({ order, source }) => {
  const history = useHistory();

  const {
    items
  } = useAppSelector(
    state => state.items
  );

  const [orderStatusName, setOrderStatusName] = useState<string>('');
  const [orderStatusClass, setOrderStatusClass] = useState<string>('');
  
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
        setOrderStatusClass(ordersCardStyles.status_completed);
        break;

      // TODO: find out what status string server will send on error
      case 'canceled':
        setOrderStatusName('Отменён')
        setOrderStatusClass(ordersCardStyles.status_canceled);
        break;

      default:
        break;
    }
  }, [order.status]);

  const handleOrderClick = () => {
    const currentUrl = history.location.pathname;
    history.replace({ 
      pathname: `${currentUrl}/${order._id}`,
      state: { background: history.location }
    });
  }

  // parsing data and time to specific format as in Figma
  const getOrderDateTime = useCallback(() => (
    order.createdAt && formatDateTime(order.createdAt)
  ), [order.createdAt]);

  const orderedIngredients = order.ingredients &&
    order.ingredients.map(item_id => (
      items.find(item => item._id === item_id)
  ));

  // skip if there empty or other falsy result instead of ingredient id
  const filteredOrderedIngredients = orderedIngredients &&
    orderedIngredients.filter(item => item);

  const orderedBun = filteredOrderedIngredients &&
    filteredOrderedIngredients.find(item => 
      item && item.type === 'bun');
  const orderedMiddleItems = filteredOrderedIngredients &&
    filteredOrderedIngredients.filter(item => 
      item && item.type !== 'bun');

  const renderIngredientIcons = useCallback(() => {
    let itemsToRender = orderedMiddleItems;
    // adding bun in the first place
    itemsToRender && itemsToRender.splice(0, 0, orderedBun);

    if (!!itemsToRender)
    return itemsToRender.map((ingredient, index) => {
      const ingredientsToShow = 5;
      if (index > ingredientsToShow) return null;

      return (
        // skip if there is no bun or other invalid ingredient
        (ingredient && ingredient._id) &&
        <li key={ingredient._id+index}>
          <span 
            className={ordersCardStyles.ingredient_icon_wrapper}
            style={{ zIndex: 10 - index }}
          >
            <img 
              src={ingredient.image_mobile}
              alt={ingredient.name}
              title={ingredient.name}
              width='112px'
              className='ingredient_icon'
            />
          </span>
          {index === ingredientsToShow ? (
            <span
              className={ordersCardStyles.more_ingredients_icon}
            >
              <p className={
                ordersCardStyles.more_icon_text +
                ' text text_type_main-default'
              }>
                {!!itemsToRender && !!itemsToRender.length
                  ? `+${itemsToRender.length - ingredientsToShow}`
                  : null
                }
              </p>
              <span className={ordersCardStyles.more_icon_wrapper}></span>
            </span>
          ) : null}
        </li>
      );
    })
  }, [orderedMiddleItems, orderedBun]);

  const calculateOrderPrice = useCallback(() => (
    // skip if there is no bun
    orderedBun && orderedBun.price && orderedMiddleItems ? 
      (
        // select only 1st bun in a case when there are 2 buns in the order (there shouldn't be)
        orderedBun.price + orderedMiddleItems.reduce((acc, p) =>
          !!p ? (acc + (p.price || 0)) : 0, 0)
      ) : ( 0 )
  ), [orderedBun, orderedMiddleItems]);

  return (
    // skip if there is no bun
    (!!orderedBun && !!orderedBun._id) ?
      <li
        className={ordersCardStyles.order_card} 
        onClick={handleOrderClick}
      >
        <div className={ordersCardStyles.order_info}>
          <p className='text text_type_digits-default'>
            {/* display order number in 6-digit format filled with zeros */}
            {typeof order.number === 'number'
              ? `#${order.number.toString().padStart(6, '0')}`
              : null
            }
          </p>
          <p className='text text_type_main-default text_color_inactive'>
            {getOrderDateTime()}
          </p>
        </div>
        <p className={'mt-6 text text_type_main-medium'}>
          {order.name}
        </p>
        {/* order status is displayed only on HistoryPage, not on FeedPage */}
        {source === 'history' ?
          <p className={
            `${orderStatusClass} mt-2 text text_type_main-default`
          }>
            {orderStatusName}
          </p>
          : null
        }
        <div className={ordersCardStyles.order_info + ' mt-6'}>
          <ul className={ordersCardStyles.ingredient_icons_container}>
            {renderIngredientIcons()}
          </ul>
          <div className={'flex_row ml-6'}>
            <p className='text text_type_digits-default'>{calculateOrderPrice()}</p>
            <CurrencyIcon type='primary'/>
          </div>
        </div>
      </li>
    : null
  );
};

// comparing updateAt field from server and from props
// to check whether the order data was changed
const compareOrders = (
  prevProps: IOrdersCardProps,
  nextProps: IOrdersCardProps
) => {
  if (prevProps.order)
    return prevProps.order.updatedAt !== nextProps.order.updatedAt;
  else
    return false
}

// memoizing component to avoid unnecessary renders
export default memo(OrdersCard, compareOrders);
