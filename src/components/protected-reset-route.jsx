import { Redirect, Route, useLocation } from 'react-router-dom';

export function ProtectedResetRoute({ children, ...rest }) {
  const location = useLocation();

  // guests can get to reset password only when they came from ForgotPassword page
  const { from } = location.state || { from: { pathname: '/' } }

    return (
      <Route
        {...rest}
        render={({ location }) =>
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
