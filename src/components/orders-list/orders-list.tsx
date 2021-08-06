import { FC } from 'react';
import PropTypes from 'prop-types';
import ordersListStyles from './orders-list.module.css';
// importing components from project
import OrdersCard from '../orders-card/orders-card';
import { IOrder } from '../../services/types';

interface IOrdersListProps {
  orders: Array<IOrder>,
  source: string
}

const OrdersList: FC<IOrdersListProps> = ({ orders, source }) => {
  return (
    <>  
      {
        (orders.length > 0) && 
        <ul className={ordersListStyles.orders_list}>
          {orders.map((order) => (
            <OrdersCard
              key={order._id}
              source={source}
              order={order}
            />
          ))}
        </ul>
      }
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

/*
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
*/

export default OrdersList;
