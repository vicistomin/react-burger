import PropTypes from 'prop-types';
import formStyles from './form.module.css';
// importing components from library
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Form(props) {
  return(
    <form
      className={formStyles.form_container}
      autoComplete="on"
      onSubmit={props.onFormSubmit}
    >
      {props.title &&
        <label className="text text_type_main-medium">
          {props.title}
        </label>
      }
      {props.children}
      {
        props.actionName &&
          <Button type="primary" size="medium">
            {props.actionName}
          </Button>
        }
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  actionName: PropTypes.string,
  onFormSubmit: PropTypes.func
};

export default Form;
