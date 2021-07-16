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
      
      // TODO: implement calculation of ingredients quantity 
      const itemQty = ingredient.type === 'bun' ? 2 : 1;

      return (
        <li
          className={orderDetailedViewStyles.ingredient_wrapper}
          key={item_id+index}>
          <span 
            className='ingredient_icon_wrapper'
          >
            <img 
              src={ingredient.image_mobile}
              alt={ingredient.name}
              title={ingredient.name}
              width='112px'
              className='ingredient_icon'
            />
          </span>
          <p className={
            orderDetailedViewStyles.ingredient_name +
            ' text text_type_main-default'
          }>
            {ingredient.name}
          </p>
          <span className={orderDetailedViewStyles.ingredient_price}>
            <p className='text text_type_digits-default'>
              {`${itemQty} x ${ingredient.price}`}
            </p>
            <CurrencyIcon />
          </span>
        </li>
      );
    })
  ), [items, props.order.ingredients]);

  return(
    <div className={orderDetailedViewStyles.order_container}>
      <p className={
        orderDetailedViewStyles.order_id +
        ' text text_type_digits-default'
      }>
        {`#${props.order.id}`}
      </p>
      <p className={'mt-10 mb-3 text text_type_main-medium'}>
        {props.order.type}
      </p>
      <p className={
        `${props.order.status === 'Выполнен' ?
            orderDetailedViewStyles.status_completed :
            props.order.status === 'Отменён' ?
              orderDetailedViewStyles.status_canceled : ''
          } text text_type_main-default`
      }>
        {props.order.status}
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
          <p className='text text_type_digits-default'>{props.order.price}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

OrderDetailedView.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  }).isRequired
};

export default OrderDetailedView;
