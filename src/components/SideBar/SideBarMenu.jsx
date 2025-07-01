import React from 'react';
import './SidebarMenu.css';
import { FaCar, FaUsers, FaHome, FaParking, FaKey } from 'react-icons/fa';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; import { AuthContext } from '../../context/AuthContext.jsx';

export default function SidebarMenu() {
  const { usuario } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h2 className="logo">
        PARK<span className="green">ZONE</span>
      </h2>

      <div className="sidebar-buttons">
        <button onClick={() => navigate('/home')}>
          <FaHome className="icon" />
          <h2>HOME</h2>
        </button>
        {
          usuario.type === 'administrador' ? (
            <>

              <button onClick={() => navigate('/registro')}>
                <FaParking className="icon" />
                <h2>ACESSOS</h2>
              </button>
              <button onClick={() => navigate('/veiculos')}>
                <FaCar className="icon" />
                <h2>VEÍCULOS</h2>
              </button>
              <button onClick={() => navigate('/users')}>
                <FaUsers className="icon" />
                <h2>USUÁRIOS</h2>
              </button>
              <button onClick={() => navigate('/permissoes')}>
                <FaKey className="icon" />
                <h2>PERMISSÕES</h2>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/registro')}>
                <FaParking className="icon" />
                <h2>ACESSOS</h2>
              </button>
            </>
          )
        }
      </div>
    </div>
  );
}