import PropTypes from 'prop-types';
import ordersListStyles from './orders-list.module.css';
// importing components from project
import OrdersCard from '../orders-card/orders-card';

const OrdersList = (props) => {
  return (
    <>  
      {
        (props.orders.length > 0 ? 
        <ul className={ordersListStyles.orders_list}>
          {props.orders.map((order) => (
            <OrdersCard
              key={order._id}
              source={props.source}
              order={order}
            />
          ))}
        </ul>
      : 
        <>
          {null}
        </>
      )}
      {/* 
        TODO: show this message only after orders are fully loaded from websocket and array is empty 
        <h3 className='text text_type_main-large text_color_inactive pb-6 ml-30'>   
          Заказов нет
        </h3>)
        }
      */}
    </>
  );
};

OrdersList.propTypes = {
  source: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired
    })
  ).isRequired
};

export default OrdersList;
