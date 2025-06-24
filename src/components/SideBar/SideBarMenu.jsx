import React from 'react';
import './SidebarMenu.css';
import { FaGasPump, FaCar, FaUsers } from 'react-icons/fa';

export default function SidebarMenu() {
  return (
    <div className="sidebar">
      <h2 className="logo">
        PARK<span className="green">ZONE</span>
      </h2>

      <div className="sidebar-buttons">
        <button>
          <FaGasPump className="icon" />
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
