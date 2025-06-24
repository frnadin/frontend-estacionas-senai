import Header from '../../components/Header/Header.jsx';
import React from 'react';
import './home.css';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';

function Home() {
  return (
    <div className="home-layout">
      <SidebarMenu />
    <div className="home-main">
      <Header tela="Home" />
      <div className="home-container">
        <VagasBox total={60} livres={42} ocupadas={18} />
      </div>
    </div>
    </div>
  );
}

export default Home;
