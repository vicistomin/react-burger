import PropTypes from 'prop-types';
import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
// importing components from library
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsCard(props) {
    return(
        <li className={burgerIngredientsCardStyles.ingredient_card} onClick={props.openModal}>
            {props.value ? <Counter count={props.value}/> : null}
            <img src={props.image} alt={props.name} title={props.name} className="ml-4 mr-4"/>
                <div className={burgerIngredientsCardStyles.ingredient_price + ' mt-1 mb-1 '}>
                    <p className='pr-2 text text_type_digits-default'>{props.price}</p>
                    <CurrencyIcon />
                </div>
            <p className={burgerIngredientsCardStyles.ingredient_name + ' text text_type_main-default'}>
                {props.name}
            </p>
        </li>
    );
}

BurgerIngredientsCard.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};

export default BurgerIngredientsCard;
