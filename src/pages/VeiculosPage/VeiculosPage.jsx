import Header from '../../components/Header/Header.jsx';
import React, { useRef, useEffect, useState, useContext } from 'react';
import './VeiculosPage.css';
import VagasBox from '../../components/VagasBox/VagasBox.jsx';
import SidebarMenu from '../../components/SideBar/SideBarMenu.jsx';
import { listarVeiculos } from '../../services/veiculoService.js';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';
import { veiculosConfig } from '../../data/tabelasConfig.js'
import { usePopup } from '../../hooks/usePopup.js';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { listarUsuarioLogado } from '../../services/pessoaService.js';
import UserInfoModal from '../../components/UserInfoModal/UserInfoModal.jsx';

function Veiculos() {

  const [veiculos, setVeiculos] = useState([]);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  const { popupAtivo, togglePopup } = usePopup({ notificationRef, userMenuRef });
  const { usuario } = useContext(AuthContext);
  const [userInfoModalAberto, setUserInfoModalAberto] = useState(false);
  const [usuarioCompleto, setUsuarioCompleto] = useState(null);
  useEffect(() => {
    async function carregarUsuarioCompleto() {
      if (usuario?.id) {
        const dados = await listarUsuarioLogado(usuario.id);
        setUsuarioCompleto(dados);
      }
    }
    carregarUsuarioCompleto();
  }, [usuario]);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const data = await listarVeiculos();
        console.log(data);

        setVeiculos(data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }
    carregarUsuarios();
  }, []);

const abrirGerenciarConta = () => {
  togglePopup(null); 
  setUserInfoModalAberto(true);
}



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
          tela="Veiculos"
          onNotificationClick={() => togglePopup('notificacao')}
          onPerfilClick={() => togglePopup('perfil')}
        />
        {popupAtivo === 'notificacao' && <NotificationModal ref={notificationRef} show={true} />}
        {popupAtivo === 'perfil' && <UserMenu ref={userMenuRef} onGerenciarConta={abrirGerenciarConta} />}
        <UserInfoModal
          isOpen={userInfoModalAberto}
          onClose={() => setUserInfoModalAberto(false)}
          usuario={usuarioCompleto} 
        />

        <div className="home-container">
          <TabelaGenerica
            titulo={veiculosConfig.titulo}
            dados={veiculos}
            colunas={veiculosConfig.colunas}
            filtros={veiculosConfig.filtros}
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

export default Veiculos;

