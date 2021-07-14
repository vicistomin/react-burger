import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import ordersCardStyles from './orders-card.module.css';
// importing components from library
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';

const OrdersCard = (props) => {
  const {
    items
  } = useSelector(
    state => state.items
  );
  
  const handleOrderClick = () => {
    // TODO: redirect to /profile/orders/:id
  }

  // TODO: parse data and time to specific format as in Figma
  const orderDateTime = new Date(props.order.time);

  const renderIngredientIcons = useCallback(() => (
     props.order.ingredients.map((item_id, index) => {
      const ingredient = items.find(item => item._id === item_id);
      return (
        <span 
          className={ordersCardStyles.ingredient_icon_wrapper}
          style={{ zIndex: 10 - index }}
        >
          <img 
            src={ingredient.image_mobile}
            alt={ingredient.name}
            title={ingredient.name}
            width='112'
            className={ordersCardStyles.ingredient_icon}
          />
        </span>
      );
    })
  ), [items]);
  

  return(
    <li
      className={ordersCardStyles.order_card} 
      onClick={handleOrderClick} 
    >
      <div className={ordersCardStyles.order_info}>
        <p className='text text_type_digits-default'>
          {`#${props.order.id}`}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          {orderDateTime.toLocaleDateString()}
        </p>
      </div>
      <p className={'mt-6 text text_type_main-medium'}>
        {props.order.type}
      </p>
      <p className={ordersCardStyles.order_status + ' mt-2 text text_type_main-default'}>
        {props.order.status}
      </p>
      <div className={ordersCardStyles.order_info + ' mt-6'}>
        <div className={ordersCardStyles.ingredient_icons_container}>
          {renderIngredientIcons()}
        </div>
        <div className={'flex_row ml-6'}>
          <p className='text text_type_digits-default'>{props.order.price}</p>
          <CurrencyIcon />
        </div>
      </div>
    </li>
  );
};

OrdersCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  }).isRequired
};

export default OrdersCard;
