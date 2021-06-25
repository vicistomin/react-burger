import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import burgerConstructorStyles from './burger-constructor.module.css';
// importing components from library
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { placeOrder } from '../../services/slices/order';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';

function BurgerConstructor() {
    const dispatch = useDispatch();

    // TODO: delete this when DnD will be implemented:
    const { items } = useSelector(state => state.items);
    const { setBunItem, setMiddleItems, calcTotalPrice } = burgerConstructorSlice.actions
    const { bunItem, middleItems, totalPrice } = useSelector(state => state.burgerConstructor);

    // TODO: implement interactive selection of buns (top/bottom)
    // !!! Buns can be only be of one type
    // (user can't choose different buns for top and bottom)

    // define hardcoded arrays of ingredients from the data from API:
    useEffect(() => {
        dispatch(setBunItem(items.filter(item => item.type === 'bun')[0]));
        dispatch(setMiddleItems(items.filter(item => 
            (item.type === 'sauce' || item.type === 'main'))
                .slice(0, 0)
        ));
      }, [dispatch]);

    const onOrderButtonClick = () => {
        const items = [bunItem._id];
        middleItems.map(item => items.push(item._id));
        // get new order ID from API:
        dispatch(placeOrder(items));
      };

    // recalculating total price
    useEffect(() => {
        dispatch(calcTotalPrice());
    }, [dispatch]);

    const generateItemHash = () => (
        Math.floor(Math.random() * 10000)
    );

    return(
        <>
            <ul className={burgerConstructorStyles.burger_constructor_list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8'>
                    <ConstructorElement 
                                    type='top'
                                    isLocked={true}
                                    text={bunItem.name + ' (верх)'}
                                    thumbnail={bunItem.image}
                                    price={bunItem.price}
                                />
                </li>
                <li>
                    {/* when inner items aren't chosen, show warning message */}
                    {(middleItems.length > 0 ?
                        <ul className={burgerConstructorStyles.burger_constructor_draggable_list + ' pr-2'} key="middle_items">
                            {middleItems.map((item, index) => (
                                <li className={burgerConstructorStyles.burger_constructor_draggable_list_item}
                                   // key should have random generated hash or timestamp added to '_id'
                                   key={item._id+generateItemHash()}
                                >
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
                                    text={bunItem.name + ' (низ)'}
                                    thumbnail={bunItem.image}
                                    price={bunItem.price}
                                />
                </li>
            </ul>
            <div className={burgerConstructorStyles.burger_constructor_order + ' mr-4 mb-10'}>
                <p className="text text_type_digits-medium">
                    {totalPrice}
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
