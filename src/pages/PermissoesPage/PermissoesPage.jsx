import React, { useRef, useEffect, useState, useContext } from 'react';
import Header from '../../components/Header/Header.jsx';
import SidebarMenu from '../../components/SideBar/SideBarMenu.jsx';
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx';
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';
import { listarPermissoes } from '../../services/permissaoService.js';
import { permissoesConfig } from '../../data/tabelasConfig.js';
import { usePopup } from '../../hooks/usePopup.js';
import './PermissoesPage.css';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { listarUsuarioLogado } from '../../services/pessoaService.js';
import UserInfoModal from '../../components/UserInfoModal/UserInfoModal.jsx';

function Permissoes() {

  const [permissoes, setPermissoes] = useState([]);
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
  );
}

export default Permissoes;
