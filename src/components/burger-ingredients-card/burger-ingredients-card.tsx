import { memo } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppDispatch } from '../../services/hooks';
import { useDrag } from 'react-dnd';
import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
// importing components from library
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';

import { useHistory } from 'react-router-dom';
import { IIngredient } from '../../services/types';

const BurgerIngredientsCard = memo<IIngredient>(
    ( item ) => {
    const dispatch = useAppDispatch();
    const { increaseQuantityValue } = itemsSlice.actions;
    const { addMiddleItem } = burgerConstructorSlice.actions
    
    const history = useHistory();

    const handleIngredientClick = () => {
        history.replace({ 
            pathname: `/ingredients/${item._id}`,
            state: { background: history.location }
        });
    }

    const [{opacity}, dragRef] = useDrag({
        type: item.type || '',
        item: item,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        }),
        end(item, monitor) {
            // adding only new ingredients, not when reorder items in Constructor
            if(monitor.didDrop() && item.type !== 'bun' && !!item._id) {
                dispatch(addMiddleItem(item));
                dispatch(increaseQuantityValue(item._id));
            }
        }
      });
    
    return(
        <li>
            <div 
                className={burgerIngredientsCardStyles.ingredient_card} 
                onClick={handleIngredientClick} 
                ref={dragRef}
                style={{opacity}}
            >
                {item.__v ? <Counter count={item.__v}/> : null}
                <img src={item.image} alt={item.name} title={item.name} className="ml-4 mr-4"/>
                    <div className={'flex_row mt-1 mb-1 '}>
                        <p className='pr-2 text text_type_digits-default'>{item.price}</p>
                        <CurrencyIcon type='primary'/>
                    </div>
                <p className={burgerIngredientsCardStyles.ingredient_name + ' text text_type_main-default'}>
                    {item.name}
                </p>
            </div>
        </li>
    );
});

export default BurgerIngredientsCard;
