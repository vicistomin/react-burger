import { FC, useState, useRef, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
// importing components from project
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { login, userSlice } from '../services/slices/user';

import { useHistory, useLocation } from 'react-router-dom';
import { ILocation } from '../services/types';

export const LoginPage: FC = () => {
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
  const location = useLocation<ILocation>();

  const resetError = (): void => {
    dispatch(resetStatus());
  }  

  // reset status and errors on page load
  useEffect(() => {
    resetError();
  }, [])

  // TODO: rewrite form input vars to 'form' object fields
  const [emailValue, setEmailValue] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isPasswordEmpty, setPasswordEmpty] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  const emailRegExp: RegExp = /.+@.+\.[A-Za-z]+$/;

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>):void => {
    // hide the error message if user writed correct email in the field
    if (emailRegExp.test(e.target.value)) {
      setEmailValid(true);
    }
    setEmailValue(e.target.value);
  };
  
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>):void => {
    // TODO: find a way to trigger PasswordInput error status
    if (e.target.value.length !== 0) {
      setPasswordEmpty(false);
    }
    setPasswordValue(e.target.value);
  };

  // TODO: move form/inputs validation function to separate file in /utils?

  interface IFormFields {
    email: boolean,
    password: boolean
  }

  const validateForm = useCallback((): boolean => {
    // TODO: check is better be done when focus is out of input, before the form submit action
  
    const validFields: IFormFields = {
      email: false,
      password: false
    }
    
    // performing email field check
    if (!emailRegExp.test(emailValue)) {
      setEmailValid(false);
    }
    else {
      validFields.email = true;
    }

    // performing password field check    
    if (passwordValue.length < 6) {
      // TODO: find a way to trigger PasswordInput error status
      if (passwordValue.length === 0) {
        setPasswordEmpty(true);
      }
    }
    else {
      validFields.password = true;
    }

    if (validFields.email && validFields.password) {
      return true;
    }
    else {
      return false;
    }
  }, [emailValue, passwordValue]);

  // FIXME: This callback is needed for redirecting in correct time
  // (after userSuccess will be set)
  // Async/await didn't worked in this case for some reason.
  // Maybe CreateAsyncThunk should be used in userSlice?
  const redirectOnSuccess = (): void => {
    // redirecting to the page which unauthed user tried to reach
    // in other cases redirect to HomePage
    const { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
  }

  const onLoginClick = useCallback((e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const isFormCorrect: boolean = validateForm();
      if(!isFormCorrect) {
        return;
      }
      else {
        // if form fields are correct then start login action
        // won't call API if user data is already in process
        if (!userRequest) {
          dispatch(login({
            email: emailValue,
            password: passwordValue
          }, redirectOnSuccess));
      }
    }
  }, [emailValue, passwordValue, userRequest]);

  const onRegisterClick = (): void => {
    history.replace({ pathname: '/register' });
  }

  const onForgotPasswordClick = (): void => {
    history.replace({ pathname: '/forgot-password' });
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
                Ошибка авторизации
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
            title='Вход'
            actionName='Войти'
            onFormSubmit={onLoginClick}
          >
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              error={!isEmailValid}
              ref={emailInputRef}
              errorText={'Неправильно введен e-mail'}
              size={'default'}
            />
            <div className={isPasswordEmpty ? 'password_error' : ''}>
              <PasswordInput
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
              />
            </div>
          </Form>
        )}
        <div className='bottom_navigation'>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Button 
            type="secondary"
            size="medium"
            onClick={onRegisterClick}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className='bottom_navigation mt-4'>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Button 
            type="secondary"
            size="medium"
            onClick={onForgotPasswordClick}
          >
            Восстановить пароль
          </Button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
