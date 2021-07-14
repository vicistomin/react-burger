import { useState, useRef } from 'react';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { fakeAuth } from '../services/auth';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';

export const LoginPage = () => {

  const history = useHistory();

  const [isFormProcessing, setFormProcessing] = useState(false);

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);

  const emailInputRef = useRef(null);

  const emailRegExp = /.+@.+\.[A-Za-z]+$/;

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

  const validateForm = () => {
    // TODO: check is better be done when focus is out of input, before the form submit action
  
    const validFields = {
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
  }

  const onLoginClick = async (e) => {
    e.preventDefault();
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      // if form fields are correct then start network request
      setFormProcessing(true);
      // TODO: implement login action
      const success = await fakeAuth();
      setFormProcessing(false);
      if(success) {
        history.replace({ pathname: '/' });
      }
    }
  }

  const onRegisterClick = () => {
    history.replace({ pathname: '/register' });
  }

  const onForgotPasswordClick = () => {
    history.replace({ pathname: '/forgot-password' });
  }

  return(
    <>
      <AppHeader />
      {isFormProcessing && <Loader />}
      <div className='fullscreen_message'>
        <Form
          title='Вход'
          actionName='Войти'
          onClick={onLoginClick}
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
