import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import slices and their functions
import { userSlice } from '../services/slices/user';

export function ProtectedRoute({ children, isGuestOnly, ...rest }) {
  const dispatch = useDispatch();

  const {
    isAuthorized,
    hasRequestedPasswordReset
  } = useSelector(
    state => state.user
  );

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
            // guests can get to reset password only after sending request on ForgotPassword page
            location.pathname === '/reset-password' && !hasRequestedPasswordReset ? (
            <Redirect
              to={{
                pathname: '/forgot-password'
              }}
            />
            ) : (
             children
            )
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
