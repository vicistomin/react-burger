import PropTypes from 'prop-types';
import menuItemStyles from './menu-item.module.css';

function MenuItem(props) {
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

MenuItem.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};

export default MenuItem;
