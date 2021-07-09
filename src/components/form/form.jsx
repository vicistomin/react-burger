import PropTypes from 'prop-types';
import formStyles from './form.module.css';
// importing components from library
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Form(props) {
  return(
    <div className={formStyles.form_container}>
      <h1 className="text text_type_main-medium">
        {props.title}
      </h1>
      {props.children}
      <Button type="primary" size="medium">
        {props.actionName}
      </Button>
    </div>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired
};

export default Form;
