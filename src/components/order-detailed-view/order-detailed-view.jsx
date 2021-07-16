import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import orderDetailedViewStyles from './order-detailed-view.module.css';
// importing components from library
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDateTime } from '../../services/utils'

import { useCallback } from 'react';

const OrderDetailedView = (props) => {

  const {
    items
  } = useSelector(
    state => state.items
  );

  // parsing data and time to specific format as in Figma
  const getOrderDateTime = useCallback(() => (
    formatDateTime(props.order.time)
  ), [props.order.time]);

  const renderIngredientIcons = useCallback(() => (
     props.order.ingredients.map((item_id, index) => {
      const ingredient = items.find(item => item._id === item_id);
      
      const ingredientsToShow = 5;
      if (index > ingredientsToShow) return null;

      return (
        <li key={item_id+index}>
          <span 
            className={orderDetailedViewStyles.ingredient_icon_wrapper}
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
              className={orderDetailedViewStyles.more_ingredients_icon}
            >
              <p className={
                orderDetailedViewStyles.more_icon_text +
                ' text text_type_main-default'
              }>
                +{props.order.ingredients.length - ingredientsToShow}
              </p>
              <span className={orderDetailedViewStyles.more_icon_wrapper}></span>
            </span>
          ) : null}
        </li>
      );
    })
  ), [items, props.order.ingredients]);

  return(
    <li
      className={orderDetailedViewStyles.order_card}
    >
      <div className={orderDetailedViewStyles.order_info}>
        <p className='text text_type_digits-default'>
          {`#${props.order.id}`}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          {getOrderDateTime()}
        </p>
      </div>
      <p className={'mt-6 text text_type_main-medium'}>
        {props.order.type}
      </p>
      {/* order status is displayed only on HistoryPage, not on FeedPage */}
      {props.source === 'history' ?
        <p className={
          `${props.order.status === 'Выполнен' ?
              orderDetailedViewStyles.status_completed :
              props.order.status === 'Отменён' ?
                orderDetailedViewStyles.status_canceled : ''
            } mt-2 text text_type_main-default`
        }>
          {props.order.status}
        </p>
        : null
      }
      <div className={orderDetailedViewStyles.order_info + ' mt-6'}>
        <ul className={orderDetailedViewStyles.ingredient_icons_container}>
          {renderIngredientIcons()}
        </ul>
        <div className={'flex_row ml-6'}>
          <p className='text text_type_digits-default'>{props.order.price}</p>
          <CurrencyIcon />
        </div>
      </div>
    </li>
  );
};

OrderDetailedView.propTypes = {
  source: PropTypes.string.isRequired,
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  }).isRequired
};

export default OrderDetailedView;
