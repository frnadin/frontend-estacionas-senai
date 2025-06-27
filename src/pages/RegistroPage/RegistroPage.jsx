import Header from '../../components/Header/Header.jsx';
import React, { useState, useEffect } from 'react';
import './RegistroPage.css';
import SidebarMenu from '../../components/SideBar/SideBarMenu.jsx';
import { listarRegistros } from '../../services/registroService.js';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';
import { registrosConfig } from '../../data/tabelasConfig.js'
import RegistroForm from '../../components/RegistroForm/RegistroForm.jsx';

function Registros() {

  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [registros, setRegistros] = useState([]);

useEffect(() => {
  async function carregarRegistros() {
    try {
      const data = await listarRegistros();
      console.log(data);
      setRegistros(data);
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  }
  carregarRegistros();
}, []);



  const toggleNotificationModal = () => {
    setNotificationModalOpen(prevState => !prevState);
  };

  const handleEditar = (usuario) => {
    console.log(`Editar usuário: ${usuario.nome}`);
  };

  const handleDeletar = (usuario) => {
    if (window.confirm(`Deseja realmente deletar ${usuario.nome}?`)) {
      console.log(`Usuário ${usuario.nome} deletado!`);
    }
  };


  return (
    <div className="home-layout">
      <SidebarMenu />
      <div className="home-main">
        <Header tela="Registros" onNotificationClick={toggleNotificationModal} />

        <div className="home-container">
          <RegistroForm></RegistroForm>
          <TabelaGenerica
            titulo={registrosConfig.titulo}
            dados={registros}
            colunas={registrosConfig.colunas}
            filtros={registrosConfig.filtros}
            acoes={(usuario) => (
              <>
                <button onClick={() => handleEditar(usuario)} className="btn-acao editar">Editar</button>
                <button onClick={() => handleDeletar(usuario)} className="btn-acao deletar">Deletar</button>
              </>
            )}
          />
        </div>
      </div>

      <NotificationModal show={isNotificationModalOpen} />
    </div>
  );
}

export default Registros;

