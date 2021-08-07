import { FC } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlay {
    closeModal: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({ closeModal }) => {
    return(
            <div 
                className={modalOverlayStyles.modal_overlay}
                onClick={closeModal}>
            </div>
    );
}

export default ModalOverlay;
