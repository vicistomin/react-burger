import { FC } from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { IIngredient } from '../../services/types';

const IngredientDetails: FC<IIngredient> = (item) => {
    return(
        <div className={ingredientDetailsStyles.ingredient_details_container}>
             <img 
                src={item.image_large}
                alt={item.name}
                title={item.name}
            />           
            <h4 className='text text_type_main-medium mt-4 mb-8'>
                {item.name}
            </h4>
            <ul className={ingredientDetailsStyles.ingredient_nutrition_list}>
                <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {item.calories}
                    </p>
                </li>
                <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {item.proteins}
                    </p>
                </li>
                <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {item.fat}
                    </p>
                </li>
                <li className={ingredientDetailsStyles.ingredient_nutrition_list_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {item.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;
