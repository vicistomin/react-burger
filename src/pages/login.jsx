import React from 'react';
import styles from './login.module.css';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import Form from '../components/form/form';

import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export const LoginPage = () => {

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef(null);
  const onChange = e => {
    setValue(e.target.value)
  };

  return(
    <>
      <AppHeader />
      <div className={styles.fullscreen_message}>
        <Form
          title='Вход'
          actionName='Войти'
        >
          {/* TODO: Implement email validation on the fly */}
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
          <PasswordInput
            onChange={onChange}
            value={value}
            name={'password'}
          />
        </Form>
      </div>
    </>
  );
}

export default LoginPage;
