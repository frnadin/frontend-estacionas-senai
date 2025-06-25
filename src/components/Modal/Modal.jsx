import React from 'react';
import './Modal.css';
import { FaRegWindowClose } from "react-icons/fa";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
                    <FaRegWindowClose color= "#5CC133" size={28} />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;