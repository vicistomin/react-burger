import PropTypes from 'prop-types';
import burgerIngredientsCategoryStyles from './burger-ingredients-category.module.css';
// importing components from project
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

function BurgerIngredientsCategory(props) {
    return(
        <section>
            <h2 className="text text_type_main-medium mt-10 mb-6">
                {props.heading}
            </h2>
            {/* when items aren't received, show 'Empty category' nessage */}
            {(props.items.length > 0 ? 
                <ul className={burgerIngredientsCategoryStyles.burger_ingredients_list + ' ml-4 mt-6 mr-2 mb-10'}>
                    {props.items.map((item) => 
                        <BurgerIngredientsCard 
                            name={item.name} 
                            price={item.price} 
                            image={item.image} 
                            value={item.__v} 
                            key={item._id}
                        />)}
                </ul>
            : <h3 className='text text_type_main-default text_color_inactive pb-6'>
                        Категория пуста
              </h3>)}
        </section>
    );
}

BurgerIngredientsCategory.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default BurgerIngredientsCategory;