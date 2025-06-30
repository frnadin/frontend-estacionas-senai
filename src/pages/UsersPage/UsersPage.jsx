import Header from '../../components/Header/Header.jsx';
import React, { useRef, useEffect, useState, useContext } from 'react';
import './UsersPage.css';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';

import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'
import { usuariosConfig } from '../../data/tabelasConfig.js'
import { listarPessoas, atualizarPessoa, deletarPessoa } from '../../services/pessoaService.js';
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';
import UserInfoModal from '../../components/UserInfoModal/UserInfoModal.jsx';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';

import { AuthContext } from '../../context/AuthContext.jsx';
import { listarUsuarioLogado } from '../../services/pessoaService.js';
import { usePopup } from '../../hooks/usePopup.js';

function Usuarios() {
    const { usuario } = useContext(AuthContext);

    const [isNotificationModalOpen] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [dadosEditados, setDadosEditados] = useState({});
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [isUserInfoOpen, setUserInfoOpen] = useState(false);
    const [userInfoModalAberto, setUserInfoModalAberto] = useState(false);
    const [usuarioCompleto, setUsuarioCompleto] = useState(null);
    const notificationRef = useRef(null);
    const userMenuRef = useRef(null);
    const { popupAtivo, togglePopup } = usePopup({ notificationRef, userMenuRef });



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


    const abrirUserInfo = async (usuario) => {
        const dadosCompletos = await listarUsuarioLogado(usuario.id);
        setUsuarioSelecionado(dadosCompletos);
        setUserInfoOpen(true);
    };

    const fecharUserInfo = () => {
        setUsuarioSelecionado(null);
        setUserInfoOpen(false);
    };
    const startEdit = (usuario) => {
        setEditandoId(usuario.id);
        setDadosEditados(usuario);
    };

    const cancelEdit = () => {
        setEditandoId(null);
        setDadosEditados({});
    };


    const saveEdit = async () => {
        try {
            await atualizarPessoa(editandoId, dadosEditados);
            setEditandoId(null);
            setDadosEditados({});
            carregarUsuarios();
        } catch (error) {
            console.error('Erro ao salvar edição:', error);
        }
    };

    async function carregarUsuarios() {
        try {
            const data = await listarPessoas();
            setUsuarios(data);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);



    const handleDeletar = async (usuario) => {

        if (window.confirm(`Deseja realmente deletar ${usuario.name}?`)) {
            try {
                await deletarPessoa(usuario.id);
                carregarUsuarios();
                console.log(`Usuário ${usuario.name} deletado com sucesso!`);
            } catch (error) {
                console.error('Erro ao deletar usuário:', error);
            }
        }
    };


    return (
        <div className="home-layout">
            <SidebarMenu />
            <div className="home-main">
                <Header
                    tela="Usuarios"
                    onNotificationClick={() => togglePopup('notificacao')}
                    onPerfilClick={() => togglePopup('perfil')}
                />
                {popupAtivo === 'notificacao' && <NotificationModal ref={notificationRef} show={true} />}
                {popupAtivo === 'perfil' && (
                    <UserMenu
                        ref={userMenuRef}
                        onGerenciarConta={abrirGerenciarConta}
                    />
                )}
                <div className="home-container">
                    <TabelaGenerica
                        titulo={usuariosConfig.titulo}
                        dados={usuarios}
                        colunas={usuariosConfig.colunas}
                        filtros={usuariosConfig.filtros}
                        editandoId={editandoId}
                        dadosEditados={dadosEditados}
                        setDadosEditados={setDadosEditados}
                        onIniciarEdicao={startEdit}
                        onCancelarEdicao={cancelEdit}
                        onSalvarEdicao={saveEdit}
                        onRemover={handleDeletar}
                        onDetalhes={abrirUserInfo}
                    />
                </div>
            </div>

            <NotificationModal show={isNotificationModalOpen} />
            {/* Modal detalhes de usuários da tabela */}
            <UserInfoModal
                isOpen={isUserInfoOpen}
                onClose={fecharUserInfo}
                usuario={usuarioSelecionado}
            />

            {/* Modal gerenciar conta do usuário logado */}
            <UserInfoModal
                isOpen={userInfoModalAberto}
                onClose={() => setUserInfoModalAberto(false)}
                usuario={usuarioCompleto}
            />
        </div>
    );
}

export default Usuarios;

