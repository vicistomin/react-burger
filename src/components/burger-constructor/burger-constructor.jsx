import PropTypes from 'prop-types';
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
                                    text={props.bunItem.name + ' (верх)'}
                                    thumbnail={props.bunItem.image}
                                    price={props.bunItem.price}
                                />
                </li>
                <li>
                    {/* when inner items aren't chosen, show warning message */}
                    {(props.middleItems.length > 0 ?
                        <ul className={burgerConstructorStyles.burger_constructor_draggable_list + ' pr-2'} key="middle_items">
                            {props.middleItems.map((item, index) => (
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
                <li className='pl-8' key="bottom_bun">
                    <ConstructorElement 
                                    isLocked={true}
                                    type='bottom'
                                    text={props.bunItem.name + ' (низ)'}
                                    thumbnail={props.bunItem.image}
                                    price={props.bunItem.price}
                                />
                </li>
            </ul>
            <div className={burgerConstructorStyles.burger_constructor_order + ' mr-4 mb-10'}>
                <p className="text text_type_digits-medium">
                        {
                            // buns can be only of one type so there are 2 buns:
                            props.bunItem.price * 2 + 
                            props.middleItems.reduce((acc, p) => acc + p.price, 0)
                        }
                </p>
                <span className='ml-2 mr-10'>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="medium" onClick={props.openModal}>
                        Оформить заказ
                </Button>
            </div>
        </>
    );
}

BurgerConstructor.propTypes = {
    bunItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired        
    }),

    // the middle ingredients may be empty
    middleItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired 
    })),

};

export default BurgerConstructor;
