import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
// importing components from project
import ModalOverlay from '../modal-overlay/modal-overlay';
// importing components from library
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

function Modal({ children, header, closeModal, fancyCloseIcon=false }) {
    
    // closing modals with the "Esc" key:
    const handleEscKey = (e) => {
        if (e.key === 'Escape') 
            closeModal();
        e.stopImmediatePropagation();
    }

    // FIXME: for some reason keydown EventListener won't work with modalRoot or divs in modal body
    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []); 

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={closeModal} />
            <div className={modalStyles.modal_container + ' pl-10 pt-10 pr-10 pb-15'}>
                <h3 className={modalStyles.modal_header + ' text text_type_main-large'}>
                    {header}
                </h3>
                <span className={modalStyles.close_icon 
                    // adding box-shadow only in OrderDetailsModal (as in Figma)
                    + (fancyCloseIcon ? ' ' + modalStyles.fancy_icon : '')}>
                    <CloseIcon onClick={closeModal} />
                </span>
                {children}
            </div>
        </>, 
        modalRoot
    );
}

Modal.propTypes = {
    // TODO: check propTypes!
};

export default Modal;
