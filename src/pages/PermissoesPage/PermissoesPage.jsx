import Header from '../../components/Header/Header.jsx';
import React, { useState, useEffect } from 'react';
import './PermissoesPage.css';
import VagasBox from '../../components/VagasBox/VagasBox.jsx';
import SidebarMenu from '../../components/SideBar/SideBarMenu.jsx';
import { listarPermissoes } from '../../services/permissaoService.js';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';
import { permissoesConfig } from '../../data/tabelasConfig.js'

function Permissoes() {

  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [permissoes, setVeiculos] = useState([]);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const data = await listarPermissoes();
        console.log(data);
        
        setVeiculos(data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }
    carregarUsuarios();
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
        <Header tela="Permissoes" onNotificationClick={toggleNotificationModal} />

        <div className="home-container">
          <TabelaGenerica
            titulo={permissoesConfig.titulo}
            dados={permissoes}
            colunas={permissoesConfig.colunas}
            filtros={permissoesConfig.filtros}
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

export default Permissoes;

