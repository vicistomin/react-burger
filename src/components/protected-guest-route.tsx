import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { FC, useEffect } from 'react';
// import slices and their functions
import { userSlice } from '../services/slices/user';
import { ILocation } from '../services/types';

export const ProtectedGuestRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();

  const {
    isAuthorized
  } = useAppSelector(
    state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    // check cookies with tokens
    dispatch(checkAuthorization());
  }, []);

  const location = useLocation<ILocation>();
  
  // protect routes from authorized users
  return (
    <Route
      {...rest}
      render={() =>
        isAuthorized ? (
          <Redirect
            // return to the page where user been before request
            to={(!!location.state && location.state.from) || {pathname: "/profile"}}
          />
        ) : (
          children
        )
      }
    />
  )
}
