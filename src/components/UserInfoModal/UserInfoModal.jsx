import React from 'react';
import './UserInfoModal.css';
import Modal from '../Modal/Modal';

export default function UserInfoModal({ isOpen, onClose, usuario }) {
    if (!usuario) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="modal-menor">
            <div className="user-info-modal">
                <h2>Informações do Usuário</h2>
                <img
                    src={usuario.photo_url || 'https://i.pinimg.com/236x/a3/37/13/a33713003a558d9285e276040fb4e829.jpg'}
                    alt={`Foto de ${usuario.name}`}
                    className="photo"
                />
                <div className="user-info">
                    <p><strong>Nome:</strong> {usuario.name}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Telefone:</strong> {usuario.phone || 'Não informado'}</p>
                    <p><strong>CPF:</strong> {usuario.cpf || 'Não informado'}</p>
                    <p><strong>Tipo:</strong> {usuario.type || 'Não informado'}</p>
                    <p><strong>Matrícula:</strong> {usuario.registrationSenai || 'Não informado'}</p>

                </div>
            </div>
        </Modal>
    );
}
