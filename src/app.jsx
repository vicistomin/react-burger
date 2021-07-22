import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useLocation } from 'react-router-dom';
import { getItems } from './services/slices/items';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  FeedPage,
  OrderPage,
  ProfilePage,
  HistoryPage,
  IngredientPage,
  IngredientModalPage,
  NotFound404
} from './pages';
import { ProtectedRoute } from './components/protected-route';
import { ProtectedResetRoute } from './components/protected-reset-route';
import AppHeader from './components/app-header/app-header';

function App() {
  const dispatch = useDispatch();

  let location = useLocation();
  let background = location.state && location.state.background;

  const {
    itemsSuccess,
  } = useSelector(
    state => state.items
  );

  // we need to have items from API in store to render ingredients on pages
  useEffect(() => {
    // we won't call API if items are already in store
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <ProtectedRoute isGuestOnly={true} path="/login" exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute isGuestOnly={true} path="/register" exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute isGuestOnly={true} path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedResetRoute path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedResetRoute>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <HistoryPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <OrderPage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {/* Show the modal when a background page is set */
        background && 
        <Route path="/ingredients/:id" exact={true}>
          <IngredientModalPage />
        </Route>
      }
    </>
  );
}

export default App;
