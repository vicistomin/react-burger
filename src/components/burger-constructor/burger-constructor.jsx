import { useContext, useReducer, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import burgerConstructorStyles from './burger-constructor.module.css';
// importing components from library
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../utils/burger-context';
import { placeOrder } from '../../services/slices/order';

const initialTotalState = { total: 0 };

function totalPriceReducer(totalPriceState, items) {
    // buns can be only of one type so there are 2 buns:
    const newTotal = items.bunItem.price * 2 + items.middleItems.reduce((acc, p) => acc + p.price, 0)
    return { total: newTotal }
}

function BurgerConstructor() {
    const dispatch = useDispatch();

    const { orderedItems } = useContext(BurgerContext);
    const [totalPriceState, totalPriceDispatch] = useReducer(totalPriceReducer, initialTotalState);

    const onOrderButtonClick = () => {
        const items = [orderedItems.bunItem._id];
        orderedItems.middleItems.map(item => items.push(item._id));
        // get new order ID from API:
        dispatch(placeOrder(items));
      };


    useEffect(() => {
        totalPriceDispatch( orderedItems );
    }, [orderedItems]);

    return(
        <>
            <ul className={burgerConstructorStyles.burger_constructor_list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8'>
                    <ConstructorElement 
                                    type='top'
                                    isLocked={true}
                                    text={orderedItems.bunItem.name + ' (верх)'}
                                    thumbnail={orderedItems.bunItem.image}
                                    price={orderedItems.bunItem.price}
                                />
                </li>
                <li>
                    {/* when inner items aren't chosen, show warning message */}
                    {(orderedItems.middleItems.length > 0 ?
                        <ul className={burgerConstructorStyles.burger_constructor_draggable_list + ' pr-2'} key="middle_items">
                            {orderedItems.middleItems.map((item, index) => (
                                <li className={burgerConstructorStyles.burger_constructor_draggable_list_item}
                                    // TODO: can there be more than one inner ingredient of a same type?
                                    // if yes - then key should have random generated addition to '_id'
                                    // or maybe some kind of hash
                                    key={item._id}>
                                    <span className={burgerConstructorStyles.burger_constructor_drag_icon}>
                                        <DragIcon type='primary' />
                                    </span>
                                    <ConstructorElement 
                                        text={item.name}
                                        thumbnail={item.image}
                                        price={item.price}
                                        />
                                </li>
                            ))}
                        </ul>
                    : 
                        <h3 className={burgerConstructorStyles.warningText + ' text text_type_main-default text_color_inactive pt-6 pb-6'}>
                            Добавьте ингредиенты
                        </h3>
                    )}
                </li>
                <li className='pl-8'>
                    <ConstructorElement 
                                    isLocked={true}
                                    type='bottom'
                                    text={orderedItems.bunItem.name + ' (низ)'}
                                    thumbnail={orderedItems.bunItem.image}
                                    price={orderedItems.bunItem.price}
                                />
                </li>
            </ul>
            <div className={burgerConstructorStyles.burger_constructor_order + ' mr-4 mb-10'}>
                <p className="text text_type_digits-medium">
                    {totalPriceState.total}
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="medium" onClick={onOrderButtonClick}>
                        Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;
