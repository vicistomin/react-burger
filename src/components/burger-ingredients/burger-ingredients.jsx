import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
// importing components from project
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
// importing components from library
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('bun')
    return(
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <div className={burgerIngredientsStyles.tab_selector}>
                <Tab 
                    value="bun" 
                    active={current === 'bun'} 
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab 
                    value="sauce" 
                    active={current === 'sauce'} 
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab 
                    value="main" 
                    active={current === 'main'} 
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredientsStyles.scroll_container}>
                <BurgerIngredientsCategory 
                    heading="Булки" 
                    items={props.items.filter(item => item.type === 'bun')} 
                    onIngredientClick={props.onIngredientClick}
                />
                <BurgerIngredientsCategory 
                    heading="Соусы" 
                    items={props.items.filter(item => item.type === 'sauce')} 
                    onIngredientClick={props.onIngredientClick}
                />
                <BurgerIngredientsCategory 
                    heading="Начинки" 
                    items={props.items.filter(item => item.type === 'main')} 
                    onIngredientClick={props.onIngredientClick}
                />
            </div>
        </>
    );
}

BurgerIngredients.propTypes = {
    // TODO: check here propTypes of other elements of items object?
    // (they already will be checked in inner components)
    
    // type property is required for categorization of items
    items: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default BurgerIngredients;
