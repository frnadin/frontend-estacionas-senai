import Header from '../../components/Header/Header.jsx';
import React, { useState } from 'react'; // Importe o useState aqui
import './home.css';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';
// import { useState } from 'react';
import FormGenerico from '../../components/FormGenerico/FormGenerico.jsx';
import Modal from '../../components/Modal/Modal.jsx'; 
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'

function Home() {
  
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

 
  const toggleNotificationModal = () => {
    setNotificationModalOpen(prevState => !prevState);
  };

  return (
    <div className="home-layout">
      <SidebarMenu />
      <div className="home-main">
        <Header tela="Home" onNotificationClick={toggleNotificationModal} />

        <div className="home-container">
          <VagasBox total={60} livres={42} ocupadas={18} />
        </div>
      </div>
      
      <NotificationModal show={isNotificationModalOpen} />
    </div>
  );
}

export default Home;

