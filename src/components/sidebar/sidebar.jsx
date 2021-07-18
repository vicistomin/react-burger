import { useSelector, useDispatch } from "react-redux";
import sidebarStyles from './sidebar.module.css';
// importing components from project
import SidebarLink from '../sidebar-link/sidebar-link';
// import slices and their functions
import { logout, userSlice } from '../../services/slices/user';

import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Sidebar() {
  const dispatch = useDispatch();

  const {
    refreshToken
  } = useSelector(
     state => state.user
  );
  const { resetStatus } = userSlice.actions;
  
  // reset status and errors on page load
  useEffect(() => {
    dispatch(resetStatus());
  }, [])
  
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

  const redirectOnSuccess = () => {
    history.replace({ pathname: '/login' });
  }

  const onLogoutClick = () => {
    dispatch(logout(refreshToken, redirectOnSuccess));
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
