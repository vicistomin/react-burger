import { useContext } from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
// importing components from library
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../utils/burger-context';

function BurgerIngredientsCard(props) {
    const { onIngredientClick } = useContext(BurgerContext);

    const handleIngredientClick = () => {
        onIngredientClick(props.item)
    }

    return(
        <li>
            <div className={burgerIngredientsCardStyles.ingredient_card} onClick={handleIngredientClick}>
                {props.item.value ? <Counter count={props.item.value}/> : null}
                <img src={props.item.image} alt={props.item.name} title={props.item.name} className="ml-4 mr-4"/>
                    <div className={burgerIngredientsCardStyles.ingredient_price + ' mt-1 mb-1 '}>
                        <p className='pr-2 text text_type_digits-default'>{props.item.price}</p>
                        <CurrencyIcon />
                    </div>
                <p className={burgerIngredientsCardStyles.ingredient_name + ' text text_type_main-default'}>
                    {props.item.name}
                </p>
            </div>
        </li>
    );
}

BurgerIngredientsCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired,
    onIngredientClick: PropTypes.func.isRequired
};

export default BurgerIngredientsCard;
