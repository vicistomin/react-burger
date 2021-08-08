import { FC } from 'react';
import sidebarLinkStyles from './sidebar-link.module.css';

interface ISidebarLink {
  active: boolean,
  onClick: () => void,
  text: string
}

const SidebarLink: FC<ISidebarLink> = (props) => {
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

export default SidebarLink;
