import { useState, useRef, useEffect } from 'react';
import styles from './register.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';

export const RegisterPage = () => {

  const history = useHistory();

  const [nameValue, setNameValue] = useState('');
  const [isNameEmpty, setNameEmpty] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [passwordValue, setPasswordValue] = useState('');

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const emailRegExp = /.+@.+\.[A-Za-z]+$/;

  const onNameChange = e => {
    setNameValue(e.target.value);
  };

  const onEmailChange = e => {
    setEmailValue(e.target.value);
  };
  
  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  };

  const onRegisterClick = () => {
    // performing field checks
    // TODO: checks are better be done when focus is out of input, before the form submit action
    if (nameValue.length === 0) {
      setNameEmpty(true);
    }
    if (!emailRegExp.test(emailValue)) {
      setEmailValid(false);
    }
    // TODO: implement registration action
  }

  const onLoginClick = () => {
    history.replace({ pathname: '/login' });
  }

  useEffect(() => {
    // hide the error message if user is writing something in the name field
    if (nameValue.length > 0) {
      setNameEmpty(false);
    }
  }, [nameValue]);

  useEffect(() => {
    // hide the error message if user writed correct email in the field
    if (emailRegExp.test(emailValue)) {
      setEmailValid(true);
    }
  }, [emailValue]);

  return(
    <>
      <AppHeader />
      <div className={styles.fullscreen_message}>
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
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={'password'}
          />
        </Form>
        <div className={styles.bottom_navigation}>
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
