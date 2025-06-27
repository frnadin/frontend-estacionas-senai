import Header from '../../components/Header/Header.jsx';
import React, { useState, useEffect, useRef } from 'react';
import './RegistroPage.css';
import SidebarMenu from '../../components/SideBar/SideBarMenu.jsx';
import { listarRegistros } from '../../services/registroService.js';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';
import { registrosConfig } from '../../data/tabelasConfig.js'
import RegistroForm from '../../components/RegistroForm/RegistroForm.jsx';
import { usePopup } from '../../hooks/usePopup.js';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';

function Registros() {

  const [registros, setRegistros] = useState([]);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const { popupAtivo, togglePopup } = usePopup({ notificationRef, userMenuRef });


  async function carregarRegistros() {

    try {
      const data = await listarRegistros();
      setRegistros(data);
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  }

  useEffect(() => {
    carregarRegistros();
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
          tela="Registros"
          onNotificationClick={() => togglePopup('notificacao')}
          onPerfilClick={() => togglePopup('perfil')}
        />

        {popupAtivo === 'notificacao' && <NotificationModal ref={notificationRef} show={true} />}
        {popupAtivo === 'perfil' && <UserMenu ref={userMenuRef} />}

        <div className="home-container">
          <RegistroForm onRegistroCriado={carregarRegistros}></RegistroForm>
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

    </div>
  );
}

export default Registros;

