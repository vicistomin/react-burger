import { FC } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { ILocation } from '../services/types';

export const ProtectedResetRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation<ILocation>();

  // guests can get to reset password only when they came from ForgotPassword page
  const { from } = location.state || { from: { pathname: '/' } }

    return (
      <Route
        {...rest}
        render={() =>
          from === '/forgot-password' ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/forgot-password'
              }}
            />
          )
        }
      />
    )
}
