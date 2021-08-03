import PropTypes from 'prop-types';
// importing typed hooks for Redux Toolkit
import { useAppSelector } from '../../services/hooks';
import ordersCardStyles from './orders-card.module.css';
// importing components from library
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDateTime } from '../../services/utils'

import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState, memo } from 'react';

const OrdersCard = (props) => {
  const history = useHistory();

  const {
    items
  } = useAppSelector(
    state => state.items
  );

  const [orderStatusName, setOrderStatusName] = useState('');
  const [orderStatusClass, setOrderStatusClass] = useState(null);
  
  // defining the order status text and class based on status string from server
  useEffect(() => {
    switch (props.order.status) {
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
  }, [props.order.status]);

  const handleOrderClick = () => {
    const currentUrl = history.location.pathname;
    history.replace({ 
      pathname: `${currentUrl}/${props.order._id}`,
      state: { background: history.location }
    });
  }

  // parsing data and time to specific format as in Figma
  const getOrderDateTime = useCallback(() => (
    formatDateTime(props.order.createdAt)
  ), [props.order.createdAt]);

  const orderedIngredients = props.order.ingredients.map(item_id => (
    items.find(item => item._id === item_id)
  ));

  // skip if there empty or other falsy result instead of ingredient id
  const filteredOrderedIngredients = orderedIngredients.filter(item => item);

  const orderedBun = filteredOrderedIngredients.find(item => item.type === 'bun');
  const orderedMiddleItems = filteredOrderedIngredients.filter(item => item.type !== 'bun');

  const renderIngredientIcons = useCallback(() => {
    let itemsToRender = orderedMiddleItems;
    // adding bun in the first place
    itemsToRender.splice(0, 0, orderedBun);

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
                +{itemsToRender.length - ingredientsToShow}
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
    orderedBun && orderedBun.price ? 
      (
        // select only 1st bun in a case when there are 2 buns in the order (there shouldn't be)
        orderedBun.price + orderedMiddleItems.reduce((acc, p) => (acc + p.price), 0)
      ) : ( 0 )
  ), [orderedBun, orderedMiddleItems]);

  return(
    // skip if there is no bun
    (!!orderedBun && !!orderedBun._id) &&
    <li
      className={ordersCardStyles.order_card} 
      onClick={handleOrderClick}
    >
      <div className={ordersCardStyles.order_info}>
        <p className='text text_type_digits-default'>
          {/* display order number in 6-digit format filled with zeros */}
          {`#${props.order.number.toString().padStart(6, 0)}`}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          {getOrderDateTime()}
        </p>
      </div>
      <p className={'mt-6 text text_type_main-medium'}>
        {props.order.name}
      </p>
      {/* order status is displayed only on HistoryPage, not on FeedPage */}
      {props.source === 'history' ?
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
          <CurrencyIcon />
        </div>
      </div>
    </li>
  );
};

OrdersCard.propTypes = {
  source: PropTypes.string.isRequired,
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
  }).isRequired
};

// comparing updateAt field from server and from props
// to check whether the order data was changed
const compareOrders = (prevProps, nextProps) => {
  return prevProps.order.updatedAt !== nextProps.order.updatedAt;
}

// memoizing component to avoid unnecessary renders
export default memo(OrdersCard, compareOrders);
