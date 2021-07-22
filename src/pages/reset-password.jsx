import styles from './reset-password.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useCallback, useEffect } from 'react';
// importing components from project
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { resetPassword, userSlice } from '../services/slices/user';

import { useHistory } from 'react-router-dom';

export const ResetPasswordPage = () => {
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
  
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [isCodeEmpty, setCodeEmpty] = useState(false);

  const codeInputRef = useRef(null);

  const onCodeChange = e => {
    // hide the error message if user is writing something in the code field
    if (e.target.value.length > 0) {
      setCodeEmpty(false);
    }
    setCodeValue(e.target.value);
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
      password: false,
      code: false
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

    // performing code field check 
    if (codeValue.length === 0) {
      setCodeEmpty(true);
    }
    else {
      validFields.code = true;
    }    

    if (validFields.password && validFields.code) {
      return true;
    }
    else {
      return false;
    }
  }, [codeValue, passwordValue]);

  const redirectOnSuccess = () => {
    history.replace({ pathname: '/login' });
  }

  const onResetPasswordClick = useCallback((e) => {
    e.preventDefault();
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      // if form fields are correct then start reset password action
      // won't call API if user data is already in process
      if (!userRequest) {
        dispatch(resetPassword(
          codeValue,
          passwordValue,
          redirectOnSuccess
        ));
      }
    }
  }, [codeValue, passwordValue, userRequest]);

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
      <div 
        className={styles.reset_password_container + ' fullscreen_message'}>
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
            actionName='Сохранить'
            onClick={onResetPasswordClick}
          >
            {/* TODO: find a way to trigger PasswordInput error status */}
            <div className={isPasswordEmpty ? 'password_error' : ''}>
              <PasswordInput
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
              />
            </div>
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onCodeChange}
              value={codeValue}
              name={'code'}
              error={isCodeEmpty}
              ref={codeInputRef}
              errorText={'Поле не может быть пустым'}
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

export default ResetPasswordPage;
