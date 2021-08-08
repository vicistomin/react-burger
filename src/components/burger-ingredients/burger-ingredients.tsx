import { FC, useState, useEffect } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector} from '../../services/hooks';
import { useInView } from 'react-intersection-observer';
import burgerIngredientsStyles from './burger-ingredients.module.css';
// importing components from project
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
// importing components from library
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

interface IInviewOptions {
    threshold: number,
    trackVisibility: boolean,
    delay: number
}

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = useState<string>('bun')
    const { items } = useAppSelector(state => state.items);

    const setTab = (tabName: string): void => {
        setCurrent(tabName);
        document.getElementById(tabName)?.scrollIntoView({behavior:"smooth"})
    }
    const handleBunTabClick = (): void => {
        setTab('bun');
    };
    const handleSauceTabClick = (): void => {
        setTab('sauce');
    };
    const handleMainTabClick = (): void => {
        setTab('main');
    };
    
    const inViewOptions: IInviewOptions = {
        threshold: 0,
        trackVisibility: true,
        delay: 100
    };
    const [bunRef, inViewBun] = useInView(inViewOptions);
    const [mainRef, inViewMain] = useInView(inViewOptions);
    const [sauceRef, inViewSauce] = useInView(inViewOptions);

    useEffect(() => {
        if (inViewBun) {
          setCurrent('bun');
        }
        else if (inViewSauce) {
          setCurrent('sauce');
        } 
        else if (inViewMain) {
          setCurrent('main');
        } 
      }, [inViewBun, inViewMain, inViewSauce]);

    return(
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>
            <div className={burgerIngredientsStyles.tab_selector}>
                <Tab 
                    active={current === 'bun'} 
                    onClick={handleBunTabClick}
                    value='Булки'
                >
                    Булки
                </Tab>
                <Tab 
                    active={current === 'sauce'} 
                    onClick={handleSauceTabClick}
                    value='Соусы'
                >
                    Соусы
                </Tab>
                <Tab 
                    active={current === 'main'} 
                    onClick={handleMainTabClick}
                    value='Начинки'
                >
                    Начинки
                </Tab>
            </div>
            <div 
                className={burgerIngredientsStyles.scroll_container} 
            >
                <BurgerIngredientsCategory 
                    heading="Булки"
                    categoryId='bun'
                    items={items.filter(item => item.type === 'bun')}
                    ref={bunRef}
                />
                <BurgerIngredientsCategory 
                    heading="Соусы"
                    categoryId='sauce' 
                    items={items.filter(item => item.type === 'sauce')}
                    ref={sauceRef}
                />
                <BurgerIngredientsCategory 
                    heading="Начинки"
                    categoryId='main'
                    items={items.filter(item => item.type === 'main')}
                    ref={mainRef}
                />
            </div>
        </>
    );
}

export default BurgerIngredients;
