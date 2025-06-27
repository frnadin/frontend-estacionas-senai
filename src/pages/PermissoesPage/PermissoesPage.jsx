import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header/Header.jsx';
import SidebarMenu from '../../components/SideBar/SideBarMenu.jsx';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx';
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';
import { listarPermissoes } from '../../services/permissaoService.js';
import { permissoesConfig } from '../../data/tabelasConfig.js';
import { usePopup } from '../../hooks/usePopup.js';
import './PermissoesPage.css';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';

function Permissoes() {
  const [permissoes, setPermissoes] = useState([]);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const { popupAtivo, togglePopup } = usePopup({ notificationRef, userMenuRef });
  
  useEffect(() => {
    async function carregarPermissoes() {
      try {
        const data = await listarPermissoes();
        console.log(data);
        setPermissoes(data);
      } catch (error) {
        console.error('Erro ao carregar permissões:', error);
      }
    }
    carregarPermissoes();
  }, []);

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
        <Header
          tela="Permissões"
          onNotificationClick={() => togglePopup('notificacao')}
          onPerfilClick={() => togglePopup('perfil')}
        />

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

      {popupAtivo === 'notificacao' && <NotificationModal ref={notificationRef} show={true} />}
      {popupAtivo === 'perfil' && <UserMenu ref={userMenuRef} />}
    </div>
  );
}

export default Permissoes;
