import { FC, useState, useRef, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
// importing components from project
import Form from '../components/form/form';
import Loader from '../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { register, userSlice } from '../services/slices/user';

import { useHistory, useLocation } from 'react-router-dom';
import { ILocation } from '../services/types';

export const RegisterPage: FC = () => {
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

  const [nameValue, setNameValue] = useState<string>('');
  const [isNameEmpty, setNameEmpty] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isPasswordEmpty, setPasswordEmpty] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const emailRegExp: RegExp = /.+@.+\.[A-Za-z]+$/;

  const onNameChange = (e: ChangeEvent<HTMLInputElement>):void => {
    // hide the error message if user is writing something in the name field
    if (e.target.value.length > 0) {
      setNameEmpty(false);
    }
    setNameValue(e.target.value);
  };

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
    password: boolean,
    name: boolean
  }

  const validateForm = useCallback(() => {
    // TODO: check is better be done when focus is out of input, before the form submit action
    
    const validFields: IFormFields = {
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

  const redirectOnSuccess = (): void => {
    // redirecting to the page which unauthed user tried to reach
    // in other cases redirect to HomePage
    const { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
  }

  const onRegisterClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormCorrect: boolean = validateForm();
    if(!isFormCorrect) {
      return;
    }
    else {
      // if form fields are correct then start registration action
      // won't call API if user data is already in process
      if (!userRequest) {
        dispatch(register({
          name: nameValue,
          email: emailValue,
          password: passwordValue
        }, redirectOnSuccess))
      }
    }
  }, [emailValue, nameValue, passwordValue, userRequest]);

  const onLoginClick = (): void => {
    history.replace({ pathname: '/login' });
  }

  return(
    <>
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
                ???????????? ?????? ??????????????????????
              </h2>
              <Button 
                type="primary"
                size="medium"
                onClick={resetError}
              >
                ?????????????????????? ??????????
              </Button>
            </div>
        )}
        {
          !userFailed && (
          <Form
            title='??????????????????????'
            actionName='????????????????????????????????????'
            onFormSubmit={onRegisterClick}
          >
            <Input
              type={'text'}
              placeholder={'??????'}
              onChange={onNameChange}
              value={nameValue}
              name={'name'}
              error={isNameEmpty}
              ref={nameInputRef}
              errorText={'???????? ???? ?????????? ???????? ????????????'}
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
              errorText={'?????????????????????? ???????????? e-mail'}
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
            ?????? ?????????????????????????????????
          </p>
          <Button 
            type="secondary"
            size="medium"
            onClick={onLoginClick}
          >
            ??????????
          </Button>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
