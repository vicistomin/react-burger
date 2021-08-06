import PropTypes from 'prop-types';
import sidebarLinkStyles from './sidebar-link.module.css';

function SidebarLink(props) {
  return(
    <li className={sidebarLinkStyles.sidebar_list_item}>
      <button className={
        `${sidebarLinkStyles.sidebar_link}
        text text_type_main-default text_color_inactive
        ${props.active ? sidebarLinkStyles.sidebar_link_active : ''}`
        }
        onClick={props.onClick} 
        title={props.text}
      >
        {props.text}
      </button>
    </li>
  );
}

SidebarLink.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default SidebarLink;
