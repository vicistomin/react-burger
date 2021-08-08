import { FC, useState, useRef, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
// importing components from project
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { forgotPassword, userSlice } from '../services/slices/user';

import { useHistory } from 'react-router-dom';

export const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    userRequest,
    userSuccess,
    userFailed
  } = useAppSelector(
    state => state.user
  );
  const { resetStatus } = userSlice.actions;

  const history = useHistory();

  const resetError = (): void => {
    dispatch(resetStatus());
  }  

  // reset status and errors on page load
  useEffect(() => {
    resetError();
  }, [])

  const [emailValue, setEmailValue] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(true);

  const emailInputRef = useRef<HTMLInputElement>(null);

  const emailRegExp: RegExp = /.+@.+\.[A-Za-z]+$/;

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>):void => {
    // hide the error message if user writed correct email in the field
    if (emailRegExp.test(e.target.value)) {
      setEmailValid(true);
    }
    setEmailValue(e.target.value);
  };

  // TODO: move form/inputs validation function to separate file in /utils?

  interface IFormFields {
    email: boolean
  }

  const validateForm = (): boolean => {
    // TODO: check is better be done when focus is out of input, before the form submit action
    
    const validFields:IFormFields = {
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

  const redirectOnSuccess = (): void => {
    history.replace({ 
      pathname: '/reset-password',
      state: { from: '/forgot-password' }
    });
  }

  const onResetPasswordClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormCorrect: boolean = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      // if form field are correct then start reset password action
      // won't call API if user data is already in process
      if (!userRequest) {
        dispatch(forgotPassword(emailValue, redirectOnSuccess));
      }
    }
  }, [emailValue, userRequest]);

  const onLoginClick = (): void => {
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
            onFormSubmit={onResetPasswordClick}
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
