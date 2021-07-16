import PropTypes from 'prop-types';
import ordersListStyles from './orders-list.module.css';
// importing components from project
import OrdersCard from '../orders-card/orders-card';

const OrdersList = (props) => {
  return (
    <>  
      {(props.orders.length > 0 ? 
        <ul className={ordersListStyles.orders_list}>
          {props.orders.map((order) => (
            <OrdersCard
              key={order.id}
              source={props.source}
              order={order}
            />
          ))}
        </ul>
      : <h3 className='text text_type_main-default text_color_inactive pb-6'>
          Заказов нет
        </h3>)}
    </>
  );
};

OrdersList.propTypes = {
  source: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      ingredients: PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired
    })
  ).isRequired
};

export default OrdersList;
