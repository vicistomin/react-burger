import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import slices and their functions
import { userSlice } from '../services/slices/user';

export function ProtectedRoute({ children, isGuestOnly, ...rest }) {
  const dispatch = useDispatch();

  const {
    isAuthorized
  } = useSelector(
    state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  // check cookies with tokens
  dispatch(checkAuthorization());
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
