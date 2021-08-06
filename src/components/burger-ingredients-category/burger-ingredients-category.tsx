import { forwardRef } from 'react';
import burgerIngredientsCategoryStyles from './burger-ingredients-category.module.css';
// importing components from project
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { IIngredient } from '../../services/types';

interface IIngredientCategory {
    heading: string,
    categoryId: string,
    items: Array<IIngredient>
}

const BurgerIngredientsCategory = forwardRef<HTMLElement, IIngredientCategory>(
    (props, ref) => (
    <section id={props.categoryId} ref={ref}>
        <h2 className="text text_type_main-medium pt-10 mb-6">
            {props.heading}
        </h2>
        {/* when items aren't received, show 'Empty category' message */}
        {(props.items.length > 0 ? 
            <ul className={burgerIngredientsCategoryStyles.burger_ingredients_list + ' ml-4 mt-6 mr-2 mb-10'}>
                {props.items.map((item) => (
                    <BurgerIngredientsCard
                        key={item._id}
                        {...item}
                    />
                ))}
            </ul>
        : <h3 className='text text_type_main-default text_color_inactive pb-6'>
                    Категория пуста
            </h3>)}
    </section>
));

export default BurgerIngredientsCategory;
