import styles from './profile.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';
import Sidebar from '../components/sidebar/sidebar';
import { Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useRef } from 'react';
import { fakeUserData } from "../services/user-data";

export const ProfilePage = () => {
  // TODO: create EditableInput component and move there all this checks and handlers 
  // TODO: move data to slices and operate through dispatches
  const [nameValue, setNameValue] = useState(fakeUserData.name)
  const [emailValue, setEmailValue] = useState(fakeUserData.email)
  const [passwordValue, setPasswordValue] = useState(fakeUserData.password)
  const [isNameInputDisabled, setNameInputDisabled] = useState(true)
  const [isNameInputEmpty, setNameInputEmpty] = useState(false)
  const [isPasswordInputDisabled, setPasswordInputDisabled] = useState(true)
  const [isPasswordInputEmpty, setPasswordInputEmpty] = useState(false)

  const nameInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const onNameChange = e => {
    // hide the error message if user is writing something in the name field
    if (e.target.value.length > 0) {
      setNameInputEmpty(false);
    }
    setNameValue(e.target.value);
    fakeUserData.name = e.target.value;
  };

  const onPasswordChange = e => {
    // hide the error message if user is writing something in the password field
    if (e.target.value.length > 0) {
      setPasswordInputEmpty(false);
    }
    setPasswordValue(e.target.value);
    fakeUserData.password = e.target.value;
  };

  const onEmailChange = e => {
    // hide the error message if user is writing something in the password field
    setEmailValue(e.target.value);
    fakeUserData.email = e.target.value;
  };

  const onNameIconClick = () => {
    nameInputRef.current.focus();
    setNameInputDisabled(false);
  }

  const onPasswordIconClick = () => {
    passwordInputRef.current.focus();
    setPasswordInputDisabled(false);
  }

  const onNameInputBlur = e => {
    // show the error message if the name field is blank
    if (e.target.value.length === 0) {
      setNameInputEmpty(true);
    }
    setNameInputDisabled(true);
  }

  const onPasswordInputBlur = e => {
    // show the error message if the password field is blank
    if (e.target.value.length === 0) {
      setPasswordInputEmpty(true);
    }
    setPasswordInputDisabled(true);
  }

  return(
    <>
      <AppHeader />
      <div className={styles.profile_container + ' mt-30'}>
        <Sidebar />
        <div className={styles.form_container}>
          <Form>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onNameChange}
              value={nameValue}
              name={'name'}
              error={isNameInputEmpty}
              ref={nameInputRef}
              errorText={'Поле не может быть пустым'}
              size={'default'}
              icon={'EditIcon'}
              onIconClick={onNameIconClick}
              disabled={isNameInputDisabled}
              onBlur={onNameInputBlur}
            />
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              size={'default'}
            />            
            <Input
              type={'text'}
              placeholder={'Пароль'}
              onChange={onPasswordChange}
              value={passwordValue}
              name={'password'}
              error={isPasswordInputEmpty}
              ref={passwordInputRef}
              errorText={'Поле не может быть пустым'}
              size={'default'}
              icon={'EditIcon'}
              onIconClick={onPasswordIconClick}
              disabled={isPasswordInputDisabled}
              onBlur={onPasswordInputBlur}
            />
          </Form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
