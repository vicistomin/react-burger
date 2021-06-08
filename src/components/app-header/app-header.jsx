import appHeaderStyles from './app-header.module.css';
// importing components from project
import MenuItem from '../menu-item/menu-item';
// importing components from library
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return(
        <header>
            <nav className={appHeaderStyles.menu_container}>
                {/* TODO: make MenuList component for wrapping MenuItem components and Logo */}
                <ul className={appHeaderStyles.menu_list}>
                    <li className={appHeaderStyles.menu_list_left}>
                        <ul className={appHeaderStyles.menu_list_left_items}>
                            {/* TODO: reimplement active/hover/inactive link and icon colors */}
                            <li>
                                <MenuItem icon={<BurgerIcon type="primary" />} text="Конструктор" link="#" active/>
                            </li>
                            <li>
                                <MenuItem icon={<ListIcon type="secondary" />} text="Лента заказов" link="#" />
                            </li>
                        </ul>
                    </li>
                    <li className={appHeaderStyles.menu_list_center}>
                        <Logo />
                    </li>
                    <li className={appHeaderStyles.menu_list_right}>
                        <span>
                            <MenuItem icon={<ProfileIcon type="secondary" />} text="Личный кабинет" link="#" />
                        </span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
