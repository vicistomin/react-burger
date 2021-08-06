import orderDetailsStyles from './order-details.module.css';
import orderAcceptedImage from '../../images/order-accepted.gif'
// importing typed hooks for Redux Toolkit
import { useAppSelector } from '../../services/hooks';
import Loader from '../loader/loader';

function OrderDetails() {
    const {
        orderData,
        orderRequest,
        orderSuccess,
        orderFailed
      } = useAppSelector(
        state => state.order
      );

    return(
        <div className={orderDetailsStyles.order_details_container + ' mt-20 mb-15'}>
            {
                orderRequest && 
                !orderFailed && 
                !orderSuccess && (
                <div className={orderDetailsStyles.loader_container}>
                    <Loader />
                </div>
            )}
            {
                orderFailed && 
                !orderRequest && 
                !orderSuccess && (
                <>
                    <p className='text text_type_main-large'>
                        Произошла ошибка
                    </p>
                    <p className='text text_type_main-default text_color_inactive mt-8 mb-15'>
                        Пожалуйста, попробуйте оформить заказ позже
                    </p>
                </>
            )}
            {
                orderSuccess && 
                !orderFailed && 
                !orderRequest && (
                <>
                    <p className={orderDetailsStyles.order_id + ' text text_type_digits-large'}>
                        {orderData.id}
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
                        height="120"
                    />
                    <p className='text text_type_main-default mt-15 mb-2'>
                        Ваш заказ начали готовить
                    </p>
                    <p className='text text_type_main-default text_color_inactive'>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>
            )}
        </div>
    );
}

export default OrderDetails;
