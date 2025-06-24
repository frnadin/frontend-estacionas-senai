import Header from '../../components/Header/Header.jsx';
import React, { useState } from 'react'; // Importe o useState aqui
import './home.css';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';
// import { useState } from 'react';
import FormGenerico from '../../components/FormGenerico/FormGenerico.jsx';
import Modal from '../../components/Modal/Modal.jsx'; 


function Home() {
  // 2. Crie o estado para controlar a visibilidade do modal de notificação
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  // 3. Crie a função para alternar a visibilidade
  const toggleNotificationModal = () => {
    setNotificationModalOpen(prevState => !prevState);
  };

  return (
    <div className="home-layout">
      <SidebarMenu />
      <div className="home-main">
        {/* 4. Passe a função para o Header como uma prop */}
        <Header tela="Home" onNotificationClick={toggleNotificationModal} />

        <div className="home-container">
          <VagasBox total={60} livres={42} ocupadas={18} />
        </div>
      </div>
      
      {/* 5. Renderize o modal aqui, controlado pelo estado */}
      <NotificationModal show={isNotificationModalOpen} />
    </div>
  );
}

export default Home;

