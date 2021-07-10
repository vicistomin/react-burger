import appHeaderStyles from './app-header.module.css';
// importing components from project
import MenuItem from '../menu-item/menu-item';
// importing components from library
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function AppHeader() {
    const history = useHistory();

    const [isHomePage, setHomePage] = useState(false);
    const [isFeedPage, setFeedPage] = useState(false);
    const [isProfilePage, setProfilePage] = useState(false);

    const currentUrl = history.location.pathname;
    
    useEffect(() => {
        switch (currentUrl) {
            case '/':
                setHomePage(true);
                break;
            case '/feed':
                setFeedPage(true);
                break;
            case '/profile':
                setProfilePage(true);
                break;
            default:
                break;
        }
    }, [currentUrl]);

    const onConstructorClick = () => {
        history.replace({ pathname: '/' });
    };
    const onFeedClick = () => {
        history.replace({ pathname: '/feed' });
    };
    const onProfileClick = () => {
        history.replace({ pathname: '/profile' });
    };

    return(
        <header>
            <nav className={appHeaderStyles.menu_container}>
                {/* TODO: make MenuList component for wrapping MenuItem components and Logo */}
                <ul className={appHeaderStyles.menu_list}>
                    <li className={appHeaderStyles.menu_list_left}>
                        <ul className={appHeaderStyles.menu_list_left_items}>
                            <li>
                                <MenuItem
                                    icon={
                                        <BurgerIcon type={isHomePage ? "primary" : "secondary"} />
                                    }
                                    text="Конструктор"
                                    onClick={onConstructorClick}
                                    active={isHomePage}
                                />
                            </li>
                            <li>

                                <MenuItem
                                    icon={
                                        <ListIcon type={isFeedPage ? "primary" : "secondary"} />
                                    }
                                    text="Лента заказов"
                                    onClick={onFeedClick}
                                    active={isFeedPage}
                                />
                            </li>
                        </ul>
                    </li>
                    <li className={appHeaderStyles.menu_list_center}>
                        <Logo />
                    </li>
                    <li className={appHeaderStyles.menu_list_right}>
                        <span>
                            <MenuItem
                                icon={
                                    <ProfileIcon type={isProfilePage ? "primary" : "secondary"} />
                                }
                                text="Личный кабинет"
                                onClick={onProfileClick}
                                active={isProfilePage}
                            />
                        </span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
