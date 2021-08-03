import { Redirect, Route } from 'react-router-dom';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { useEffect } from "react";
// import slices and their functions
import { userSlice } from '../services/slices/user';

export function ProtectedRoute({ children, ...rest }) {
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

  // protect routes from unauthorized users
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
