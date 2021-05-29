import burgerConstructorStyles from './burger-constructor.module.css';
// importing components from library
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
    return(
        <>
            <ul className={burgerConstructorStyles.burger_constructor_list + ' ml-4 mt-25 mb-10 pr-4'}>
                <li className='pl-8' key="top_bun">
                    <ConstructorElement 
                                    type='top'
                                    isLocked={true}
                                    text={props.topItem.name + ' (верх)'}
                                    thumbnail={props.topItem.image}
                                    price={props.topItem.price}
                                />
                </li>
                <ul className={burgerConstructorStyles.burger_constructor_draggable_list + ' pr-2'} key="middle_items">
                    {props.middleItems.map((item, index) => (
                        <li key={item._id + '_' + index}>
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
                <li className='pl-8' key="bottom_bun">
                    <ConstructorElement 
                                    isLocked={true}
                                    type='bottom'
                                    text={props.bottomItem.name + ' (низ)'}
                                    thumbnail={props.bottomItem.image}
                                    price={props.bottomItem.price}
                                />
                </li>
            </ul>
            <div className={burgerConstructorStyles.burger_constructor_order + ' mb-10'}>
                <p className="text text_type_digits-medium">
                        {props.topItem.price + 
                        props.middleItems.reduce((acc, p) => acc + p.price, 0) +
                        props.bottomItem.price}
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="medium">
                        Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;
