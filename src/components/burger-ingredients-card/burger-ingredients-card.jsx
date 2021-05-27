import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
// importing components from library
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsCard(props) {
    return(
        // {for (item in props.children) { => {}}
        <li>
            {props.item}
        </li>
    );
}

export default BurgerIngredientsCard;
