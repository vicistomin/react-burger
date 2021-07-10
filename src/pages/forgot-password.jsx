import { useState, useRef, useEffect } from 'react';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';

export const ForgotPasswordPage = () => {

  const history = useHistory();

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);

  const emailInputRef = useRef(null);

  const emailRegExp = /.+@.+\.[A-Za-z]+$/;

  const onEmailChange = e => {
    setEmailValue(e.target.value);
  };

  const onResetPasswordClick = () => {
    // performing email field check
    // TODO: check are better be done when focus is out of input, before the form submit action
    if (!emailRegExp.test(emailValue)) {
      setEmailValid(false);
    }

    // TODO: implement reset password action

    history.replace({ pathname: '/reset-password' });
  }

  const onLoginClick = () => {
    history.replace({ pathname: '/login' });
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
          title='Восстановление пароля'
          actionName='Восстановить'
          onClick={onResetPasswordClick}
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
        </Form>
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
