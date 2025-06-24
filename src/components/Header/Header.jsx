import React from 'react';
import './Header.css';
import { FaCar, FaUserPlus, FaUserCircle, FaRegIdCard, FaPowerOff } from 'react-icons/fa';
import { MdNotificationsNone } from 'react-icons/md';
import { IoMailOutline } from 'react-icons/io5';
import { useState } from 'react';
import FormGenerico from '../FormGenerico/FormGenerico.jsx';
import Modal from '../Modal/Modal.jsx';

// 1. Receba a nova prop 'onNotificationClick' junto com 'tela'
export default function Header({ tela, onNotificationClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const camposTeste = [
    { nome: "nome", rotulo: "Nome", tipo: "text", obrigatorio: true },
    { nome: "email", rotulo: "Email", tipo: "email", obrigatorio: true },
    { nome: "idade", rotulo: "Idade", tipo: "number", obrigatorio: false }
  ];

  const handleSubmit = (dados) => {
    console.log("Dados do formulário:", dados);
    setIsModalOpen(false);
  };

  return (
    <div className="header">
      <div id='space'></div>
      <h2 className="header-title">{tela}</h2>

      <div className="header-icons">
        <button onClick={() => console.log("Carro")}>
          <FaCar />
        </button>

        <button onClick={() => setIsModalOpen(true)} className="btn-teste-formulario">
          <FaUserPlus />
        </button>

        <button onClick={() => console.log("Adicionar permissao")}>
          <FaRegIdCard />
        </button>

        {/* 2. No onClick, chame a função recebida pela prop */}
        <button onClick={onNotificationClick}>
          <MdNotificationsNone />
        </button>

        <button onClick={() => console.log("Perfil")}>
          <FaUserCircle />
        </button>
        <button onClick={() => console.log("Sair")}>
          <FaPowerOff />
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormGenerico
          titulo="Cadastro de Usuário"
          campos={camposTeste}
          botaoTexto="Adicionar"
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}