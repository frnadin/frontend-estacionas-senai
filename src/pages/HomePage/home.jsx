import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header.jsx';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';
import FormGenerico from '../../components/FormGenerico/FormGenerico.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';
import './home.css';

function Home() {
  const [popupAtivo, setPopupAtivo] = useState(null); // 'notificacao' | 'perfil' | null

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  const togglePopup = (nome) => {
    setPopupAtivo((prev) => (prev === nome ? null : nome));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedForaNotificacao =
        popupAtivo === 'notificacao' &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target);

      const clickedForaPerfil =
        popupAtivo === 'perfil' &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target);

      if (clickedForaNotificacao || clickedForaPerfil) {
        setPopupAtivo(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupAtivo]);

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

        {popupAtivo === 'notificacao' && <NotificationModal show={true} ref={notificationRef} />}
        {popupAtivo === 'perfil' && <UserMenu ref={userMenuRef} />}
      </div>
    </div>
  );
}

export default Home;
