import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css';
// importing components from library
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { placeOrder } from '../../services/slices/order';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';

function BurgerConstructor() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.items);
    const { setBunItem, addMiddleItems, calcTotalPrice } = burgerConstructorSlice.actions
    const { bunItem, middleItems, totalPrice } = useSelector(state => state.burgerConstructor);

    const onOrderButtonClick = () => {
        const items = [bunItem._id];
        middleItems.map(item => items.push(item._id));
        // get new order ID from API:
        dispatch(placeOrder(items));
      };

    // recalculating total price
    useEffect(() => {
        dispatch(calcTotalPrice());
    }, [dispatch, bunItem, middleItems, calcTotalPrice]);

    const generateItemHash = () => (
        Math.floor(Math.random() * 10000)
    );

    // Buns can be only be of one type
    // (user can't choose different buns for top and bottom)
    // FIXME: One drop ref isn't working with 2 li elements (top and bottom)
    const [{isTopBunHover}, dropTopBunTarget] = useDrop({
        accept: 'bun',
        drop(bunItem) {
            dispatch(setBunItem(bunItem));
        },
        collect: monitor => ({
            isTopBunHover: monitor.isOver(),
        })
      });
    
    const [{isBottomBunHover}, dropBottomBunTarget] = useDrop({
        accept: 'bun',
        drop(bunItem) {
            dispatch(setBunItem(bunItem));
        },
        collect: monitor => ({
            isBottomBunHover: monitor.isOver(),
        })
      });
    
    const [{isMiddleItemsHover}, dropMiddleItemsTarget] = useDrop({
        // ???
        accept: ['sauce', 'main'],
        drop(MiddleItem) {
            dispatch(addMiddleItems(MiddleItem));
        },
        collect: monitor => ({
            isMiddleItemsHover: monitor.isOver(),
        })
      });

    return(
        <>
            <ul className={burgerConstructorStyles.burger_constructor_list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8' ref={dropTopBunTarget}>
                    {bunItem.name ? (
                        <ConstructorElement 
                            type='top'
                            isLocked={true}
                            text={bunItem.name + ' (верх)'}
                            thumbnail={bunItem.image}
                            price={bunItem.price}
                        />
                    ) : (
                        <div 
                            className='constructor-element constructor-element_pos_top'
                            style={{width: '100%'}}
                        >
                        </div>
                    )}
                </li>
                <li ref={dropMiddleItemsTarget}>
                    {/* when inner items aren't chosen, show warning message */}
                    {(middleItems.length > 0 ?
                        <ul 
                            className={burgerConstructorStyles.burger_constructor_draggable_list + ' pr-2'}
                            key='middle_items'
                        >
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
                            {totalPrice === 0 ? (
                                'Добавьте булку и ингредиенты'
                            ) : (
                                'Добавьте ингредиенты'
                            )}
                        </h3>
                    )}
                </li>
                <li className='pl-8' ref={dropBottomBunTarget}>
                    {bunItem.name ? (
                        <ConstructorElement 
                            isLocked={true}
                            type='bottom'
                            text={bunItem.name + ' (низ)'}
                            thumbnail={bunItem.image}
                            price={bunItem.price}
                        />
                    ) : (
                        <div 
                            className='constructor-element constructor-element_pos_bottom'
                            style={{width: '100%'}}
                        >
                        </div>
                    )}
                </li>
            </ul>
            <div style={!bunItem.name ? {opacity: 0.5} : null}
            className={burgerConstructorStyles.burger_constructor_order + ' mr-4 mb-10'}>
                <p className='text text_type_digits-medium'>
                    {totalPrice}
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type='primary' />
                </span>
                <Button 
                    type="primary"
                    size="medium"
                    onClick={bunItem.name ? onOrderButtonClick : null}
                >
                        Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;
