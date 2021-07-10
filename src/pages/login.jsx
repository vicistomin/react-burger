import { useState, useRef, useEffect } from 'react';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';

export const LoginPage = () => {

  const history = useHistory();

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [passwordValue, setPasswordValue] = useState('');

  const emailInputRef = useRef(null);

  const emailRegExp = /.+@.+\.[A-Za-z]+$/;

  const onEmailChange = e => {
    setEmailValue(e.target.value);
  };
  
  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  };

  const onLoginClick = () => {
    // performing email field check
    // TODO: check are better be done when focus is out of input, before the form submit action
    if (!emailRegExp.test(emailValue)) {
      setEmailValid(false);
    }
    // TODO: implement login action
  }

  const onRegisterClick = () => {
    history.replace({ pathname: '/register' });
  }

  const onForgotPasswordClick = () => {
    history.replace({ pathname: '/forgot-password' });
  }

  useEffect(() => {
    // hide the error message if user writed correct email in the field
    if (emailRegExp.test(emailValue)) {
      setEmailValid(true);
    }
  }, [emailValue]);

  return(
    <>
      <AppHeader />
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
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={'password'}
          />
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
