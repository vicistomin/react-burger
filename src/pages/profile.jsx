import styles from './profile.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';
import Sidebar from '../components/sidebar/sidebar';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useRef } from 'react';

export const ProfilePage = () => {
  const [value, setValue] = useState('Марк')
  const [isInputDisabled, setInputDisabled] = useState(true)
  const [isInputEmpty, setInputEmpty] = useState(false)

  const inputRef = useRef(null)

  const onInputChange = e => {
    // hide the error message if user is writing something in the name field
    if (e.target.value.length > 0) {
      setInputEmpty(false);
    }
    setValue(e.target.value);
  };

  const onIconClick = () => {
    inputRef.current.focus();
    setInputDisabled(false);
  }

  const onInputBlur = e => {
    // show the error message if the name field is blank
    if (e.target.value.length === 0) {
      setInputEmpty(true);
    }
    setInputDisabled(true);
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
              onChange={onInputChange}
              value={value}
              name={'name'}
              error={isInputEmpty}
              ref={inputRef}
              errorText={'Поле не может быть пустым'}
              size={'default'}
              icon={'EditIcon'}
              onIconClick={onIconClick}
              disabled={isInputDisabled}
              onBlur={onInputBlur}
            />
            {/* <Input
              type={'text'}
              placeholder={'Логин'}
              // onChange={onNameChange}
              // value={nameValue}
              name={'name'}
              // error={isNameEmpty}
              // ref={nameInputRef}
              errorText={'Поле не может быть пустым'}
              size={'default'}
            />
            <Input
              type={'text'}
              placeholder={'Пароль'}
              // onChange={onNameChange}
              // value={nameValue}
              name={'name'}
              // error={isNameEmpty}
              // ref={nameInputRef}
              errorText={'Поле не может быть пустым'}
              size={'default'}
            /> */}
          </Form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
