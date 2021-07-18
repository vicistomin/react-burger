import { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { register, userSlice } from '../services/slices/user';

import { useHistory } from 'react-router-dom';

export const RegisterPage = () => {
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

  const [nameValue, setNameValue] = useState('');
  const [isNameEmpty, setNameEmpty] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const emailRegExp = /.+@.+\.[A-Za-z]+$/;

  const onNameChange = e => {
    // hide the error message if user is writing something in the name field
    if (e.target.value.length > 0) {
      setNameEmpty(false);
    }
    setNameValue(e.target.value);
  };

  const onEmailChange = e => {
    // hide the error message if user writed correct email in the field
    if (emailRegExp.test(e.target.value)) {
      setEmailValid(true);
    }
    setEmailValue(e.target.value);
  };
  
  const onPasswordChange = e => {
    // TODO: find a way to trigger PasswordInput error status
    if (e.target.value.length !== 0) {
      setPasswordEmpty(false);
    }
    setPasswordValue(e.target.value);
  };

  // TODO: move form/inputs validation function to separate file in /utils?

  const validateForm = useCallback(() => {
    // TODO: check is better be done when focus is out of input, before the form submit action
    
    const validFields = {
      email: false,
      password: false,
      name: false
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

    // performing name field check 
    if (nameValue.length === 0) {
      setNameEmpty(true);
    }
    else {
      validFields.name = true;
    }

    if (validFields.email && validFields.password && validFields.name) {
      return true;
    }
    else {
      return false;
    }
  }, [emailValue, passwordValue, nameValue]);

  const redirectOnSuccess = () => {
      history.replace({ pathname: '/' });
  }

  const onRegisterClick = useCallback((e) => {
    e.preventDefault();
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      // if form fields are correct then start registration action
      dispatch(register({
        name: nameValue,
        email: emailValue,
        password: passwordValue
      }, redirectOnSuccess))
    }
  }, [emailValue, nameValue, passwordValue]);

  const onLoginClick = () => {
    history.replace({ pathname: '/login' });
  }

  return(
    <>
      <AppHeader />
      {
        (userRequest) && 
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
                Ошибка при регистрации
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
            title='Регистрация'
            actionName='Зарегистрироваться'
            onClick={onRegisterClick}
          >
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onNameChange}
              value={nameValue}
              name={'name'}
              error={isNameEmpty}
              ref={nameInputRef}
              errorText={'Поле не может быть пустым'}
              size={'default'}
            />
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
            {/* TODO: find a way to trigger PasswordInput error status */}
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
            Уже зарегистрированы?
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

export default RegisterPage;
