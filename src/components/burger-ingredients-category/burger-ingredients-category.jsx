import burgerIngredientsCategoryStyles from './burger-ingredients-category.module.css';
// importing components from project
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

function BurgerIngredientsCategory(props) {
    return(
        <section>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {props.heading}
            </h2>
            <ul className={burgerIngredientsCategoryStyles.burger_ingredients_list}>
                {props.items.map((item) => <BurgerIngredientsCard item={item.name}/>)}
            </ul>
        </section>
    );
}

export default BurgerIngredientsCategory;
