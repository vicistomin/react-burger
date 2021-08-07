import { FC, useState, useRef, useEffect, ChangeEvent, FocusEvent } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
import styles from './profile.module.css';
// importing components from project
import Form from '../components/form/form';
import Sidebar from '../components/sidebar/sidebar';
import Loader from '../components/loader/loader';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import slices and their functions
import { getUser, setUser, userSlice } from '../services/slices/user';

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    user,
    userRequest,
    userSuccess,
    userFailed
  } = useAppSelector(
    state => state.user
  );

  const {
    resetStatus
  } = userSlice.actions

  const [nameValue, setNameValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const resetError = (): void => {
    dispatch(resetStatus());
  }  

  useEffect(() => {
    // reset status and errors on page load
    resetError();
    
    // we need to have user from API in store to render user data
    // won't call API if user data is already in process
    if (!userSuccess && !userRequest) {
      dispatch(getUser());
    }
  }, [])

  useEffect(() => {
    setNameValue(user.name || '');
    setEmailValue(user.email || '');
    setPasswordValue(user.password || '');
  }, [user]);

   // TODO: create EditableInput component and move there all this checks and handlers 
  const [isNameInputDisabled, setNameInputDisabled] = useState<boolean>(true)
  const [isNameInputEmpty, setNameInputEmpty] = useState<boolean>(false)
  const [isPasswordInputDisabled, setPasswordInputDisabled] = useState<boolean>(true)
  const [isPasswordInputEmpty, setPasswordInputEmpty] = useState<boolean>(false)
  
  const [hasFormChanged, setFormChanged] = useState<boolean>(false)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const onNameChange = (e: ChangeEvent<HTMLInputElement>):void => {
    // hide the error message if user is writing something in the name field
    if (e.target.value.length > 0) {
      setNameInputEmpty(false);
    }
    setNameValue(e.target.value);
    setFormChanged(true);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>):void => {
    // hide the error message if user is writing something in the password field
    if (e.target.value.length > 0) {
      setPasswordInputEmpty(false);
    }
    setPasswordValue(e.target.value);
    setFormChanged(true);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>):void => {
    // hide the error message if user is writing something in the password field
    setEmailValue(e.target.value);
    setFormChanged(true);
  };

  const onNameIconClick = (): void => {
    nameInputRef.current?.focus();
    setNameInputDisabled(false);
  }

  const onPasswordIconClick = (): void => {
    passwordInputRef.current?.focus();
    setPasswordInputDisabled(false);
  }

  const onNameInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    // show the error message if the name field is blank
    if (e.target.value.length === 0) {
      setNameInputEmpty(true);
    }
    setNameInputDisabled(true);
  }

  const onPasswordInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    // show the error message if the password field is blank
    if (e.target.value.length === 0) {
      setPasswordInputEmpty(true);
    }
    setPasswordInputDisabled(true);
  }

  const onSubmitChanges = (): void => {
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

  const onCancelChanges = (): void => {
    setNameValue(user.name || '');
    setEmailValue(user.email || '');
    setPasswordValue(user.password || '');
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
