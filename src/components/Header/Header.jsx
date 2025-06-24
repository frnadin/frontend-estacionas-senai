import React from 'react';
import './Header.css';
import { FaCar, FaUserPlus, FaUserCircle, FaRegIdCard } from 'react-icons/fa';
import { MdNotificationsNone } from 'react-icons/md';
import { IoMailOutline } from 'react-icons/io5';

export default function Header(props) {
  return (
    <div className="header">
      <div id='space'></div>
      <h2 className="header-title">{props.tela}</h2>

      <div className="header-icons">
        <button onClick={() => console.log("Carro")}>
          <FaCar />
        </button>

        <button onClick={() => console.log("Adicionar usuário")}>
          <FaUserPlus />
        </button>

        <button onClick={() => console.log("Adicionar permissao")}>
          <FaRegIdCard />
        </button>

        <button onClick={() => console.log("Notificações")}>
          <MdNotificationsNone />
        </button>


        <button onClick={() => console.log("Perfil")}>
          <FaUserCircle />
        </button>
      </div>
    </div>
  );
}
