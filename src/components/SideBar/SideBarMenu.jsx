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
          <h2>HOME</h2>
        </button>
        <button>
          <FaGasPump className="icon" />
          <h2>ACESSOS</h2>
        </button>
        <button>
          <FaCar className="icon" />
          <h2>VEÍCULOS</h2>
        </button>
        <button>
          <FaUsers className="icon" />
          <h2>USUÁRIOS</h2>
        </button>
        <button>
          <FaUsers className="icon" />
          <h2>PERMISSÕES</h2>
        </button>
           
        
      </div>
    </div>
  );
}
