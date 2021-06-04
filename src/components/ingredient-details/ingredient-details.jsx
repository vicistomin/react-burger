import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails(props) {
    return(
        <div className={ingredientDetailsStyles.ingredient_details_container}>
             <img 
                src='https://code.s3.yandex.net/react/code/bun-02-large.png'
                alt={props.name}
                title={props.name}
            />           
            <h4 className={ingredientDetailsStyles.ingredient_name + ' text text_type_main-medium mt-4 mb-8'}>
                {props.name}
            </h4>
            <ul className={ingredientDetailsStyles.ingredient_nutrition_list}>
                <li>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.calories}
                    </p>
                </li>
                <li>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.proteins}
                    </p>
                </li>
                <li>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.fat}
                    </p>
                </li>
                <li>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.carbohydrates}
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
