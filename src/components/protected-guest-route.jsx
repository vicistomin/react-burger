import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import slices and their functions
import { userSlice } from '../services/slices/user';

export function ProtectedGuestRoute({ children, ...rest }) {
  const dispatch = useDispatch();

  const {
    isAuthorized
  } = useSelector(
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
            to={{
              pathname: '/profile'
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}
