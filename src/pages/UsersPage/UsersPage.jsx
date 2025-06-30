import Header from '../../components/Header/Header.jsx';
import React, { useState, useEffect, useRef } from 'react';
import './UsersPage.css';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';

import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'
import { usuariosConfig } from '../../data/tabelasConfig.js'
import { listarPessoas, atualizarPessoa, deletarPessoa } from '../../services/pessoaService.js';
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';
import UserInfoModal from '../../components/UserInfoModal/UserInfoModal.jsx';
import UserMenu from '../../components/UserMenu/UserMenu.jsx';

import { usePopup } from '../../hooks/usePopup.js';

function Usuarios() {

    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [dadosEditados, setDadosEditados] = useState({});
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [isUserInfoOpen, setUserInfoOpen] = useState(false);


    const notificationRef = useRef(null);
    const userMenuRef = useRef(null);
    const { popupAtivo, togglePopup } = usePopup({ notificationRef, userMenuRef });

    const abrirUserInfo = (usuario) => {
        setUsuarioSelecionado(usuario);
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
                {popupAtivo === 'perfil' && <UserMenu ref={userMenuRef} />}

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
            <UserInfoModal
                isOpen={isUserInfoOpen}
                onClose={fecharUserInfo}
                usuario={usuarioSelecionado}
            />
        </div>
    );
}

export default Usuarios;

