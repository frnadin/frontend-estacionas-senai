import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { buscarPessoaPorId } from '../../services/pessoaService';
import './UserMenu.css';

function UserMenu() {
  const { usuario, logout } = useContext(AuthContext);
  const [dadosPessoa, setDadosPessoa] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        if (usuario?.id) {
          const pessoa = await buscarPessoaPorId(usuario.id);
          setDadosPessoa(pessoa);
        }
      } catch (erro) {
        console.error('Erro ao buscar dados da pessoa:', erro);
      }
    };
    console.log("Usuário atual:", usuario);
    console.log("Dados da pessoa:", dadosPessoa);
    carregarDados();
  }, [usuario]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="user-menu">
        <>
          {dadosPessoa?.photo_url && (
            <img
              src={dadosPessoa.photo_url}
              alt="Foto do usuário"
              className="user-avatar"
            />
          )}
      </>
      {dadosPessoa ? (
        <>
          <div className="user-info">
            <p><strong>{dadosPessoa.name}</strong></p>
            <p>{dadosPessoa.email}</p>
          </div>

          <ul className="menu-options">
            <li>Gerenciar conta</li>
            <li>Configurações</li>
            <li>Ajuda</li>
          </ul>

          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}

export default UserMenu;






// import React from 'react';
// import './UserMenu.css';

// const dados = {
//   nome: 'João da Silva',
//   email: 'mrqs@mrqs.com',
//   url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a9e36fde-07a3-4cc3-82b6-0d37dc6c5ad7/df1n8zd-f4974a7f-488c-4c8d-8f46-bffa110a0f79.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E5ZTM2ZmRlLTA3YTMtNGNjMy04MmI2LTBkMzdkYzZjNWFkN1wvZGYxbjh6ZC1mNDk3NGE3Zi00ODhjLTRjOGQtOGY0Ni1iZmZhMTEwYTBmNzkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ApHHaphPhkt0BSi74ViXcsCiDEHuuRh2JNyYHahhlJ4'
// };

// export default function UserMenu({ nome, email }) {
//   return (
//     <div className="user-menu">
//       <div className="profile-image-container">
//         <img
//           className="profile-image"
//           src={dados.url}
//           alt="Foto de perfil"
//         />
//       </div>
//       <p className='nomeUser'><strong>{dados.nome}</strong></p>
//       <p className="email">{email || dados.email}</p>
//       <hr />
//       <ul>
//         <li>Gerenciar conta</li>
//         <li>Configurações</li>
//         <li>Ajuda</li>
//       </ul>
//     </div>
//   );
// }
