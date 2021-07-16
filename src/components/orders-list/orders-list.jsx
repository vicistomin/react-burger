import PropTypes from 'prop-types';
import ordersListStyles from './orders-list.module.css';
// importing components from project
import OrdersCard from '../orders-card/orders-card';
import { fakeUserData } from "../../services/user-data";
import { fakeFeedData } from "../../services/feed-data";

const OrdersList = (props) => {
// TODO: replace orders data source to slices
const { orders } = (props.source === 'feed' ? fakeFeedData : fakeUserData)

  return (
    <>  
      {(orders.length > 0 ? 
        <ul className={ordersListStyles.orders_list}>
          {orders.map((order) => (
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
    source: PropTypes.string.isRequired
};

export default OrdersList;
