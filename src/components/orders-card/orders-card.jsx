import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import ordersCardStyles from './orders-card.module.css';
// importing components from library
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

const OrdersCard = (props) => {
  const history = useHistory();

  const {
    items
  } = useSelector(
    state => state.items
  );
  
  const handleOrderClick = () => {
    // TODO: redirect to /profile/orders/:id
    history.replace({ pathname: '/profile/orders/'+props.order.id });
  }

  // TODO: parse data and time to specific format as in Figma
  const getOrderDateTime = useCallback(() => {
    const dateTime = new Date(props.order.time);
    const today = new Date(Date.now()).getDate();
    const daysFromToday = today - dateTime.getDate();

    const getPluralDayForm = (n) => (
      (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ?
        'дня' : 'дней'
    );
    
    const day = (
      daysFromToday === 0 ?
        'Сегодня' :
        daysFromToday === 1 ?
          'Вчера' : 
          `${daysFromToday} ${getPluralDayForm(daysFromToday)} назад`
    );
    const hours = dateTime.getHours();
    const mins = dateTime.getMinutes();
    const timeZone = new Intl.NumberFormat("ru-RU", {
      // always display the plus sign
      signDisplay: "exceptZero"
    }).format(
      0 - dateTime.getTimezoneOffset() / 60
    );

    return (`${day}, ${hours}:${mins} i-GMT${timeZone}`);
  }, [props.order.time]);

  const renderIngredientIcons = useCallback(() => (
     props.order.ingredients.map((item_id, index) => {
      const ingredient = items.find(item => item._id === item_id);
      
      const ingredientsToShow = 5;
      if (index > ingredientsToShow) return null;

      return (
        <li key={item_id+index}>
          <span 
            className={ordersCardStyles.ingredient_icon_wrapper}
            style={{ zIndex: 10 - index }}
          >
            <img 
              src={ingredient.image_mobile}
              alt={ingredient.name}
              title={ingredient.name}
              width='112px'
              className={ordersCardStyles.ingredient_icon}
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
                +{props.order.ingredients.length - ingredientsToShow}
              </p>
              <span className={ordersCardStyles.more_icon_wrapper}></span>
            </span>
          ) : null}
        </li>
      );
    })
  ), [items, props.order.ingredients]);

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
              ordersCardStyles.status_completed :
              props.order.status === 'Отменён' ?
                ordersCardStyles.status_canceled : ''
            } mt-2 text text_type_main-default`
        }>
          {props.order.status}
        </p>
        : null
      }
      <div className={ordersCardStyles.order_info + ' mt-6'}>
        <ul className={ordersCardStyles.ingredient_icons_container}>
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

OrdersCard.propTypes = {
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

export default OrdersCard;
