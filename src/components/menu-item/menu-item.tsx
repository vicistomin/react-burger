import { FC } from 'react';
import menuItemStyles from './menu-item.module.css';

interface IMenuItem {
    active: boolean,
    onClick: () => void,
    text: string,
    icon: JSX.Element
}

const MenuItem: FC<IMenuItem> = (props) => {
    return(
            <button className={
                `${menuItemStyles.menu_list_item}
                pl-5 pr-5 pt-4 pb-4 mt-4 mb-4
                ${props.active ? menuItemStyles.menu_list_item_active : ''}`
                }
                onClick={props.onClick} 
                title={props.text}
            >
                <span className={menuItemStyles.menu_list_item_icon + ' mr-2'}>
                    {props.icon}
                </span>
                <span className={menuItemStyles.menu_list_item_text +
                    ' text text_type_main-default text_color_inactive'}
                >
                    {props.text}
                </span>
            </button>
    );
}

export default MenuItem;
