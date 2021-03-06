import React, { useEffect } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css';
// importing components from library
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableConstructorElement from '../draggable-constructor-element/draggable-constructor-element';
import { placeOrder } from '../../services/slices/order';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';

import { useHistory } from 'react-router-dom';
import { IIngredient } from '../../services/types';

const BurgerConstructor: React.FC = () => {
    const dispatch = useAppDispatch();
    const { increaseQuantityValue, decreaseQuantityValue } = itemsSlice.actions;
    const { setBunItem, calcTotalPrice } = burgerConstructorSlice.actions
    const { bunItem, middleItems, totalPrice } = useAppSelector(state => state.burgerConstructor);
    const { isAuthorized } = useAppSelector(state => state.user);

    const history = useHistory();

    const onOrderButtonClick = () => {
        if (isAuthorized) {
            if (!!bunItem._id) {
                const items:Array<string> = [bunItem._id];
                middleItems.map(item => 
                    item._id && items.push(item._id));
                // get new order ID from API:
                dispatch(placeOrder(items));
            }
        }
        // redirect guests to login page
        else {
            history.replace({
                pathname: '/login',
                state: { from: '/' }
            });
        }
      };

    // recalculating total price
    useEffect(() => {
        dispatch(calcTotalPrice());
    }, [dispatch, bunItem, middleItems, calcTotalPrice]);

    const handleBunItemDrop = (newBunItem: IIngredient) => {
        dispatch(setBunItem(newBunItem));
        if (!!bunItem._id) {
            dispatch(decreaseQuantityValue(bunItem._id));
            dispatch(decreaseQuantityValue(bunItem._id));
        }
        if (!!newBunItem._id) {
            dispatch(increaseQuantityValue(newBunItem._id));
            dispatch(increaseQuantityValue(newBunItem._id));
        }
    };

    // Buns can be only be of one type
    // (user can't choose different buns for top and bottom)
    const [, dropTopBunTarget] = useDrop({
        accept: 'bun',
        drop(newBunItem: IIngredient) {
            handleBunItemDrop(newBunItem);
        }
      });
    
    const [, dropBottomBunTarget] = useDrop({
        accept: 'bun',
        drop(newBunItem: IIngredient) {
            handleBunItemDrop(newBunItem);
        }
      });
    
    const [, dropMiddleItemTarget] = useDrop({
        accept: ['sauce', 'main']
      });

    const generateItemHash = () => (
        Math.floor(Math.random() * 10000)
    );

    return(
        <>
            <ul className={burgerConstructorStyles.burger_constructor_list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8' ref={dropTopBunTarget}>
                    {!!bunItem.name ? (
                        <ConstructorElement 
                            type='top'
                            isLocked={true}
                            text={bunItem.name + ' (????????)'}
                            thumbnail={bunItem.image || ''}
                            price={bunItem.price || 0}
                        />
                    ) : (
                        <div 
                            className={
                                burgerConstructorStyles.emptyBun +
                                ' constructor-element constructor-element_pos_top'
                            }
                        >
                            &nbsp;
                        </div>
                    )}
                </li>
                <li ref={dropMiddleItemTarget}>
                    {/* when inner items aren't chosen, show warning message */}
                    {(middleItems.length > 0 ?
                        <ul 
                            className={burgerConstructorStyles.burger_constructor_draggable_list + ' pr-2'}
                            key='middle_items'
                        >
                            {middleItems.map((item, index) => (
                                <DraggableConstructorElement 
                                    item={item}
                                    index={index}
                                    // key should have random generated hash or timestamp added to '_id'
                                    key={(item._id || '')+generateItemHash()}
                                />
                            ))}
                        </ul>
                    : 
                        <h3 
                            className={burgerConstructorStyles.warningText + 
                            ' text text_type_main-default text_color_inactive pt-6 pb-6'}
                            
                        >
                            {totalPrice === 0 ? (
                                '???????????????? ?????????? ?? ??????????????????????'
                            ) : (
                                '???????????????? ??????????????????????'
                            )}
                        </h3>
                    )}
                </li>
                <li className='pl-8' ref={dropBottomBunTarget}>
                    {!!bunItem.name ? (
                        <ConstructorElement 
                            isLocked={true}
                            type='bottom'
                            text={bunItem.name + ' (??????)'}
                            thumbnail={bunItem.image || ''}
                            price={bunItem.price || 0}
                        />
                    ) : (
                        <div 
                            className={
                                burgerConstructorStyles.emptyBun +
                                ' constructor-element constructor-element_pos_bottom'
                            }
                        >
                            &nbsp;
                        </div>
                    )}
                </li>
            </ul>
            <div className={
                    `${burgerConstructorStyles.burger_constructor_order}
                    mr-4 mb-10
                    ${!bunItem.name ? burgerConstructorStyles.disabled : null}`
                }
            >
                <p className='text text_type_digits-medium'>
                    {totalPrice}
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type='primary' />
                </span>
                <Button 
                    type="primary"
                    size="medium"
                    onClick={bunItem.name ? onOrderButtonClick : () => {}}
                >
                        ???????????????? ??????????
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;
