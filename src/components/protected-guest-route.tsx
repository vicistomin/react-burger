import { Redirect, Route } from 'react-router-dom';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { useEffect } from "react";
// import slices and their functions
import { userSlice } from '../services/slices/user';

export function ProtectedGuestRoute({ children, ...rest }) {
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

  // protect routes from authorized users
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          <Redirect
            // return to the page where user been before request
            to={(location.state && location.state.from) || {pathname: "/profile"}}
          />
        ) : (
          children
        )
      }
    />
  )
}
