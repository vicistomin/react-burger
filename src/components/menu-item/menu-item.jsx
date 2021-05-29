import PropTypes from 'prop-types';
import menuItemStyles from './menu-item.module.css';

function MenuItem(props) {
    return(
        <li>
            <a className={menuItemStyles.menu_list_item +
                ' pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 mr-2 ' +
               (props.active ? menuItemStyles.menu_list_item_active : null)}
                href={props.link} 
                title={props.text}
            >
                <div className={menuItemStyles.menu_list_item_icon + ' mr-2'}>
                    {props.icon}
                </div>
                <span className={menuItemStyles.menu_list_item_text +
                    ' text text_type_main-default text_color_inactive'}
                >
                    {props.text}
                </span>
            </a>
        </li>
    );
}

MenuItem.propTypes = {
    active: PropTypes.bool,
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};

export default MenuItem;
