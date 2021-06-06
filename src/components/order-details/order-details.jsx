import PropTypes from 'prop-types';
import orderDetailsStyles from './order-details.module.css';
import orderAcceptedImage from '../../images/order-accepted.gif'

function OrderDetails(props) {
    return(
        <div className={orderDetailsStyles.order_details_container + ' mt-20 mb-15'}>
            <p className={orderDetailsStyles.order_id + ' text text_type_digits-large'}>
                {props.orderId}
            </p>
            <p className='text text_type_main-medium mt-8 mb-15'>
                идентификатор заказа
            </p>
            <img 
                // gif image will be played only once (not in loop)
                // random parameter at the end of gif url makes it play every time modal is open 
                src={orderAcceptedImage + '?v=' + Math.floor(Math.random()*100)}
                alt="Заказ принят"
                title="Заказ принят"
                height="120px"
            />
            <p className='text text_type_main-default mt-15 mb-2'>
                Ваш заказ начали готовить
            </p>
            <p className='text text_type_main-default text_color_inactive'>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}

OrderDetails.propTypes = {
    // orderId can be a number
    orderId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default OrderDetails;
