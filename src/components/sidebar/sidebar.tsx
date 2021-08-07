// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import sidebarStyles from './sidebar.module.css';
// importing components from project
import SidebarLink from '../sidebar-link/sidebar-link';
// import slices and their functions
import { logout, userSlice } from '../../services/slices/user';

import { useHistory } from 'react-router-dom';
import { FC, useState, useEffect } from 'react';

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();

  const { userRequest } = useAppSelector(state => state.user);
  const { resetStatus } = userSlice.actions;
  
  // reset status and errors on page load
  useEffect(() => {
    dispatch(resetStatus());
  }, [])
  
  const history = useHistory();

  const [isProfilePage, setProfilePage] = useState<boolean>(false);
  const [isHistoryPage, setHistoryPage] = useState<boolean>(false);

  const currentUrl: string = history.location.pathname;
    
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

  const onProfileClick = (): void => {
    history.replace({ pathname: '/profile' });
  };
  const onHistoryClick = (): void => {
    history.replace({ pathname: '/profile/orders' });
  };

  const onLogoutClick = (): void => {
    // won't call API if user data is already in process
    if (!userRequest) {
      dispatch(logout());
    }
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
          active={false}
        />
      </ul>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
);
}

export default Sidebar;
