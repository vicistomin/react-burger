import sidebarStyles from './sidebar.module.css';
// importing components from project
import SidebarLink from '../sidebar-link/sidebar-link';

import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Sidebar() {
  const history = useHistory();

  const [isProfilePage, setProfilePage] = useState(false);
  const [isHistoryPage, setHistoryPage] = useState(false);

  const currentUrl = history.location.pathname;
    
  useEffect(() => {
    switch (currentUrl) {
        case '/profile':
          setProfilePage(true);
          break;
        case '/profile/orders':
        case '/profile/orders/:id':
          setHistoryPage(true);
          break;
        default:
          break;
    }
  }, [currentUrl]);

  const onProfileClick = () => {
    history.replace({ pathname: '/profile' });
  };
  const onHistoryClick = () => {
      history.replace({ pathname: '/profile/orders' });
  };
  const onLogoutClick = () => {
      history.replace({ pathname: '/' });
  };

  return(
    <aside className={sidebarStyles.sidebar_container}>
      <ul className={sidebarStyles.sidebar_list}>
        <SidebarLink
          text={'Профиль'}
          onClick={onProfileClick}
          active={isProfilePage}
        />
        <SidebarLink
          text={'История заказов'}
          onClick={onHistoryClick}
          active={isHistoryPage}
        /> 
        <SidebarLink
          text={'Выход'}
          onClick={onLogoutClick}
        />
      </ul>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
);
}

export default Sidebar;
