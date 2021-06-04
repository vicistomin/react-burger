import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ closeModal }) {
    return(
            <div 
                className={modalOverlayStyles.modal_overlay}
                onClick={closeModal}>
            </div>
    );
}

ModalOverlay.propTypes = {
    // TODO: check propTypes!
};

export default ModalOverlay;
