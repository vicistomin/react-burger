import appHeaderStyles from './app-header.module.css';
// importing components from project
import MenuItem from '../menu-item/menu-item.jsx'
// importing components from library
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


// Header
//   Menu?
//     Menu-item
function AppHeader() {
    return(
        <header>
            <nav className={appHeaderStyles.menu_container}>
                {/* TODO: make MenuList component for wrapping MenuItem components and Logo */}
                <ul className={appHeaderStyles.menu_list}>
                    <li className={appHeaderStyles.menu_list_left}>
                        {/* TODO: reimplement active/hover/inactive link and icon colors */}
                        <MenuItem icon={<BurgerIcon type="primary" />} text="Конструктор" link="#" active/>
                        <MenuItem icon={<ListIcon type="secondary" />} text="Лента заказов" link="#" />
                    </li>
                    <li className={appHeaderStyles.menu_list_center}>
                        <Logo />
                    </li>
                    <li className={appHeaderStyles.menu_list_right}>
                        <MenuItem icon={<ProfileIcon type="secondary" />} text="Личный кабинет" link="#" />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
