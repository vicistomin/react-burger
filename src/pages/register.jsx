import { useState, useRef } from 'react';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { fakeAuth } from '../services/auth';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';

export const RegisterPage = () => {

  const history = useHistory();

  const [isFormProcessing, setFormProcessing] = useState(false);

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

  const validateForm = () => {
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
  }

  const onRegisterClick = async () => {
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      // if form fields are correct then start network request
      setFormProcessing(true);
      // TODO: implement registration action
      const success = await fakeAuth();
      setFormProcessing(false);
      if(success) {
        history.replace({ pathname: '/' });
      }
    }
  }

  const onLoginClick = () => {
    history.replace({ pathname: '/login' });
  }

  return(
    <>
      <AppHeader />
      {isFormProcessing && <Loader />}
      <div className='fullscreen_message'>
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
