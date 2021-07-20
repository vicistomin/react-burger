import styles from './not-found.module.css';

export const NotFound404 = () => {
  return(
    <div className={styles.fullscreen_message}>
      <p className='text text_type_digits-large text_color_inactive'>
        404
      </p>
      <h1 className='text text_type_main-large text_color_inactive'>
        Страница не найдена
      </h1>
    </div>
  );
}

export default NotFound404;
