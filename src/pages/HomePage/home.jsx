import React, {  useRef } from 'react';
import Header from '../../components/Header/Header.jsx';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';
import FormGenerico from '../../components/FormGenerico/FormGenerico.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';
import './home.css';
import { usePopup } from '../../hooks/usePopup.js';

function Home() {

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  
  const { popupAtivo, togglePopup } = usePopup({ notificationRef, userMenuRef });

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
          <VagasBox total={60} livres={42} ocupadas={18} />
        </div>

        {popupAtivo === 'notificacao' && <NotificationModal ref={notificationRef} show={true} />}
        {popupAtivo === 'perfil' && <UserMenu ref={userMenuRef} />}
      </div>
    </div>
  );
}

export default Home;
