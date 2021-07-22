import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './profile.module.css';
// importing components from project
import Form from '../components/form/form';
import Sidebar from '../components/sidebar/sidebar';
import Loader from '../components/loader/loader';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { getUser, setUser, userSlice } from '../services/slices/user';

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

  const {
    resetStatus
  } = userSlice.actions

  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const resetError = () => {
    dispatch(resetStatus());
  }  

  useEffect(() => {
    // reset status and errors on page load
    resetError();
    
    // we need to have user from API in store to render user data
    // won't call API if user data is already in process
    if (!userRequest) {
      dispatch(getUser());
    }
  }, [])

  useEffect(() => {
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(user.password);
  }, [user]);

   // TODO: create EditableInput component and move there all this checks and handlers 
  const [isNameInputDisabled, setNameInputDisabled] = useState(true)
  const [isNameInputEmpty, setNameInputEmpty] = useState(false)
  const [isPasswordInputDisabled, setPasswordInputDisabled] = useState(true)
  const [isPasswordInputEmpty, setPasswordInputEmpty] = useState(false)
  
  const [hasFormChanged, setFormChanged] = useState(false)

  const nameInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const onNameChange = e => {
    // hide the error message if user is writing something in the name field
    if (e.target.value.length > 0) {
      setNameInputEmpty(false);
    }
    setNameValue(e.target.value);
    setFormChanged(true);
  };

  const onPasswordChange = e => {
    // hide the error message if user is writing something in the password field
    if (e.target.value.length > 0) {
      setPasswordInputEmpty(false);
    }
    setPasswordValue(e.target.value);
    setFormChanged(true);
  };

  const onEmailChange = e => {
    // hide the error message if user is writing something in the password field
    setEmailValue(e.target.value);
    setFormChanged(true);
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

  const onSubmitChanges = (e) => {
    e.preventDefault();
    // won't call API if user data is already in process
    if (!userRequest) {
      dispatch(setUser({
        name: nameValue,
        email: emailValue,
        password: passwordValue
      }));
    }
    setFormChanged(false);
  }

  const onCancelChanges = (e) => {
    e.preventDefault();
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(user.password);
    setFormChanged(false);
  }

  return(
    <>
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
                  type={'password'}
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
                {hasFormChanged && 
                  <div className={styles.buttons_container}>
                    <Button 
                      type="secondary"
                      size="medium"
                      onClick={onCancelChanges}
                    >
                      Отменить
                    </Button>
                    <Button 
                      type="primary"
                      size="medium"
                      onClick={onSubmitChanges}
                    >
                      Сохранить
                    </Button>
                  </div>
                }
              </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
