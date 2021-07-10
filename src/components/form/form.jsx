import PropTypes from 'prop-types';
import formStyles from './form.module.css';
// importing components from library
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Form(props) {
  return(
    <form className={formStyles.form_container} autocomplete="on">
      {props.title &&
        <label className="text text_type_main-medium">
          {props.title}
        </label>
      }
      {props.children}
      {
        props.actionName &&
          <Button type="primary" size="medium" onClick={props.onClick}>
            {props.actionName}
          </Button>
        }
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  actionName: PropTypes.string,
  onClick: PropTypes.func
};

export default Form;
