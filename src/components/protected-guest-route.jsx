import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import slices and their functions
import { userSlice } from '../services/slices/user';

export function ProtectedGuestRoute({ children, isGuestOnly, ...rest }) {
  const dispatch = useDispatch();

  const {
    isAuthorized
  } = useSelector(
    state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  // check cookies with tokens
  dispatch(checkAuthorization());
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
