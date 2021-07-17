import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './profile.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';
import Sidebar from '../components/sidebar/sidebar';
import Loader from '../components/loader/loader';
import { Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { getUser } from '../services/slices/user';
import { userSlice } from '../services/slices/user'

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const {
    user,
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    state => state.user
  );

  const { setName, setPassword, setEmail } = userSlice.actions

  // we need to have user from API in store to render user data
  useEffect(() => {
    // won't call API if items are already in store
    if (!userSuccess) {
      dispatch(getUser());
    }
  }, [dispatch, userSuccess]);

  // TODO: create EditableInput component and move there all this checks and handlers 
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
    dispatch(setName(e.target.value));
  };

  const onPasswordChange = e => {
    // hide the error message if user is writing something in the password field
    if (e.target.value.length > 0) {
      setPasswordInputEmpty(false);
    }
    dispatch(setPassword(e.target.value));
  };

  const onEmailChange = e => {
    // hide the error message if user is writing something in the password field
    dispatch(setEmail(e.target.value));
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
      {
          userRequest && 
          !userFailed && 
          !userSuccess && (
            <Loader />
        )}
      <div className={styles.profile_container + ' mt-30'}>
        <Sidebar />
        <div className={styles.form_container}>
          {
            userFailed && 
            !userRequest && 
            !userSuccess && (
              <h2 className='ml-30 text text_type_main-large text_color_inactive'>
                Ошибка загрузки
              </h2>
          )}
          {
            userSuccess && 
            !userFailed && 
            !userRequest && (
              <Form>
                <Input
                  type={'text'}
                  placeholder={'Имя'}
                  onChange={onNameChange}
                  value={user.name}
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
                  value={user.email}
                  name={'email'}
                  size={'default'}
                />            
                <Input
                  type={'text'}
                  placeholder={'Пароль'}
                  onChange={onPasswordChange}
                  value={user.password}
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
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
