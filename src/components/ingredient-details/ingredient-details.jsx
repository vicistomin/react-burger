import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails(props) {
    return(
        <div className={ingredientDetailsStyles.ingredient_details_container}>
             <img 
                src={props.item.image_large}
                alt={props.item.name}
                title={props.item.name}
            />           
            <h4 className='text text_type_main-medium mt-4 mb-8'>
                {props.item.name}
            </h4>
            <ul className={ingredientDetailsStyles.ingredient_nutrition_list}>
                <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.item.calories}
                    </p>
                </li>
                <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.item.proteins}
                    </p>
                </li>
                <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.item.fat}
                    </p>
                </li>
                <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.item.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
}

IngredientDetails.propTypes = {
    // TODO: check propTypes!
};

export default IngredientDetails;
