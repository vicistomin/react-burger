import { Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import slices and their functions
import { getUser, userSlice } from '../services/slices/user';

// TODO: implement protection for route /reset-password

export function ProtectedRoute({ children, isGuestOnly, ...rest }) {
  const dispatch = useDispatch();

  const {
    userSuccess,
    userRequest,
    isAuthorized
  } = useSelector(
    state => state.user
  );

  const { resetStatus } = userSlice.actions;

  const resetError = () => {
    dispatch(resetStatus());
  };

  // reset status and errors on page load
  useEffect(() => {
    resetError();
    dispatch(getUser());
  }, []);

  // we need to have user from API in store to check authorization status
  useEffect(() => {
    // won't call API if user is already in store or in process
    if (!userSuccess && !userRequest) {
      dispatch(getUser());
    }
  }, [userSuccess]);

  // protect some routes from authorized users
  if (isGuestOnly) {
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
