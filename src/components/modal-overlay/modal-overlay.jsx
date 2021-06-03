import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ closeModal }) {
    return(
            <div 
                className={modalOverlayStyles.modal_overlay}
                onClick={closeModal}>
            </div>
    );
}

export default ModalOverlay;
