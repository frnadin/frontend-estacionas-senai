import React, { useContext, useEffect, useState, forwardRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { listarUsuarioLogado } from '../../services/pessoaService';
import './UserMenu.css';

const UserMenu = forwardRef(({ onGerenciarConta }, ref) => {
  const { usuario } = useContext(AuthContext);
  const [dadosPessoa, setDadosPessoa] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        if (usuario?.id) {
          const pessoa = await listarUsuarioLogado(usuario.id);
          setDadosPessoa(pessoa);
        }
      } catch (erro) {
        console.error('Erro ao buscar dados da pessoa:', erro);
      }
    };

    carregarDados();
  }, [usuario]);

  return (
    <div className="user-menu" ref={ref}>
      {dadosPessoa ? (
        <>
          <div className="profile-image-container">
            {dadosPessoa.photo_url ? (
              <img
                src={dadosPessoa.photo_url}
                alt="Foto do usuário"
                className="profile-image"
              />
            ) : (
              <div className="profile-placeholder">?</div>
            )}
          </div>

          <div className="user-info">
            <p className="user-name"><strong>{dadosPessoa.name}</strong></p>
            <p className="email">{dadosPessoa.email}</p>
            <p className="type">{dadosPessoa.type}</p>
          </div>

          <ul className="menu-options">
            <li onClick={onGerenciarConta}>Gerenciar conta</li>
            <li onClick={() => alert('em produção...')}>Configurações</li>
            <li onClick={() => alert('em produção...')}>Ajuda</li>
          </ul>
        </>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
});

export default UserMenu;
