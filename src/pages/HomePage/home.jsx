import React, { useRef, useEffect, useState, useContext } from 'react';
import Header from '../../components/Header/Header.jsx';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';
import FormGenerico from '../../components/FormGenerico/FormGenerico.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';
import UserInfoModal from '../../components/UserInfoModal/UserInfoModal.jsx';
import './home.css';
import { usePopup } from '../../hooks/usePopup.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import { listarUsuarioLogado } from '../../services/pessoaService.js';
import Dashboard from '../../components/Dashboards/Dashboard.jsx';

function Home() {


  const { usuario } = useContext(AuthContext);
  
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  const { popupAtivo, togglePopup } = usePopup({ notificationRef, userMenuRef });
  const [userInfoModalAberto, setUserInfoModalAberto] = useState(false);
  const [usuarioCompleto, setUsuarioCompleto] = useState(null);


  useEffect(() => {
    async function carregarDados() {
      if (usuario?.id) {
        const dados = await listarUsuarioLogado(usuario.id);
        setUsuarioCompleto(dados);
      }
    }
    carregarDados();
  }, [usuario]);


  const abrirGerenciarConta = () => {
    togglePopup(null);
    setUserInfoModalAberto(true);
  };



  return (
    <div className="home-layout">
      <SidebarMenu />

      <div className="home-main">
        <Header
          tela="Home"
          onNotificationClick={() => togglePopup('notificacao')}
          onPerfilClick={() => togglePopup('perfil')}
        />

        <div className="home-container">
          {/* <VagasBox total={60} livres={42} ocupadas={18} /> */}
          <Dashboard />
        </div>

        {popupAtivo === 'notificacao' && <NotificationModal ref={notificationRef} show={true} />}
        {popupAtivo === 'perfil' && (
          <UserMenu
            ref={userMenuRef}
            onGerenciarConta={abrirGerenciarConta}
          />
        )}

        <UserInfoModal
          isOpen={userInfoModalAberto}
          onClose={() => setUserInfoModalAberto(false)}
          usuario={usuarioCompleto}
        />
      </div>
    </div>
  );
}

export default Home;
