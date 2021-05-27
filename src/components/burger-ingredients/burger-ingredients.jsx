import React from 'react';
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
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
        <BurgerIngredientsCategory heading="Булки" items={props.items} />
        <BurgerIngredientsCategory heading="Соусы" items={['sauce1', 'sauce2']} />
        <BurgerIngredientsCategory heading="Начинки" items={['main', 'main2']} />
        </>
    );
}


// <Counter count={1} size="default" />

export default BurgerIngredients;
