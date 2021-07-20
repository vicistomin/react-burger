import { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// importing components from project
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { forgotPassword, userSlice } from '../services/slices/user';

import { useHistory } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const {
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    state => state.user
  );
  const { resetStatus } = userSlice.actions;

  const history = useHistory();

  const resetError = () => {
    dispatch(resetStatus());
  }  

  // reset status and errors on page load
  useEffect(() => {
    resetError();
  }, [])

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);

  const emailInputRef = useRef(null);

  const emailRegExp = /.+@.+\.[A-Za-z]+$/;

  const onEmailChange = e => {
    // hide the error message if user writed correct email in the field
    if (emailRegExp.test(e.target.value)) {
      setEmailValid(true);
    }
    setEmailValue(e.target.value);
  };

  // TODO: move form/inputs validation function to separate file in /utils?

  const validateForm = () => {
    // TODO: check is better be done when focus is out of input, before the form submit action
    
    const validFields = {
      email: false
    }

    // performing email field check
    if (!emailRegExp.test(emailValue)) {
      setEmailValid(false);
    }
    else {
      validFields.email = true;
    }

    if (validFields.email) {
      return true;
    }
    else {
      return false;
    }
  }

  const redirectOnSuccess = () => {
    history.replace({ pathname: '/reset-password' });
  }

  const onResetPasswordClick = useCallback((e) => {
    e.preventDefault();
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      // if form field are correct then start reset password action
      dispatch(forgotPassword(emailValue, redirectOnSuccess));
    }
  }, [emailValue]);

  const onLoginClick = () => {
    history.replace({ pathname: '/login' });
  }

  return(
    <>
      {
        userRequest && 
        !userFailed && (
          <Loader />
      )}
      <div className='fullscreen_message'>
        {
          userFailed && 
          !userRequest && 
          !userSuccess && (
            <div className='flex_column mb-30'>
              <h2 className='mb-10 text text_type_main-large text_color_inactive'>
                Ошибка восстановления пароля
              </h2>
              <Button 
                type="primary"
                size="medium"
                onClick={resetError}
              >
                Попробовать снова
              </Button>
            </div>
        )}
        {
          !userFailed && (
          <Form
            title='Восстановление пароля'
            actionName='Восстановить'
            onClick={onResetPasswordClick}
          >
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              error={!isEmailValid}
              ref={emailInputRef}
              errorText={'Неправильно введен e-mail'}
              size={'default'}
            />
          </Form>
        )}
        <div className='bottom_navigation mt-4'>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Button 
            type="secondary"
            size="medium"
            onClick={onLoginClick}
          >
            Войти
          </Button>
        </div>
      </div>
    </>
  );
}
export default ForgotPasswordPage;
