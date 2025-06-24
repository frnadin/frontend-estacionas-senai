import React from 'react';
import './SidebarMenu.css';
import { FaCar, FaUsers } from 'react-icons/fa';
// O ícone FaGasPump não estava sendo usado na imagem, mas vou manter se você precisar.
// Se não for usar o Acessos, pode remover. Assumi que será um ícone de "Entrada/Saída".
import { FaSignInAlt } from "react-icons/fa";


export default function SidebarMenu() {
  return (
    <div className="sidebar">
      {/* Bloco do Logo Adicionado */}
      <div className="logo-container">
        <img 
          src="./public/logo-senai.fw_.png" 
          alt="Logo ParkZone" 
          className="sidebar-logo"
        />
      </div>

      <div className="sidebar-buttons">
        <button>
          {/* Usei um ícone que representa melhor "Acessos" ou "Entradas" */}
          <FaSignInAlt className="icon" />
          ACESSOS
        </button>
        <button>
          <FaCar className="icon" />
          VEÍCULOS
        </button>
        <button>
          <FaUsers className="icon" />
          USUÁRIOS
        </button>
      </div>
    </div>
  );
}