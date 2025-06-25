import Header from '../../components/Header/Header.jsx';
import React, { useState, useEffect } from 'react';
import './UsersPage.css';
import VagasBox from '../../components/VagasBox/VagasBox';
import SidebarMenu from '../../components/SideBar/SideBarMenu';

import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'
import { usuariosConfig } from '../../data/tabelasConfig.js'
import { listarPessoas } from '../../services/pessoaService.js';
import TabelaGenerica from '../../components/TabelaGenerica/TabelaGenerica.jsx';

function Usuarios() {

    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const data = await listarPessoas();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao carregar usuários:', error);
            }
        }
        carregarUsuarios();
    }, []);



    const toggleNotificationModal = () => {
        setNotificationModalOpen(prevState => !prevState);
    };

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
                <Header tela="Usuarios" onNotificationClick={toggleNotificationModal} />

                <div className="home-container">
                    {/* <VagasBox total={60} livres={42} ocupadas={18} /> */}
                    <TabelaGenerica
                        titulo={usuariosConfig.titulo}
                        dados={usuarios}
                        colunas={usuariosConfig.colunas}
                        filtros={usuariosConfig.filtros}
                        acoes={(usuario) => (
                            <>
                                <button onClick={() => handleEditar(usuario)} className="btn-acao editar">Editar</button>
                                <button onClick={() => handleDeletar(usuario)} className="btn-acao deletar">Deletar</button>
                            </>
                        )}
                    />
                </div>
            </div>

            <NotificationModal show={isNotificationModalOpen} />
        </div>
    );
}

export default Usuarios;

