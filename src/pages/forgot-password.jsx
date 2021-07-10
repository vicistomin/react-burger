import { useState, useRef } from 'react';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { fakeAuth } from '../services/auth';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';

export const ForgotPasswordPage = () => {

  const history = useHistory();

  const [isFormProcessing, setFormProcessing] = useState(false);

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

  const onResetPasswordClick = async () => {
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      // if form field are correct then start network request
      setFormProcessing(true);
      // TODO: implement reset password action
      const success = await fakeAuth();
      setFormProcessing(false);
      if(success) {
        history.replace({ pathname: '/reset-password' });
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
