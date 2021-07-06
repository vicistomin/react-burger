import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ConstructorPage,
  ProfilePage,
  NotFound404
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <Route path="/" exact={true}>
          <ConstructorPage />
        </Route>
        <Route path="/profile" exact={true}>
          <ProfilePage />
        </Route>
        {/* TODO: implement route /profile/orders */}
        {/* TODO: implement route /profile/orders/:id */}
        {/* TODO: implement route /ingredients/:id */}
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
