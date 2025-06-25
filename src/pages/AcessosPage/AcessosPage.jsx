import Header from '../../components/Header/Header.jsx';
import React, { useState } from 'react'; 
import './AcessosPage.css';
import VagasBox from '../../components/VagasBox/VagasBox.jsx';
import SidebarMenu from '../../components/SideBar/SideBarMenu.jsx';

import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'

function Acessos() {
  
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

 
  const toggleNotificationModal = () => {
    setNotificationModalOpen(prevState => !prevState);
  };

  return (
    <div className="home-layout">
      <SidebarMenu />
      <div className="home-main">
        <Header tela="Acessos" onNotificationClick={toggleNotificationModal} />

        <div className="home-container">
          {/* <VagasBox total={60} livres={42} ocupadas={18} /> */}
          <h2>FAZER TABELA</h2>
        </div>
      </div>
      
      <NotificationModal show={isNotificationModalOpen} />
    </div>
  );
}

export default Acessos;

